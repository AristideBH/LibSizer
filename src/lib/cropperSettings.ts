export const template = (aspect: string | number = 1) => {
    return `
    <cropper-canvas background themeColor="#39f">
        <cropper-image scalable="true" rotatable="false" movable></cropper-image>
        <cropper-shade hidden></cropper-shade>
        <cropper-selection initial-coverage="1" resizable aspect-ratio="${aspect}">
            <cropper-handle action="move" theme-color="rgba(255, 255, 255, 0.6)"></cropper-handle>
        </cropper-selection>
    </cropper-canvas>
    `;
}

