// * TYPES
export type Format = {
    id: number;
    name: string; // !
    width: number;
    height: number;
}

export type NullableKeys<T> = {
    [K in keyof T]: K extends "width" | "height" | 'name' ? T[K] | null : T[K];
}

export type Bundle = {
    id?: number;
    label: string; // !
    value: string;
    formats: Array<Format>;
}

export type Picture = {
    id?: number;
    blob: Blob | ArrayBuffer;
    name: string;
    type: string;
    size: number;
    width?: number;
    height?: number;
};


export type PixelCrop = {
    x: number;
    y: number;
    width: number;
    height: number;
};