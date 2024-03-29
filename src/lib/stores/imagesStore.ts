import { writable } from 'svelte/store';
import { toastStore } from '@skeletonlabs/skeleton';
import { tAdd, tReset, tErr, tErrLibExport } from '$lib/strings';
import { isEmpty } from '$lib/utils';
let nextId = 1;

function getImageDimensions(blob: Blob) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            URL.revokeObjectURL(image.src); // Free memory
            resolve({ width: image.width, height: image.height });
        };
        image.onerror = reject;
        image.src = URL.createObjectURL(blob);
    });
}

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
                nextId = 1;
                set([])
                selected.set(0)
                toastStore.trigger(tReset);
            }
        },

        // * Add loaded photos to the store with additionnal metadatas 
        loadPhotos: async (fileList: FileList) => {
            loading.set(true); // Set loading to true before loading photos
            const promises = Array.from(fileList).map(file => {
                return new Promise<void>(resolve => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const dimensions = await getImageDimensions(file);
                        const base64String = reader.result;
                        const newFile = {
                            data: base64String,
                            name: file.name,
                            id: nextId++,
                            status: "original",
                            meta: {},
                            type: file.type,
                            dimensions
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
            return files.find((file: { id: number }) => file.id === id);
        },

        // * Return all photos with status "edited"
        getEdited: (store: any) => {
            const files = store;
            const EditedImages = files.filter((file: { status: string }) => file.status === "edited");
            if (isEmpty(EditedImages)) {
                toastStore.trigger(tErrLibExport);
                return '';
            } else {
                return EditedImages
            }
        },

        // * Delete an entry by its ID
        deleteById: (id: number) => {
            update(images => images.filter(image => image.id !== id));
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
export const library = CreateImageStore();

///////////////////////////////////////////////////////////////////////////////
// * LOADING STORE
///////////////////////////////////////////////////////////////////////////////
const loading = writable(false);
export { loading };

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