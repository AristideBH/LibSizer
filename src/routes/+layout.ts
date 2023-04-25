import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
    return {
        appVersion: "0.2.8",
        pathName: url.pathname,
    };
}) satisfies LayoutLoad;