import type { PageServerLoad } from './$types';
import { getImageById } from '$lib/db';

export const load = (async ({ params }) => {
    const id = params.id as unknown as number
    const queriedImage = await getImageById(id)
    return {
        id,
        queriedImage
    };
}) satisfies PageServerLoad;