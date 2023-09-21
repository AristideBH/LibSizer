import type { PageLoad } from './$types';
import { db } from '$lib/db';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
    const image = await db.images
        .where({
            id: Number(params.id)
        })
        .first();


    if (!image) {
        throw error(404, 'This image doesn\'t exist in the library')
    }

    return {
        id: params.id as unknown as number,
        image
    };

}) satisfies PageLoad;