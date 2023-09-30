import type { PixelCrop, Format } from '$lib/types';
import Fraction from 'fraction.js';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

export function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * Format parameter implementaed by @AristideBH
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    format: { width: number; height: number },
    rotation: number = 0,
    flip: { horizontal: boolean; vertical: boolean } = { horizontal: false, vertical: false },
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    // Calculate the scale factor for resizing
    const scaleFactorX = format.width / pixelCrop.width;
    const scaleFactorY = format.height / pixelCrop.height;

    // Set canvas size to match the desired size
    canvas.width = format.width;
    canvas.height = format.height;

    // Translate canvas context to the center to allow rotating and flipping around the center
    ctx.translate(format.width / 2, format.height / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

    // Draw the cropped and rotated image onto the canvas
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        -format.width / 2,
        -format.height / 2,
        pixelCrop.width * scaleFactorX,
        pixelCrop.height * scaleFactorY
    );

    // As a blob
    return new Promise<string>((resolve, reject) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            } else {
                reject("Error creating blob.");
            }
        }, "image/jpeg");
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////
////// * RELATED
////////////////////////////////////////////////////////////////////////////////////////////////

// * STRING MANIPULATIONS
// Return a simplified fraction from a ratio
export function decimalToFraction(decimal: number): string {
    const fraction = new Fraction(decimal);
    if (fraction.equals(1)) {
        return 'square';
    }
    return fraction.toFraction();
}

// Returns the file name without the extension
export const omitExt = (fileName: string): string => {
    if (/\.(jpe?g|png|webp|gif|ico|tif?f)$/i.test(fileName)) {
        return fileName.replace(/\.(jpe?g|png|webp|gif|ico|tif?f)$/i, '');
    }
    return fileName;
};

// * DOWNLOAD FUNCTIONS
// Function to fetch Blob data from a Blob URL
async function fetchBlobFromUrl(blobUrl: string): Promise<Blob> {
    const response = await fetch(blobUrl);
    return await response.blob();
}

// Save simple jpg
export const downloadFile = (imageData: Blob | string, formatName: string, imageName: string) => {
    saveAs(imageData, omitExt(imageName) + ' - ' + formatName);
};

// Download the whode ratio
export const handleAspectDownload = async (
    formats: Format[],
    croppedImage: string | null,
    imageData: string,
    pixelCrop: PixelCrop, imageName: string
) => {
    const zip = new JSZip();

    for (const format of formats) {
        const width = format.width ? format.width : pixelCrop.width;
        const height = format.height ? format.height : pixelCrop.height;
        croppedImage = await getCroppedImg(imageData, pixelCrop, { width, height });
        if (croppedImage) {
            const croppedImageBlob = await fetchBlobFromUrl(croppedImage);
            zip.file(omitExt(imageName) + ' - ' + format.name + '.jpg', croppedImageBlob);
        }
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, omitExt(imageName));
};