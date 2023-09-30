import slugify from '@sindresorhus/slugify'
import { toast } from 'svelte-sonner';
import { writable } from '@macfja/svelte-persistent-store';

import type { Bundle, Format, NullableKeys } from '$lib/types';
import { db } from '$lib/db'

///////////////////////////////////////////////////////////////////////////////////////////
// ! WARNING
// When creating a new bundle and naming the different formats,
// pleasebe sure to omit any of the following character in the 'name' key :
// \ / : * ? " < > |
// This will break the naming convention when exporting zip file, resulting in an inappropriate file name.

// * Prepolulate data
const initialBundles: Bundle[] = [
    {
        value: "standard",
        label: "Standard",
        formats: [
            { id: 1, name: "Portrait 3:4", width: 900, height: 1200 },
            { id: 2, name: "Landscape 4:3", width: 1200, height: 900 },
            { id: 3, name: "Landscape 16:9", width: 1920, height: 1080 },
            { id: 4, name: "Portrait 9:16", width: 1080, height: 1920 },
            { id: 5, name: "Square", width: 1080, height: 1080 },
        ]
    }
];

// * Selected Bundle Store
export const selectedB = writable<Bundle | undefined>('selectedB', initialBundles[0]);

db.populateBundles(initialBundles);


////////////////////////////////////////////////////////////////////////////////////////////////
//// * API FUNCTIONS 
////////////////////////////////////////////////////////////////////////////////////////////////

// * Add a new bundle
export async function addBundle(bundleName: string, formatList: Format[] | NullableKeys<Format>[]) {
    try {
        if (bundleName == '') {
            toast.error(`Please enter a bundle name !`)
            return
        }

        // Convert formatList to a valid Format[] with non-nullable properties
        const nonNullableFormats: Format[] = formatList.map((format) => ({
            id: format.id,
            name: format.name || `DefaultName-${format.id}`, // Provide a default value if name can be null
            width: format.width || 150, // Provide a default value if width can be null
            height: format.height || 150, // Provide a default value if height can be null
        }));

        // Check if a bundle with the same value or label already exists
        const existingBundle = await db.bundles
            .where('value')
            .equals(slugify(bundleName))
            .or('label')
            .equals(bundleName)
            .first();

        if (existingBundle) {
            toast.warning(`A bundle with the value or label "${bundleName}" already exists.`);
        } else {
            // Add the new bundle since it doesn't exist yet
            const id = await db.bundles.add({
                value: slugify(bundleName),
                label: bundleName,
                formats: nonNullableFormats
            });
            toast.success(`Bundle "${bundleName}" successfully added, with id: ${id}`)

        }
    } catch (error) {
        toast.error(`Failed to add ${bundleName}`)
        console.log(`Failed to add ${bundleName}: ${error}`);

    }
}

// * Remove a bundle by its ID
export const deleteBundle = async (id: number | undefined) => {
    try {
        if (id === undefined) {
            // Handle the case where 'id' is undefined (e.g., if it's not provided or invalid)
            throw new Error('Invalid bundle ID');
        }

        toast.success(`Bundle with id: ${id} successfully deleted`)
        return await db.bundles.delete(id);
    } catch (error) {
        // Handle the error gracefully
        console.error('Error deleting bundle:', error);
        throw error; // Re-throw the error to propagate it to the caller if needed
    }
};


////////////////////////////////////////////////////////////////////////////////////////////////
////// * RELATED
////////////////////////////////////////////////////////////////////////////////////////////////

// * Find and return the formats by bundle.value
export function findBundleByValue(value: string, bundles: Bundle[]): Bundle | undefined {
    return bundles.find((bundle) => bundle.value === value);
}

// * Return the same aspect ratio together, name them accordingly
export function getUniqueRatios(formats: Array<Format> | undefined): Array<{
    ratio: number,
    formats: Array<Format>
}> | null {

    if (!formats) return null;

    const ratioMap = new Map<number, Array<Format>>();

    for (let i = 0; i < formats.length; i++) {
        const { id, width, height, name } = formats[i];
        if (height !== undefined && width !== undefined) {
            const ratio = width / height;
            if (ratioMap.has(ratio)) {
                const formatsWithSameRatio = ratioMap.get(ratio)!;
                formatsWithSameRatio.push({ id, name, width, height });
            } else {
                ratioMap.set(ratio, [{ id, name, width, height }]);
            }
        }
    }

    const ratioList: Array<{ ratio: number, formats: Array<Format> }> = [];
    for (const [ratio, formats] of ratioMap.entries()) {
        ratioList.push({ ratio, formats });
    }

    return ratioList;
}