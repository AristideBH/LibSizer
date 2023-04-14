import type { ToastSettings } from '@skeletonlabs/skeleton';

///////////////////////////////////////////////////////////////////////////////
// * TOASTS STRINGS
///////////////////////////////////////////////////////////////////////////////
const tErr: ToastSettings = {
    message: "Something did not go well. Please retry.",
    background: 'variant-filled-error'
};

const tEdit: ToastSettings = {
    message: 'Picture successfully updated.',
    background: 'variant-filled-primary'
};

const tAdd: ToastSettings = {
    message: 'Added with success.',
    background: "variant-filled-primary"
};

const tReset: ToastSettings = {
    message: 'The library has been resetted',
    background: "variant-filled-surface",
};

///////////////////////////////////////////////////////////////////////////////
// * STATIC STRINGS
///////////////////////////////////////////////////////////////////////////////
const noPhoto = "Please upload and select a photo in the library"

///////////////////////////////////////////////////////////////////////////////
export {
    tErr, tEdit, tAdd, tReset, noPhoto
};