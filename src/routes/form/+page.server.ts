import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { superValidate } from "sveltekit-superforms/server";
import { schema } from "./schema";


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
        console.log('form submitted');
        // console.log(form.data);
        return {
            form
        };
    },

};

// Define a function to get the formats from the session or initialize it
// addFormat: async (event,) => {
//     console.log(event);

//     // Handle adding a new format here
//     formats.push({ id: formats.length + 1, name: '', width: 10, height: 10 });

//     // Optionally, you can return a response or perform other actions
//     console.log('New format added');
//     const form = await superValidate(event, schema, { errors: true });
//     return {
//         form,
//         addSuccess: true,
//     };
// },