import type { LayoutLoad } from './$types';

export const load = (async () => {
    return { appVersion: "v. 0.2" };
}) satisfies LayoutLoad;