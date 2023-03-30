import { Toast, toastStore } from '@skeletonlabs/skeleton';
import type { ToastSettings } from '@skeletonlabs/skeleton';

const t: ToastSettings = {
    message: 'Cette session a été supprimé avec succès !'
};


export const clearLocalStorage = (): void => {
    if (typeof localStorage !== 'undefined') {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir terminer cette session ?');
        if (confirmed) {
            localStorage.removeItem('images');
            toastStore.trigger(t);


        }
    }
};