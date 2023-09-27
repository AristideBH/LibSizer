import { writable } from "svelte/store";
import { persistBrowserSession } from "@macfja/svelte-persistent-store"

// TYPES
export interface Size {
    id: number;
    name: string;
    width?: number;
    height?: number;
}

export interface SizesBundle {
    value: string;
    label: string;
    bundle: Array<Size>;
}

///////////////////////////////////////////////////////////////////////////////
// * CLIENTS SIZE BUNDLES SET
///////////////////////////////////////////////////////////////////////////////
// ! WARNING
// When creating a new bundle and naming the different formats,
// pleasebe sure to omit any of the following character in the 'name' key :
// \ / : * ? " < > |
// This will break the naming convention when exporting zip file, resulting in an inappropriate file name.
///////////////////////////////////////////////////////////////////////////////
const MousquetairesSizes: SizesBundle = {
    value: "mousquetaires",
    label: "Mousquetaires",
    bundle: [
        { id: 1, name: "Vignette Portail Groupement", width: 195, height: 195 },
        { id: 2, name: "Vignette Document Groupement", width: 150, height: 120 },
        { id: 3, name: "Vignette Fil", width: 150, height: 150 },
        // { id: 4, name: "Corps Documents Intranet", width: 500 },
        { id: 5, name: "Yammer", width: 2083, height: 2083 },
        { id: 6, name: "Bannière Fil", width: 195, height: 195 }
    ]
}

const VisaSizes: SizesBundle = {
    value: "visa",
    label: "Visa",
    bundle: [
        { id: 1, name: "Homepage", width: 1024, height: 600 },
        { id: 2, name: "Landing", width: 1024, height: 385 },
        { id: 3, name: "Mobile", width: 780, height: 640 },
        { id: 4, name: "NL event", width: 575, height: 430 },
        { id: 5, name: "NL privilege", width: 280, height: 267 },
        { id: 6, name: "NL invitation", width: 560, height: 300 },
        { id: 7, name: "NL edito", width: 480, height: 250 },
        { id: 8, name: "NL bloc produit", width: 640, height: 760 }
    ]
}

const StandardSizes: SizesBundle = {
    value: "standard",
    label: "Standard",
    bundle: [
        { id: 1, name: "Portrait 3:4", width: 900, height: 1200 },
        { id: 2, name: "Landscape 4:3", width: 1200, height: 900 },
        { id: 3, name: "Landscape 16:9", width: 1920, height: 1080 },
        { id: 4, name: "Portrait 9:16", width: 1080, height: 1920 },
        { id: 5, name: "Square", width: 1080, height: 1080 },
    ]
}

const InstagramSizes: SizesBundle = {
    value: "instagram",
    label: "Instagram",
    bundle: [
        { id: 1, name: "Square", width: 1080, height: 1080 },
        { id: 2, name: "Portrait 4:5", width: 1080, height: 1350 },
        { id: 3, name: "Landscape 16:9", width: 1080, height: 608 },
    ]
}

const Test: SizesBundle = {
    value: "test",
    label: "Test",
    bundle: [
        { id: 1, name: "Square1", width: 1080, height: 1080 },
        { id: 2, name: "Square2", width: 720, height: 720 },
        { id: 3, name: "Portrait 4:5", width: 1080, height: 1350 },

    ]
}

// * AGREGATE ALL BUNDLES
const AllBundles: SizesBundle[] = [
    InstagramSizes,
    StandardSizes,
    MousquetairesSizes,
    VisaSizes, Test
]

// * STORES
export const bundles = persistBrowserSession(writable(AllBundles), "bundles")
export const selectedBundle = persistBrowserSession<undefined | SizesBundle>(writable(AllBundles[0]), "selectedBundle")

// * FUNCTIONS
export function findBundleByValue(value: string, bundles: SizesBundle[]): SizesBundle | undefined {
    return bundles.find((bundle) => bundle.value === value);
}

export function getUniqueRatios(sizes: Array<Size> | undefined): Array<{
    ratio: number | string, sizes: Array<Size>
}> | null {

    if (!sizes) return null

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

export const bundleSizes = (selectedBundle: SizesBundle | undefined) => {
    if (!selectedBundle) return

    const bundle = AllBundles.find((bundle) => bundle.value === selectedBundle.value);
    if (bundle) {
        return bundle.bundle;

    } else {
        return AllBundles[0].bundle;
    }
};