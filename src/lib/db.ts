import Dexie from 'dexie'
import type { Bundle, Picture } from '$lib/types';

// Custom Dexie class
export class CustomDexie extends Dexie {
    bundles: Dexie.Table<Bundle, number>;
    images: Dexie.Table<Picture, number>;

    constructor(databaseName: string) {
        super(databaseName);
        // Define the 'bundles' table
        this.version(1).stores({
            bundles: '++id, value, label, formats'
        });
        this.bundles = this.table('bundles');
        // Define the 'images' table
        this.version(1).stores({
            images: '++id, blob, path, name, type, size, width, height'
        })
        this.images = this.table('images')
    }

    async populateBundles(data: readonly Bundle[]) {
        try {
            // Check if data has already been added
            const dataExists = await this.bundles.toArray();
            if (dataExists.length === 0) {
                // Use a transaction to bulkAdd initialBundles to the 'bundles' table
                await this.transaction('rw', this.bundles, async () => {
                    await this.bundles.bulkAdd(data);
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

// * Init DB
export const db = new CustomDexie('libSizerDB');