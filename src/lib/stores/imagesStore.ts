import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import { toastStore } from '@skeletonlabs/skeleton';
import { tAdd, tReset } from '$lib/strings';

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
        loadPhotos: (fileList: FileList) => {
            Array.from(fileList).forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64String = reader.result;
                    const newFile = {
                        data: base64String,
                        name: file.name,
                        id: uuidv4(),
                        status: "original",
                        meta: {}
                    };
                    update(n => [...n, newFile]);
                };
                reader.readAsDataURL(file);
            });
            toastStore.trigger(tAdd);
        },

        // * Return the photo with matching ID
        getById: (id: string, store: any) => {
            const files = store;
            return files.find((file: { id: string; }) => file.id === id);
        },

        // * Return all photos with status "edited"
        getEdited: (store: any) => {
            const files = store;
            return files.filter((file: { status: string }) => file.status === "edited");
        },

        // * Add metadatas and "edited" status to the photo with matching ID
        updatePhotoById: (id: string, meta: object) => {
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

export const library = CreateImageStore();

///////////////////////////////////////////////////////////////////////////////
// * SELECTED IMAGE STORE from LIBRARY
///////////////////////////////////////////////////////////////////////////////
function CreateSelectedStore() {
    const { subscribe, set } = writable("");

    return {
        subscribe,
        set,
        reset: () => set('[]')
    };
}

export const selected = CreateSelectedStore();