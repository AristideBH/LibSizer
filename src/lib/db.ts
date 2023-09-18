import Dexie from 'dexie';
type Picture = {
    id?: number;
    data: Blob | ArrayBuffer | string;
};

export const db = new Dexie('imageDB') as Dexie & {
    images: Dexie.Table<Picture, number>;
};

db.version(1).stores({
    images: '++id, data',
});

//DUMMY TEST    
const dummyData = [
    {
        data: "test"
    }
];
db.on('populate', function (transaction) {
    transaction.images.bulkAdd(dummyData);
});


//API FN
const insertPicture = (data: Blob | ArrayBuffer): Promise<number> =>
    db.images.add({ data });

const getPictureById = (id: number): Promise<Picture | undefined> =>
    db.images.get(id);


db.open();

export { insertPicture, getPictureById }