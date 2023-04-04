import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';
import type { FileDropzone } from '@skeletonlabs/skeleton';
import { toastStore } from '@skeletonlabs/skeleton';
import { tAdd, tReset } from '$lib/strings';

function CreateImageStore() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        reset: () => {
            const confirmed = confirm("Are you sure you want to delete all photos ?");
            if (confirmed) {
                set([])
                toastStore.trigger(tReset);
            }
        },
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
        getById: (id: string, store: any) => {
            const files = store; // get the current state of the store
            return files.find((file: { id: string; }) => file.id === id); // find the file with matching id
        },
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


function CreateSelectedStore() {
    const { subscribe, set } = writable("");

    return {
        subscribe,
        set,
        reset: () => set('[]')
    };
}

export const selected = CreateSelectedStore();