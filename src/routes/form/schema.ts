import { z } from 'zod'

export const schema = z.object({
    bundleName: z.string().min(2).max(50),
    formats:
        z.object({
            // id: z.number().int().min(1),
            name: z.string().min(2),
            width: z.number().int().min(10),
            height: z.number().int().min(10),
        }).array()
            .default([{ name: '', width: 0, height: 0 }, { name: '', width: 0, height: 0 }])
            .refine((formats) => {
                const names: string[] = [];

                for (const format of formats) {
                    if (names.includes(format.name)) {
                        return false;
                    }
                    names.push(format.name);
                }

                return true;
            }, { message: "Each format name must be unique" })
})

export type Schema = typeof schema;