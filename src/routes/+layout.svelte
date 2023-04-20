<script lang="ts">
	// STYLE SETUP
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import '$lib/css/croppr.postcss';

	// LIBS IMPORT
	import type { PageData } from './$types';
	import { slide } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { Svrollbar } from 'svrollbar';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// prettier-ignore
	import { AppShell, Drawer, Toast, Modal, ProgressBar, autoModeWatcher, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { drawerOpen, modalSettingsOpen, modalComponentRegistry, scrollToTop } from '$lib/utils';

	// COMPONENTS IMPORT
	import { loading } from '$lib/stores/imagesStore';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';

	// DATA
	export let data: PageData;
	$: if ($navigating) scrollToTop();
</script>

<svelte:head>
	<title>Crop your library easily</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
	<meta name="theme-color" content="#dcdee8" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#2f3654" media="(prefers-color-scheme: dark)" />

	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<svelte:window on:load={() => drawerOpen()} />

<Toast position="bl" />

<Drawer rounded="rounded-none">
	<ListPhotos />
</Drawer>

<Modal shadow="shadow-xl" components={modalComponentRegistry} />

<AppShell
	regionPage="relative"
	slotPageHeader="border-b border-surface-200-700-token bg-surface-100-800-token z-30"
	slotSidebarRight="bg-surface-100-800-token w-0 lg:w-64 border-l border-surface-500/50 lg:max-w-xl lg:min-w-[480px]"
>
	<svelte:fragment slot="pageHeader">
		<Header handleLibClick={drawerOpen} handleCogClick={modalSettingsOpen} />
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarRight"><ListPhotos /></svelte:fragment> -->

	<PageTransition pathname={data.pathName}>
		<slot />
	</PageTransition>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>

<Svrollbar initiallyVisible />

{#if $loading}
	<div
		transition:slide|local
		class="progress-bar w-full fixed bottom-0 z-50 left-0 right-0 pointer-events-none"
	>
		<ProgressBar rounded="rounded-none" meter="bg-primary-500" class="pointer-events-none" />
	</div>
{/if}
