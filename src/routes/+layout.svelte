<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import '$lib/css/croppr.postcss';

	import {
		AppShell,
		Drawer,
		Toast,
		Modal,
		ProgressBar,
		autoModeWatcher
	} from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import type { PageData } from './$types';

	import { drawerOpen, modalSettingsOpen, modalComponentRegistry, scrollToTop } from '$lib/utils';
	import { loading } from '$lib/stores/imagesStore';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import HeaderGroup from '$lib/components/HeaderBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';

	export let data: PageData;
	$: if ($navigating) scrollToTop();
</script>

<svelte:head>
	<title>Crop your library easily</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<svelte:window on:load={() => drawerOpen()} />

<Toast />

<Drawer rounded="rounded-none">
	<ListPhotos />
</Drawer>

<Modal shadow="shadow-xl" components={modalComponentRegistry} />

{#if $loading}
	<div transition:slide>
		<ProgressBar rounded="rounded-none" meter="bg-primary-500" />
	</div>
{/if}

<AppShell
	regionPage="relative"
	slotPageHeader="border-b border-surface-200-700-token bg-surface-200-700-token z-30"
	slotSidebarRight="bg-surface-100-800-token w-0 lg:w-64 border-l border-surface-500/50 lg:max-w-xl lg:min-w-[480px] "
>
	<svelte:fragment slot="pageHeader">
		<HeaderGroup handleLibClick={drawerOpen} handleCogClick={modalSettingsOpen} />
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarRight"><ListPhotos /></svelte:fragment> -->

	<PageTransition pathname={data.pathName}>
		<slot />
	</PageTransition>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
