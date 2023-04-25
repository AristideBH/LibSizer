<script lang="ts">
	// STYLE SETUP
	import '$lib/css/theme.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	// LIBS IMPORT
	import type { PageData } from './$types';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { drawerOpen, modalSettingsOpen, modalComponentRegistry } from '$lib/utils';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// COMPONENTS IMPORT
	// prettier-ignore
	import { AppShell, Drawer, Toast, Modal, ProgressBar, autoModeWatcher, storePopup } from '@skeletonlabs/skeleton';
	import { Svrollbar } from 'svrollbar';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Crop your library easily</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
	<meta name="theme-color" content="#d9d9d9" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#282828" media="(prefers-color-scheme: dark)" />

	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<svelte:window on:load={() => drawerOpen()} />

<Toast position="t" max={Number(2)} />

<Modal
	shadow="shadow-xl"
	components={modalComponentRegistry}
	regionBackdrop="bg-surface-50-900-token "
/>

<Drawer rounded="rounded-none" bgBackdrop="bg-surface-50-900-token ">
	<ListPhotos />
</Drawer>

<AppShell
	regionPage="relative"
	slotPageHeader="border-b border-surface-200-700-token bg-surface-50-900-token z-30"
	slotSidebarRight="bg-surface-50-900-token w-0 border-l border-surface-200-700-token lg:max-w-xl lg:min-w-[380px]"
>
	<svelte:fragment slot="pageHeader">
		<Header handleLibClick={drawerOpen} handleCogClick={modalSettingsOpen} />
	</svelte:fragment>

	<svelte:fragment slot="sidebarRight">
		<ListPhotos />
	</svelte:fragment>

	<PageTransition pathname={data.pathName}>
		<slot />
	</PageTransition>

	<svelte:fragment slot="pageFooter"><Footer /></svelte:fragment>
</AppShell>

<Svrollbar initiallyVisible />

<ProgressBar />
