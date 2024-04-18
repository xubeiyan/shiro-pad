import Database from 'better-sqlite3';

import { DATABASE_PATH } from '$env/static/private';

import { timeAfter } from './timeLib';

// console.log(`DB:${DATABASE_PATH}`);

const db = new Database(DATABASE_PATH, {
  fileMustExist: true,
  verbose: console.log,
});

// 获取指定ulid的pad 
const getPad = async ({ ulid }) => {
  const stmt = db.prepare(`
    SELECT ulid, language, keepTime, codeText, expireAt, expired FROM pad WHERE ulid = ?
  `).bind([ulid]);

  let result = stmt.get();

  // 没有则返回NULL
  if (result == undefined) {
    console.log('没有找到，新建')
    return null;
  }

  // 判断keepTime是否是burnAfterRead
  if (result.keepTime == 'burnAfterRead') {
    if (result.expired == 1) {
      return 'expired';
    } else {
      // 将expired置为1，返回这个
      const updateStmt = db.prepare(`
        UPDATE 'pad' SET expired = 1 where ulid = ?  
      `).bind([ulid]);
      updateStmt.run();

      return result;
    }

  }

  // 检查是否过期，过期则删除
  let expireTimeStamp = new Date(result.expireAt).getTime();
  if (expireTimeStamp < new Date().getTime()) {
    console.log('已过期，新建');
    const deleteStmt = db.prepare(`
      DELETE FROM pad WHERE ulid = ?
    `).bind([ulid]);
    deleteStmt.run();
    return 'expired';
  }

  return result;
}

// 判断即将获取的pad是否过期
const previewPad = async ({ ulid }) => {
  const stmt = db.prepare(`
    SELECT keepTime, expired FROM 'pad' WHERE ulid = ?
  `).bind([ulid]);

  let result = stmt.get();

  // 没有找到
  if (result == undefined) {
    return 'notFound';
  }

  // 已访问
  if (result.expired == 1) {
    const deleteStmt = db.prepare(`
      DELETE FROM pad WHERE ulid = ?
    `).bind([ulid]);
    deleteStmt.run();
    return 'expired';
  }

  // 并非阅后即焚消息
  if (result.keepTime != 'burnAfterRead') {
    return 'normalPad';
  }

  return 'usablePad';
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
    // console.log(language, code, ulid);
    const updateStmt = db.prepare(`
      UPDATE 'pad' SET language = ?, codeText = ? WHERE ulid = ?
    `).bind([language, code, ulid]);

    updateStmt.run();
  }
}

export { getPad, updatePad, previewPad }