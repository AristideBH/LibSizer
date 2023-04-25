import type { ToastSettings } from '@skeletonlabs/skeleton';

///////////////////////////////////////////////////////////////////////////////
// * TOASTS STRINGS
///////////////////////////////////////////////////////////////////////////////
const tErr: ToastSettings = {
    message: "Something did not go well. Please retry.",
    background: 'variant-filled-error',
};

const tErrLibExport: ToastSettings = {
    message: "Please make sure you saved your croppings.",
    background: 'variant-filled-error',
};

const tEdit: ToastSettings = {
    message: 'Picture successfully updated.',
    background: 'variant-filled-surface',
};

const tAdd: ToastSettings = {
    message: 'Added with success.',
    background: "variant-filled-surface",
};

const tReset: ToastSettings = {
    message: 'The library has been cleared',
    background: "variant-filled-surface",
};

///////////////////////////////////////////////////////////////////////////////
// * STATIC STRINGS
///////////////////////////////////////////////////////////////////////////////
const noPhoto = "Please upload and select a photo in the library"

///////////////////////////////////////////////////////////////////////////////
export {
    tErr, tEdit, tAdd, tReset, noPhoto, tErrLibExport
};