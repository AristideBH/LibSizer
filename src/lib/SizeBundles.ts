import type { Size } from "./settingsStore"


export interface SizesBundle {
    name: string;
    bundle: Array<Size>;
}


export const MousquetairesSizes: SizesBundle = {
    name: "Mousquetaires",
    bundle: [
        { id: 1, name: "Vignette Portail Groupement", width: 195, height: 195 },
        { id: 2, name: "Vignette Document Groupement", width: 150, height: 120 },
        { id: 3, name: "Vignette Fil", width: 195, height: 195 },
        { id: 4, name: "Corps Documents Intranet", width: 500 },
        { id: 5, name: "Yammer", width: 2083, height: 2083 },
        { id: 6, name: "Bannière Fil", width: 195, height: 195 }
    ]
}
export const VisaSizes: SizesBundle = {
    name: "Visa",
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