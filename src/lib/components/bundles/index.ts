import slugify from '@sindresorhus/slugify'
import { toast } from 'svelte-sonner';
import { writable } from '@macfja/svelte-persistent-store';

import type { Bundle, Format } from '$lib/types';
import { db } from '$lib/logic/db';
import { Instagram, Standard, Visa } from '$lib/components/bundles/defaultBundles';
import { browser } from '$app/environment';

///////////////////////////////////////////////////////////////////////////////////////////
// ! WARNING
// When creating a new bundle and naming the different formats,
// pleasebe sure to omit any of the following character in the 'name' key :
// \ / : * ? " < > |
// This will break the naming convention when exporting zip file, resulting in an inappropriate file name.

// * Prepolulate data
const initialBundles: Bundle[] = [
    Standard, Instagram, Visa
];

// * Selected Bundle Store
export const selectedB = writable<Bundle | undefined>('selectedB', initialBundles[0]);
if (browser) db.populateBundles(initialBundles);


////////////////////////////////////////////////////////////////////////////////////////////////
//// * API FUNCTIONS 
////////////////////////////////////////////////////////////////////////////////////////////////

// * Add a new bundle
export async function addBundle(bundleName: string, formatList: Format[]) {
    try {
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
                formats: formatList
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
export function getUniqueRatios2(formats: Array<Format> | undefined): Array<{
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
