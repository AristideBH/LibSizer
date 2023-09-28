// place files you want to import through the `$lib` alias in this folder.

import { writable } from "svelte/store";

export const selected = writable<number | undefined>(undefined)

