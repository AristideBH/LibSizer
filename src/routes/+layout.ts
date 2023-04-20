import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
    return {
        appVersion: "0.2.7",
        pathName: url.pathname,
    };
}) satisfies LayoutLoad;