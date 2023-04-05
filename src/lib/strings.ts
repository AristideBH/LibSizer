import type { ToastSettings } from '@skeletonlabs/skeleton';

const tErr: ToastSettings = {
    message: "Something did not go well. Please retry.",
    background: 'variant-filled-error'
};

const tEdit: ToastSettings = {
    message: 'Pictures successfully updated.',
    background: 'variant-filled-surface'
};

const tAdd: ToastSettings = {
    message: 'Added with success.',
    background: "variant-filled-surface",
};

const tReset: ToastSettings = {
    message: 'The library has been resetted',
    background: "variant-filled-surface",
};

const noPhoto = "Please upload and select a photo in the library"

export {
    tErr, tEdit, tAdd, tReset, noPhoto
};