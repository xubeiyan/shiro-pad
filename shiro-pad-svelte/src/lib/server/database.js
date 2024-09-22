import Database from 'better-sqlite3';

import { DATABASE_PATH } from '$env/static/private';

import { timeAfter } from './timeLib';

import { generateAccessCode } from './accessCodeLib';

// 判断是否开发 dev
import { dev } from '$app/environment';

const log = (logContent) => {
	if (dev) console.log(logContent);
};

const db = new Database(DATABASE_PATH, {
	fileMustExist: true,
	verbose: dev ? console.log : null
});

// 获取指定ulid的pad
const getPad = async ({ ulid, isUpdate }) => {
	const stmt = db
		.prepare(
			`
    SELECT ulid, language, keepTime, accessCode, codeText, expireAt, expired FROM pad WHERE ulid = ?
  `
		)
		.bind([ulid]);

	let result = stmt.get();

	// 没有则返回NULL
	if (result == undefined) {
		log('没有找到，新建');
		return null;
	}

	// 判断keepTime是否是burnAfterRead
	if (result.keepTime == 'burnAfterRead') {
		// 没有isUpdate则表明是查看了这个pad，删除这条
		if (!isUpdate) {
			const deleteStmt = db
				.prepare(
					`
      DELETE FROM pad WHERE ulid = ?  
      `
				)
				.bind([ulid]);
			deleteStmt.run();
		}

		return result;
	}

	// 检查是否过期，过期则删除
	let expireTimeStamp = new Date(result.expireAt).getTime();
	if (expireTimeStamp < new Date().getTime()) {
		log('已过期，新建');
		const deleteStmt = db
			.prepare(
				`
      DELETE FROM pad WHERE ulid = ?
    `
			)
			.bind([ulid]);
		deleteStmt.run();
		return 'expired';
	}

	return result;
};

// 根据快速访问码查询pad
const getUlidByAccessCode = (accessCode) => {
  const stmt = db.prepare(`
    SELECT ulid FROM pad WHERE accessCode = ?
    `)
    .bind([accessCode]);

    let result = stmt.get();
    if (result == undefined) {
      return 'notFound';
    }

    return result.ulid;
}

// 判断即将获取的pad是否过期
const previewPad = async ({ ulid }) => {
	const stmt = db
		.prepare(
			`
    SELECT keepTime, expired FROM 'pad' WHERE ulid = ?
  `
		)
		.bind([ulid]);

	let result = stmt.get();

	// 没有找到
	if (result == undefined) {
		log('没有找到');
		return 'notFound';
	}

	// 已访问
	if (result.expired == 1) {
		const deleteStmt = db
			.prepare(
				`
      DELETE FROM pad WHERE ulid = ?
    `
			)
			.bind([ulid]);
		deleteStmt.run();
		return 'expired';
	}

	// 并非阅后即焚消息
	if (result.keepTime != 'burnAfterRead') {
		return 'normalPad';
	}

	return 'usablePad';
};

const updatePad = async ({ ulid, language, keepTime, code }) => {
	const stmt = db
		.prepare(
			`
    SELECT 1 FROM pad WHERE ulid = ?
  `
		)
		.bind([ulid]);

	let result = stmt.get();
	// 如果不存在则新建
	if (result == undefined) {
		const countStmt = db.prepare(`
      SELECT COUNT(1) AS row_count FROM pad;
      `);

		let countResult = countStmt.get();
		const accessCode = generateAccessCode(countResult.row_count);
		// const accessCode
		const createAt = new Date().getTime();
		const expireAt = timeAfter({ startTime: createAt, period: keepTime });
		const createStmt = db
			.prepare(
				`
      INSERT INTO 'pad' 
      (ulid, language, keepTime, accessCode, createAt, expireAt, expired, codeText) VALUES
      (?   , ?       , ?       , ?,          ?       , ?       , ?      , ?)
    `
			)
			.bind([ulid, language, keepTime, accessCode, createAt, expireAt, 0, code]);

		createStmt.run();
	} else {
		// console.log(language, code, ulid);
		const updateStmt = db
			.prepare(
				`
      UPDATE 'pad' SET language = ?, codeText = ? WHERE ulid = ?
    `
			)
			.bind([language, code, ulid]);

		updateStmt.run();
	}
};

export { getPad, getUlidByAccessCode, updatePad, previewPad };
