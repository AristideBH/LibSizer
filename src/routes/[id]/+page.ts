import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
        throw error(400, 'Invalid parameter: ID must be a number');
    }

    return { id: params.id };
}) satisfies PageLoad;