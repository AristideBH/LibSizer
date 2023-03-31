<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, Drawer, drawerStore, storePopup, Toast } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import ConfigPopup from '$lib/components/ConfigPopup.svelte';

	function drawerOpen(): void {
		drawerStore.open({});
	}
</script>

<svelte:head>
	<title>Lib Resizer</title>
</svelte:head>

<Toast />
<Drawer>
	<ListPhotos />
</Drawer>

<AppShell
	regionPage="relative"
	slotHeader="border-b border-surface-300 bg-surface-50 "
	slotPageHeader="p-4 bg-surface-50 border-b border-surface-300  gap-2 flex items-center justify-between sticky top-0 "
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64 border-r border-surface-300 resize-x lg:max-w-xl lg:min-w-[16rem] "
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn bg-primary-500 mr-4" on:click={drawerOpen}> Library </button>
					<a href="/"><strong class="text-xl uppercase">Lib Resizer</strong></a>
				</div>
				<a href="/editor">Editor</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ConfigPopup />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft"><ListPhotos /></svelte:fragment>

	<slot />
</AppShell>
