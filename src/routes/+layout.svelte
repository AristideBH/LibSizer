<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import ListPhotos from '$lib/components/ListPhotos.svelte';
	import { clearLocalStorage } from '$lib/images';
	function drawerOpen(): void {
		drawerStore.open({});
	}
	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Drawer>
	<ListPhotos />
</Drawer>

<AppShell
	slotFooter="p-4"
	slotHeader="border-b border-surface-200"
	slotPageHeader="sticky top-0 z-10 p-4 bg-surface-100 "
	slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64"
>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn bg-primary-500 mr-4" on:click={drawerOpen}> Photos </button>
					<strong class="text-xl uppercase">Image Resizer</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn variant-ringed" on:click={clearLocalStorage}>Clear session</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft"><ListPhotos /></svelte:fragment>
	<svelte:fragment slot="pageHeader">Page Header</svelte:fragment>
	<!-- Router Slot -->
	<div class="p-4">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
