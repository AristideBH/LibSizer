import { writable } from 'svelte/store';
import { persist, createIndexedDBStorage } from '@macfja/svelte-persistent-store';


export const BundleSelected = persist(writable("Mousquetaires"), createIndexedDBStorage(), 'BundleSelected');