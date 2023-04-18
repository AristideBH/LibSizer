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

export const ratioNbtoString = (ratio: number): string => {
    const ratios: Record<number, string> = {
        0: 'Fit',
        1: 'Square',
        0.8: '4/5',
        0.75: '3/4',
        1.3333: '4/3',
        1.25: '5/4',
        0.5625: '9/16',
        1.7778: '16/9'
    };

    return ratios[ratio] || ratio.toFixed(4).toString();
};


///////////////////////////////////////////////////////////////////////////////
// * TEMPLATING FORMAT
///////////////////////////////////////////////////////////////////////////////

import type { IconifyIcon } from '@iconify/svelte';
interface StatusIcons {
    [key: string]: IconifyIcon;
}

export const statusIcon = (status: string): IconifyIcon => {
    const icons: StatusIcons = {
        edited: 'mdi:check' as unknown as IconifyIcon,
        exported: 'mdi:check-all' as unknown as IconifyIcon,
        original: 'mdi:camera-image' as unknown as IconifyIcon,
    };

    return icons[status] || 'mdi:check' as unknown as IconifyIcon;
};