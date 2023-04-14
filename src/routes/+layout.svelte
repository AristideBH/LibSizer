<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import 'cropperjs/dist/cropper.css';

	// prettier-ignore
	import { AppShell, Drawer,  Toast, Modal, modalStore	} from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	import { drawerOpen } from '$lib/utils';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import HeaderGroup from '$lib/components/HeaderGroup.svelte';
	import ConfigPopup from '$lib/components/SizesSettings.svelte';

	const settings: ModalSettings = {
		type: 'component',
		component: 'modalComponentOne'
	};

	const modalComponentRegistry: Record<string, ModalComponent> = {
		modalComponentOne: {
			// Pass a reference to your custom component
			ref: ConfigPopup
		}
	};
</script>

<svelte:head>
	<title>Crop your photos</title>
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
	slotHeader="border-b border-surface-300 bg-surface-50 "
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-r border-surface-300 resize-x lg:max-w-xl lg:min-w-[16rem] "
>
	<svelte:fragment slot="header">
		<HeaderGroup handleLibClick={drawerOpen} handleCogClick={() => modalStore.trigger(settings)} />
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft"><ListPhotos /></svelte:fragment> -->

	<slot />
</AppShell>
