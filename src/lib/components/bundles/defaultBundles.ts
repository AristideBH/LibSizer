import type { Bundle } from "$lib/types"
///////////////////////////////////////////////////////////////////////////////
// * CLIENTS SIZE BUNDLES SET
///////////////////////////////////////////////////////////////////////////////
// ! WARNING
// When creating a new bundle and naming the different formats,
// pleasebe sure to omit any of the following character in the 'name' key :
// \ / : * ? " < > |
// This will break the naming convention when exporting zip file, resulting in an inappropriate file name.
///////////////////////////////////////////////////////////////////////////////

const Mousquetaires: Bundle = {
    value: "mousquetaires",
    label: "Mousquetaires",
    formats: [
        { id: 1, name: "Vignette Portail Groupement", width: 195, height: 195 },
        { id: 2, name: "Vignette Document Groupement", width: 150, height: 120 },
        { id: 3, name: "Vignette Fil", width: 150, height: 150 },
        // { id: 4, name: "Corps Documents Intranet", width: 500 },
        { id: 5, name: "Yammer", width: 2083, height: 2083 },
        { id: 6, name: "Bannière Fil", width: 195, height: 195 }
    ]
}

const Visa: Bundle = {
    value: "visa",
    label: "Visa",
    formats: [
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

const Standard: Bundle = {
    value: "standard",
    label: "Standard",
    formats: [
        { id: 1, name: "Portrait 3:4", width: 900, height: 1200 },
        { id: 2, name: "Landscape 4:3", width: 1200, height: 900 },
        { id: 3, name: "Landscape 16:9", width: 1920, height: 1080 },
        { id: 4, name: "Portrait 9:16", width: 1080, height: 1920 },
        { id: 5, name: "Square", width: 1080, height: 1080 },
    ]
}

const Instagram: Bundle = {
    value: "instagram",
    label: "Instagram",
    formats: [
        { id: 1, name: "Square", width: 1080, height: 1080 },
        { id: 2, name: "Portrait 4:5", width: 1080, height: 1350 },
        { id: 3, name: "Landscape 16:9", width: 1080, height: 608 },
    ]
}

const Test: Bundle = {
    value: "test",
    label: "Test",
    formats: [
        { id: 1, name: "Square1", width: 1080, height: 1080 },
        { id: 2, name: "Square2", width: 720, height: 720 },
        { id: 3, name: "Portrait 4/5", width: 1080, height: 1350 },

    ]
}

export { Mousquetaires, Visa, Instagram, Standard, Test }