import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { toastStore } from '@skeletonlabs/skeleton';
import { tAdd, tReset } from '$lib/strings';
let nextId = 1;
///////////////////////////////////////////////////////////////////////////////
// * LOADED IMAGES STORE
///////////////////////////////////////////////////////////////////////////////
function CreateImageStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,

        // * Empty the current loaded photo
        reset: () => {
            const confirmed = confirm("Are you sure you want to delete all photos ?");
            if (confirmed) {
                set([])
                toastStore.trigger(tReset);
            }
        },

        // * Add loaded photos to the store with additionnal metadatas 
        loadPhotos: async (fileList: FileList) => {
            loading.set(true); // Set loading to true before loading photos
            const promises = Array.from(fileList).map(file => {
                return new Promise(resolve => {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const base64String = reader.result;
                        const newFile = {
                            data: base64String,
                            name: file.name,
                            id: nextId++,
                            status: "original",
                            meta: {}
                        };
                        update(n => [...n, newFile]);
                        resolve();
                    };
                    reader.readAsDataURL(file);
                });
            });
            await Promise.all(promises);
            loading.set(false); // Set loading to false when loading is finished
            toastStore.trigger(tAdd);
        },


        // * Return the photo with matching ID
        getById: (id: number, store: any) => {
            const files = store;
            return files.find((file: { id: number; }) => file.id === id);
        },

        // * Return all photos with status "edited"
        getEdited: (store: any) => {
            const files = store;
            return files.filter((file: { status: string }) => file.status === "edited");
        },

        // * Add metadatas and "edited" status to the photo with matching ID
        updatePhotoById: (id: number, meta: object) => {
            update(n => {
                const updatedFiles = n.map(file => {
                    if (file.id === id) {
                        return {
                            ...file,
                            meta: {
                                ...file.meta,
                                ...meta // merge the existing meta with the new meta object
                            },
                            status: 'edited'
                        };
                    } else {
                        return file;
                    }
                });
                return updatedFiles;
            });

        }
    };
}
const loading = writable(false);

export { loading };
export const library = CreateImageStore();

///////////////////////////////////////////////////////////////////////////////
// * SELECTED IMAGE STORE from LIBRARY
///////////////////////////////////////////////////////////////////////////////
function CreateSelectedStore() {
    const { subscribe, set } = writable(0);

    return {
        subscribe,
        set,
        reset: () => set(0),
    };
}

export const selected = CreateSelectedStore();