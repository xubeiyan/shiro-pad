import { getPad, updatePad } from '$lib/server/database.js';
import { timeFormat } from '$lib/server/timeLib.js';

export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    const id = data.get('id');
    const ulid = id.substring(5);
    const language = data.get('language');
    let keepTime = data.get('keepTime');

    if (keepTime == '0s') {
      keepTime = 'burnAfterRead';
    }

    const code = data.get('code');

    updatePad({ ulid, language, code, keepTime });
  },
}

export const load = async ({ params }) => {
  let res = await getPad({ ulid: params.padId });

  // 没有和过期都删除
  if (res == null || res == 'expired') {
    return {
      language: 'html',
      keepTime: '1h',
      code: '',
      expireAt: '',
    }
  } else {
    return {
      ulid: res.ulid,
      language: res.language,
      keepTime: res.keepTime,
      code: res.codeText,
      expireAt: timeFormat(res.expireAt),
    }
  }
}