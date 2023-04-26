import type { LayoutLoad } from './$types';
import { version } from '$app/environment';

export const load = (async ({ url }) => {
    return {
        appVersion: version,
        pathName: url.pathname,
    };
}) satisfies LayoutLoad;