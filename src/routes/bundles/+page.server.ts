import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import { schema } from "$lib/components/bundles/schema";
// import { addBundle } from '$lib/components/bundles';


export const load: PageServerLoad = async () => {
    const form = await superValidate(schema, { errors: false });
    return { form };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, schema, { errors: true });
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const submittedBundle = {
            ...form.data,
            formats: form.data.formats.map((format, index) => ({
                id: index + 1,
                ...format,
            }))
        };
        console.log('Successfully submitted:', submittedBundle);

        // ! Can't call dexie on server.side
        // addBundle(form.data.bundleName, formattedData.formats)
        return {
            success: true,
            form,
            submittedBundle,
        };
    },

};
