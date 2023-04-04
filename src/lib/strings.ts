import type { ToastSettings } from '@skeletonlabs/skeleton';

const tErr: ToastSettings = {
    message: "Une erreur s'est produite",
    background: 'variant-filled-error'
};

const tEdit: ToastSettings = {
    message: 'Photos mis à jour avec succès',
    background: 'variant-filled-surface'
};

const tAdd: ToastSettings = {
    message: 'Ajouté(s) avec succès',
    background: "variant-filled-surface",
};

const tReset: ToastSettings = {
    message: 'La librairie a bien été supprimée.',
    background: "variant-filled-surface",
};

export {
    tErr, tEdit, tAdd, tReset
};