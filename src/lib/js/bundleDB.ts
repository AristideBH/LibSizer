import Dexie from 'dexie'
import slugify from '@sindresorhus/slugify'
import { toast } from 'svelte-sonner';

// * TYPES
export type Format = {
    id: number;
    name: string;
    width: number;
    height: number;
}


export type NullableKeys<T> = {
    [K in keyof T]: K extends "width" | "height" | 'name' ? T[K] | null : T[K];
}

export type Bundle = {
    id?: number;
    value: string;
    label: string;
    formats: Array<Format>;
}

// * Prepolulate data
const initialData: Bundle[] = [
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

// * Custom Dexie store 
class CustomDexie extends Dexie {
    bundles: Dexie.Table<Bundle, number>;

    constructor(databaseName: string) {
        super(databaseName);
        // Define the 'bundles' table
        this.version(1).stores({ bundles: '++id, value, label, formats' });
        this.bundles = this.table('bundles');
    }

    async populateInitialData() {
        try {
            // Check if data has already been added
            const dataExists = await this.bundles.toArray();
            if (dataExists.length === 0) {
                // Use a transaction to bulkAdd initialData to the 'bundles' table
                await this.transaction('rw', this.bundles, async () => {
                    await this.bundles.bulkAdd(initialData);
                });
                console.log('Default bundles added successfully.');
            } else {
                console.log('Default bundles exists. Skipping population.');
            }
        } catch (error) {
            console.error('Error adding data: ', error);
        }
    }
}

export const bDB = new CustomDexie('bundleDB');

bDB.populateInitialData();


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
        const existingBundle = await bDB.bundles
            .where('value')
            .equals(slugify(bundleName))
            .or('label')
            .equals(bundleName)
            .first();

        if (existingBundle) {
            toast.warning(`A bundle with the value or label "${bundleName}" already exists.`);
        } else {
            // Add the new bundle since it doesn't exist yet
            const id = await bDB.bundles.add({
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
        return await bDB.bundles.delete(id);
    } catch (error) {
        // Handle the error gracefully
        console.error('Error deleting bundle:', error);
        throw error; // Re-throw the error to propagate it to the caller if needed
    }
};
