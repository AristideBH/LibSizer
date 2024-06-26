import { toast } from 'svelte-sonner';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

import type { Picture } from '$lib/types';
import { db } from '$lib/logic/db';

// * Stores
export const imageAddLoading = writable(false);
export const imageClearLoading = writable(false);
export const selectedImage = writable<number | undefined>(undefined)


////////////////////////////////////////////////////////////////////////////////////////////////
////// * API
////////////////////////////////////////////////////////////////////////////////////////////////

// * Add a new image
export const addImage = async (file: File, blob: Blob | ArrayBuffer, width: number, height: number) => {
    const { name, type, size } = file;
    // Set loading to true
    imageAddLoading.set(true);

    try {
        // Add the image to the database
        await db.images.add({ blob, name, type, size, width, height });
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

// * Delete an image by its ID
const deleteImage = (id: number | undefined) => {
    if (id !== undefined) return db.images.delete(id);
};

// * Clear the database from every upload
// todo : reset id to one
export const clearDB = async () => {
    imageClearLoading.set(true);

    try {
        await db.images.clear();
        imageClearLoading.set(false);
        toast.success('Library cleared successfully !');
        goto('/')
        // throw redirect(301, '/')
    } catch (error) {
        console.error('Error clearing the database:', error);
        imageClearLoading.set(false);
        toast.error('Something wrong happened clearing clearing the library');
        throw error;
    }
}

// * Get the image object by its ID
const getImageById = async (id: number | undefined): Promise<Picture | undefined> => {
    if (id !== undefined) {
        try {
            const image = await db.images.get(id);
            return image;
        } catch (error) {
            console.error('Error retrieving image by ID:', error);
            throw error;
        }
    }
    return undefined;
};

// * Generate an src url from the file's blob and type
const createDataUrl = (blob: Blob | ArrayBuffer, type: string): string => {
    const arrayBufferView = new Uint8Array(blob as ArrayBuffer);
    const blobData = new Blob([arrayBufferView], { type });
    const urlCreator = window.URL || window.webkitURL;
    return urlCreator.createObjectURL(blobData);
};

// * Generate an src url from the file
const getSrc = (image: Picture) => {
    return createDataUrl(image.blob, image.type);
};


export { createDataUrl, deleteImage, getImageById, getSrc };


////////////////////////////////////////////////////////////////////////////////////////////////
////// * Related 
////////////////////////////////////////////////////////////////////////////////////////////////
export const highlightLibrary = writable(false);

export const toggleHighlight = (durationInMilliseconds: number) => {
    highlightLibrary.set(true);

    setTimeout(() => {
        highlightLibrary.set(false);
    }, durationInMilliseconds);
};

