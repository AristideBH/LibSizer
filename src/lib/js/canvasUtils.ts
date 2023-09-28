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
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
}

/**
 * Returns the file name without the extension
 */
export const omitExt = (fileName: string): string => {
    if (/\.(jpe?g|png|webp|gif|ico|tif?f)$/i.test(fileName)) {
        return fileName.replace(/\.(jpe?g|png|webp|gif|ico|tif?f)$/i, '');
    }
    return fileName;
};

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    desiredSize: { width: number; height: number },
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
    const scaleFactorX = desiredSize.width / pixelCrop.width;
    const scaleFactorY = desiredSize.height / pixelCrop.height;

    // Set canvas size to match the desired size
    canvas.width = desiredSize.width;
    canvas.height = desiredSize.height;

    // Translate canvas context to the center to allow rotating and flipping around the center
    ctx.translate(desiredSize.width / 2, desiredSize.height / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

    // Draw the cropped and rotated image onto the canvas
    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        -desiredSize.width / 2,
        -desiredSize.height / 2,
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



import Fraction from 'fraction.js';

export function decimalToFraction(decimal: number): string {
    const fraction = new Fraction(decimal);
    if (fraction.equals(1)) {
        return 'square';
    }
    return fraction.toFraction();
}