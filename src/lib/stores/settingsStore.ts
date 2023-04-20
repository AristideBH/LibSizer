import { writable } from 'svelte/store';
import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';
import { AllBundles } from '$lib/SizeBundles';
import { BundleSelected } from '$lib/stores/bundleStore';

let settedvalue = "Standard";
BundleSelected.subscribe(value => settedvalue = value)

export interface Size {
    id: number;
    name: string;
    width?: number;
    height?: number;
}

export const bundleSizes = (selectedBundle: string) => {
    const bundle = AllBundles.find((bundle) => bundle.name === selectedBundle);
    if (bundle) {
        return bundle.bundle;
    } else {
        return AllBundles[0].bundle;
    }
};

export const sizesStore = persist(writable(bundleSizes(settedvalue)), createIndexedDBStorage(), 'SizeSettings');

///////////////////////////////////////////////////////////////////////////////
// * STORES FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
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
        height: number | undefined;
        width: number | undefined;
        id: number, name: string
    }>
}> {
    const ratioMap = new Map<number | string, Array<{ id: number, name: string, width: number | undefined, height: number | undefined }>>();
    for (let i = 0; i < sizes.length; i++) {
        const { id, width, height, name } = sizes[i];
        if (height !== undefined && width !== undefined) {
            const ratio = width / height;
            if (ratioMap.has(ratio)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const names = ratioMap.get(ratio)!;
                names.push({ id, name, width, height });
                ratioMap.set(ratio, names);
            } else {
                ratioMap.set(ratio, [{ id, name, width, height }]);
            }
        } else {
            const manualRatio = "fit";
            if (ratioMap.has(manualRatio)) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
