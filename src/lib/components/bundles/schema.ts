import { z } from 'zod'

export const emptyFormat = { name: '', width: undefined, height: undefined }

export const schema = z.object({
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
        }).array()
            //@ts-expect-error : Defaults bundles are intentionnaly undefined for 'width' and 'height'
            .default([
                emptyFormat,
                { ...emptyFormat }
            ])
            .refine((formats) => {
                const names: string[] = [];
                for (const format of formats) {
                    if (names.includes(format.name)) false
                    names.push(format.name);
                }
                return true;
            }, { message: "Each format name must be unique" })
})

export type Schema = typeof schema;