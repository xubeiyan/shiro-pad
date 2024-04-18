import { previewPad } from '$lib/server/database.js'
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const res = await previewPad({ ulid: params.padId });

    if (res == 'normalPad') {
        throw redirect(307, `/pad/${params.padId}`);
    }

    if (res == 'notFound' || res == 'expired') {
        return {
            type: res,
            padId: params.padId,
        }
    }

    return {
        type: res,
        padId: params.padId,
    }
}