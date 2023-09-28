import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { db } from '$lib/js/db'; ``

export const load = (async ({ params }) => {
    if (!browser) {
        throw error(404, 'no client')

    }


    const image = await db.images
        .where({
            id: Number(params.id)
        })
        .first();

    if (!image) {
        throw error(404, 'This image doesn\'t exist in the library');
    }

    return {
        id: params.id as unknown as number,
        image
    };



}) satisfies PageLoad;