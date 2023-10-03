import { z } from 'zod'

export const emptyFormat = { name: 'Vignette', width: 50, height: 50 }

export const schema = z.object({
    bundleName: z.string().min(2).max(50)
        .default("test"),
    formats:
        z.object({
            name: z.string().min(2).max(50)
                .refine((name) => name.length <= 50, {
                    message: "Name must be between 2 and 50 characters",
                }),
            width: z.number().int().min(10)
                .refine((width) => width <= 1000, {
                    message: "Width must be bigger than 10px",
                }),
            height: z.number().int().min(10)
                .refine((width) => width <= 1000, {
                    message: "Height must be bigger than 10px",
                }),
        }).array()
            .default([
                emptyFormat,
                //  { ...emptyFormat }
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