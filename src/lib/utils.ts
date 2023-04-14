import { drawerStore, modalStore, type ModalSettings, type ModalComponent } from "@skeletonlabs/skeleton";
import ConfigPopup from '$lib/components/SizesSettings.svelte';

///////////////////////////////////////////////////////////////////////////////
// * DRAWERS & MODAL FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
export function drawerClose(): void {
    drawerStore.close();
}

export function drawerOpen(): void {
    drawerStore.open({
        width: 'w-[280px] md:w-[480px]',
        position: "right"
    });
}

export const modalComponentRegistry: Record<string, ModalComponent> = {
    modalComponentOne: { ref: ConfigPopup }
};

const modalSettings: ModalSettings = {
    type: 'component',
    component: 'modalComponentOne'
};

export const modalSettingsOpen = () => {
    modalStore.trigger(modalSettings)
}


///////////////////////////////////////////////////////////////////////////////
// * VARIOUS FUNCTIONS
///////////////////////////////////////////////////////////////////////////////
export const omitExt = (fileName: string): string => {
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

export const ratioToNb = (ratio: string | number) => (typeof ratio === 'string' ? 0 : ratio);

export const ratioNbtoString = (ratio: number) => {
    switch (ratio) {
        case 0:
            return 'Fit'
            break;
        case 1:
            return 'Square'
            break;
        case 0.8:
            return '4/5'
            break;
        case .75:
            return '3/4'
            break;
        case 1.333333333:
            return '4/3'
            break;
        case 1.25:
            return '5/4'
            break;

        default:
            return ratio
            break;
    }
};