import Database from 'better-sqlite3';

import { DATABASE_PATH } from '$env/static/private';

import { timeAfter } from './timeLib';

// console.log(`DB:${DATABASE_PATH}`);

const db = new Database(DATABASE_PATH, {
  fileMustExist: true,
  verbose: console.log,
});

const getPad = async ({ ulid }) => {
  const stmt = db.prepare(`
    SELECT language, keepTime, codeText, expireAt FROM pad WHERE ulid = ?
  `).bind([ulid]);

  let result = stmt.get();

  // 没有则返回NULL
  if (result == undefined) {
    console.log('没有找到，新建')
    return null;
  }

  // 检查是否过期，过期则删除
  let expireTimeStamp = new Date(result.expireAt).getTime();
  if (expireTimeStamp < new Date().getTime()) {
    console.log('已过期，新建');
    const deleteStmt = db.prepare(`
      DELETE FROM pad WHERE ulid = ?
    `).bind([ulid]);
    deleteStmt.run();
    return 'expired'
  }

  return result;
}

const updatePad = async ({ ulid, language, keepTime, code }) => {
  const stmt = db.prepare(`
    SELECT 1 FROM pad WHERE ulid = ?
  `).bind([ulid]);

  let result = stmt.get();
  // 如果不存在则新建
  if (result == undefined) {
    const createAt = new Date().getTime();
    const expireAt = timeAfter({ startTime: createAt, period: keepTime });
    const createStmt = db.prepare(`
      INSERT INTO 'pad' 
      (ulid, language, keepTime, createAt, expireAt, expired, codeText) VALUES
      (?   , ?       , ?       , ?       , ?       , ?      , ?)
    `).bind([
      ulid, language, keepTime, createAt, expireAt, 0, code
    ]);

    createStmt.run();
  } else {
    console.log(language, code, ulid);
    const updateStmt = db.prepare(`
      UPDATE 'pad' SET language = ?, codeText = ? WHERE ulid = ?
    `).bind([language, code, ulid]);

    updateStmt.run();
  }
}

export { getPad, updatePad }