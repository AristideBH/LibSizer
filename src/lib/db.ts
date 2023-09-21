import Dexie from 'dexie';
import { writable } from 'svelte/store';

export const imageAddLoading = writable(false);
export const imageClearLoading = writable(false);

// TYPES
export type Picture = {
    id?: number;
    blob: Blob | ArrayBuffer;
    name: string;
    type: string;
    size: number
};


// Init IndexedDB
export const db = new Dexie('imageDB') as Dexie & {
    images: Dexie.Table<Picture, number>;
};
// Create image store with adequat table columns
db.version(1).stores({
    images: '++id, blob, path, name, type, size',
});

// Initial populate    
// db.on('populate', function (transaction) {
//     transaction.images.bulkAdd({
//         blob: "testBlob",
//         name: "test",
//         size: 0,
//         type: 'image/test'
//     });
// });


//API Functions
export const addImage = async (file: File, blob: Blob | ArrayBuffer) => {
    const { name, type, size } = file;
    // Set loading to true
    imageAddLoading.set(true);

    try {
        // Add the image to the database
        await db.images.add({ blob, name, type, size });
        // Set imageAddLoading back to false when the image is added successfully
        await new Promise((resolve) => setTimeout(resolve, 500));
        imageAddLoading.set(false);
    } catch (error) {
        // Handle errors here
        console.error('Error adding image:', error);
        imageAddLoading.set(false);
        throw error; // Re-throw the error to handle it in the component if needed
    }
};

const deleteImage = (id: number | undefined) => {
    if (id !== undefined) return db.images.delete(id);
};

const clearDB = async () => {

    return db.images.clear();
}

export const clearDB2 = async () => {
    imageClearLoading.set(true);

    try {
        await db.images.clear();
        imageClearLoading.set(false);
    } catch (error) {
        console.error('Error clearing the database:', error);
        imageClearLoading.set(false);
        throw error;
    }
    // return db.images.clear();
}

const createDataUrl = (blob: Blob | ArrayBuffer, type: string): string => {
    const arrayBufferView = new Uint8Array(blob as ArrayBuffer);
    const blobData = new Blob([arrayBufferView], { type });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blobData);
};

const getImageById = async (id: number | undefined): Promise<Picture | undefined> => {
    if (id !== undefined) {
        try {
            const image = await db.images.get(id);
            return image;
        } catch (error) {
            console.error('Error retrieving image by ID:', error);
        }
    }
    return undefined;
};

const getSrc = (image: Picture) => {
    return createDataUrl(image.blob, image.type);
};

// 
db.open();

export { getImageById, deleteImage, clearDB, createDataUrl, getSrc }