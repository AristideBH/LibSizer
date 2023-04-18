<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import '$lib/css/croppr.postcss';

	import { AppShell, Drawer, Toast, Modal } from '@skeletonlabs/skeleton';

	import { drawerOpen, modalSettingsOpen, modalComponentRegistry } from '$lib/utils';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import HeaderGroup from '$lib/components/HeaderBar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Crop your library easily</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<svelte:window on:load={() => drawerOpen()} />

<Toast />

<Drawer>
	<ListPhotos />
</Drawer>

<Modal components={modalComponentRegistry} />

<AppShell
	regionPage="relative"
	slotHeader="border-b border-surface-200-700-token bg-surface-200-700-token "
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-r border-surface-500/50 resize-x lg:max-w-xl lg:min-w-[16rem] "
>
	<svelte:fragment slot="header">
		<HeaderGroup handleLibClick={drawerOpen} handleCogClick={modalSettingsOpen} />
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft"><ListPhotos /></svelte:fragment> -->

	<slot />
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
</AppShell>
