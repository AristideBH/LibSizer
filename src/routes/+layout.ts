import type { LayoutLoad } from './$types';

export const load = (async () => {
    return { appVersion: "0.2.5" };
}) satisfies LayoutLoad;