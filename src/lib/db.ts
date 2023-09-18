import Dexie from 'dexie';
export type Picture = {
    id?: number;
    blob: Blob | ArrayBuffer;
    name: string;
    type: string;
    size: number
};

export const db = new Dexie('imageDB') as Dexie & {
    images: Dexie.Table<Picture, number>;
};

db.version(1).stores({
    images: '++id, blob, path, name, type, size',
});

//DUMMY TEST    
// const dummyData: Array<Picture> = [
//     {
//         blob: "testBlob",
//         name: "test",
//         size: 0,
//         type: 'image/test'
//     }
// ];

// db.on('populate', function (transaction) {
//     transaction.images.bulkAdd(dummyData);
// });


//API Functions
const addImage = (file: File, blob: Blob | ArrayBuffer) => {
    const { name, type, size } = file;
    return db.images.add({ blob, name, type, size });
};

const deleteImage = (id: number | undefined) => {
    if (id !== undefined) return db.images.delete(id);
};

const clearDB = () => {
    return db.images.clear();
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


db.open();

export { addImage, getImageById, deleteImage, clearDB, createDataUrl, getSrc }