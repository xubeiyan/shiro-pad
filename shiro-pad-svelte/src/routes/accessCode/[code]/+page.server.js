import { getUlidByAccessCode } from '$lib/server/database.js';
import { redirect } from "@sveltejs/kit";

export const load = async ({ params }) => {
  const accessCode = params.code;
  let ulid = await getUlidByAccessCode(accessCode);

  if (ulid == 'notFound') {
    throw redirect(307, `/accessCode?invalidCode`);
  } else {
    throw redirect(307, `/pad/${ulid}`);
  }
}