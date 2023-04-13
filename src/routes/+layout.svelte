<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import 'cropperjs/dist/cropper.css';
	import Icon from '@iconify/svelte';
	import { AppShell, AppBar, Drawer, storePopup, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import Nav from '$lib/components/Nav.svelte';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import HeaderGroup from '$lib/components/HeaderGroup.svelte';
	import ConfigPopup from '$lib/components/SizesSettings.svelte';
	import ClientSelect from '$lib/components/ClientSelect.svelte';
	import { drawerOpen } from '$lib/utils';
	import { Modal, modalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

	const settings: ModalSettings = {
		type: 'component',
		// Pass the component registry key as a string:
		component: 'modalComponentOne'
	};

	const modalComponentRegistry: Record<string, ModalComponent> = {
		// Custom Modal 1
		modalComponentOne: {
			// Pass a reference to your custom component
			ref: ConfigPopup
		}
	};
</script>

<svelte:head>
	<title>LibSizer</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"></script>
</svelte:head>

<svelte:window on:load={drawerOpen()} />

<Toast />
<Drawer>
	<ListPhotos />
</Drawer>
<Modal components={modalComponentRegistry} />

<AppShell
	regionPage="relative"
	slotHeader="border-b border-surface-300 bg-surface-50 "
	slotPageHeader="bg-surface-50 border-b border-surface-300 gap-2 flex items-center justify-between sticky top-0 "
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-r border-surface-300 resize-x lg:max-w-xl lg:min-w-[16rem] "
>
	<svelte:fragment slot="header">
		<AppBar
			regionRowMain=" gap-2 justify-between px-4 container"
			slotLead="flex gap-7 justify-center"
		>
			<svelte:fragment slot="lead">
				<a
					href="/"
					class="text-2xl font-black uppercase underline underline-offset-4 decoration-primary-500 decoration-dashed hover:decoration-solid"
				>
					LibSizer
				</a>

				<Nav />
				<ClientSelect />
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<HeaderGroup
					handleLibClick={drawerOpen}
					handleCogClick={() => modalStore.trigger(settings)}
				/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- <svelte:fragment slot="sidebarLeft"><ListPhotos /></svelte:fragment> -->

	<slot />
</AppShell>
