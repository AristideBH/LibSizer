import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import { schema } from "$lib/components/bundles/schema";
import { addBundle } from '$lib/components/bundles';


export const load: PageServerLoad = async () => {
    const form = await superValidate(schema, { errors: false });
    return { form };
};

export const actions: Actions = {
    submit: async (event) => {
        const form = await superValidate(event, schema, { errors: true });
        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const formattedData = {
            ...form.data,
            formats: form.data.formats.map((format, index) => ({
                ...format,
                id: index + 1 // Adding 1 to make 'id' start from 1 instead of 0
            }))
        };

        console.log('Successfully submitted:', formattedData);
        addBundle(form.data.bundleName, formattedData.formats)
        return {
            form
        };
    },

};
