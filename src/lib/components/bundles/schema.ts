import { z } from 'zod'

export const emptyFormat = { name: 'default', width: 10, height: 10 }

export const formSchema = z.object({
    bundleName: z.string().refine(
        (value) => value.length >= 2 && value.length <= 50,
        { message: "Bundle name must be between 2 and 50 characters" }
    ),
    formats:
        z.object({
            name: z.string().refine(
                (value) => value.length >= 2 && value.length <= 50,
                { message: "Name must be between 2 and 50 characters" }
            ),
            width: z.number().int().refine(
                (value) => value >= 10, { message: "Min: 10px" }
            ),
            height: z.number().int().refine(
                (value) => value >= 10, { message: "Min: 10px" }
            ),
        })
            .array()
            // .default([
            //     emptyFormat
            // ])
            .refine((formats) => {
                const names: string[] = [];
                for (const format of formats) {
                    if (names.includes(format.name)) false
                    names.push(format.name);
                }
                return true;
            }, { message: "Each format name must be unique" })
})

export type FormSchema = typeof formSchema;