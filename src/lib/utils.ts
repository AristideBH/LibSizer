export const omitExtension = (fileName: string): string => {
    if (/\.(jpe?g|png)$/i.test(fileName)) {
        return fileName.replace(/\.(jpe?g|png)$/i, '');
    }
    return fileName;
};


export const dataURLToBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
};
