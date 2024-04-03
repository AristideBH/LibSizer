import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "$lib/components/bundles/schema";
import { zod } from "sveltekit-superforms/adapters";
// import { addBundle } from '$lib/components/bundles';


export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema)),
        success: false
    };
};

export const actions: Actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const submittedBundle = {
            ...form.data,
            formats: form.data.formats.map((format, index) => ({
                id: index + 1,
                ...format,
            }))
        };
        // console.log('Successfully submitted:', submittedBundle);

        return {
            success: true,
            form,
            submittedBundle,
        };
    },
    // default: async (event) => {
    //     const form = await superValidate(event, formSchema, { errors: true });
    //     if (!form.valid) {
    //         return fail(400, {
    //             form
    //         });
    //     }

    //     const submittedBundle = {
    //         ...form.data,
    //         formats: form.data.formats.map((format, index) => ({
    //             id: index + 1,
    //             ...format,
    //         }))
    //     };
    //     console.log('Successfully submitted:', submittedBundle);

    //     // ! Can't call dexie on server.side
    //     // addBundle(form.data.bundleName, formattedData.formats)
    //     return {
    //         success: true,
    //         form,
    //         submittedBundle,
    //     };
    // },

};
