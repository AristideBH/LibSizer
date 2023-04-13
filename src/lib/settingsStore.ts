import { writable } from 'svelte/store';
import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { MousquetairesSizes, VisaSizes } from '$lib/SizeBundles';
import { BundleSelected } from '$lib/bundleStore';
let settedvalue = "Visa";

BundleSelected.subscribe(value => settedvalue = value)
export interface Size {
    id: number;
    name: string;
    width?: number;
    height?: number;
}

export const bundleSizes = (selectedBundle: string) => {
    switch (selectedBundle) {
        case "Mousquetaires":
            return MousquetairesSizes.bundle
            break;

        case "Visa":
            return VisaSizes.bundle
            break;

        default:
            return MousquetairesSizes.bundle
            break;
    }
}

export const sizes: Array<Size> = [
    { id: 1, name: "Vignette Portail Groupement", width: 195, height: 195 },
    { id: 2, name: "Vignette Document Groupement", width: 150, height: 120 },
    { id: 3, name: "Vignette Fil", width: 195, height: 195 },
    { id: 4, name: "Corps Documents Intranet", width: 500 },
    { id: 5, name: "Yammer", width: 2083, height: 2083 },
    { id: 6, name: "Bannière Fil", width: 195, height: 195 }
]
export const sizesStore = persist(writable(bundleSizes(settedvalue)), createIndexedDBStorage(), 'SizeSettings');

export function addSize(size: Omit<Size, 'id'>) {
    sizesStore.update(sizes => {
        const lastId = sizes[sizes.length - 1]?.id ?? 0;
        const newId = lastId + 1;
        const newSize = { ...size, id: newId };
        return [...sizes, newSize];
    });
}

export function deleteSize(id: number) {
    if (window.confirm('Are you sure you want to delete this size?')) {
        sizesStore.update(sizes => sizes.filter(size => size.id !== id));
    }
}

export function getUniqueRatios(sizes: Array<Size>): Array<{
    ratio: number | string, sizes: Array<{
        height: number;
        width: number;
        id: number, name: string
    }>
}> {
    const ratioMap = new Map<number | string, Array<{ id: number, name: string, width: number | undefined, height: number | undefined }>>();
    for (let i = 0; i < sizes.length; i++) {
        const { id, width, height, name } = sizes[i];
        if (height !== undefined && width !== undefined) {
            const ratio = width / height;
            if (ratioMap.has(ratio)) {
                const names = ratioMap.get(ratio)!;
                names.push({ id, name, width, height });
                ratioMap.set(ratio, names);
            } else {
                ratioMap.set(ratio, [{ id, name, width, height }]);
            }
        } else {
            const manualRatio = "fit";
            if (ratioMap.has(manualRatio)) {
                const names = ratioMap.get(manualRatio)!;
                names.push({ id, name, width, height });
                ratioMap.set(manualRatio, names);
            } else {
                ratioMap.set(manualRatio, [{ id, name, width, height }]);
            }
        }
    }
    const ratioList: Array<{ ratio: number | string, sizes: Array<{ id: number, name: string, width: number | undefined, height: number | undefined }> }> = [];
    for (const [ratio, names] of ratioMap.entries()) {
        ratioList.push({ ratio, sizes: names });
    }
    return ratioList;
}
