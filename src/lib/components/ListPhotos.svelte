<script lang="ts">
	import { ListBox, ListBoxItem, FileDropzone, drawerStore } from '@skeletonlabs/skeleton';
	import { library, selected } from '$lib/imagesStore';
	import Icon from '@iconify/svelte';

	let files: FileList;
	let selectedValue: string = '';

	$: selected.set(selectedValue);

	const gotPhotos = () => {
		library.loadPhotos(files);
	};

	function drawerClose(): void {
		drawerStore.close();
	}

	const statusLogo = (status: string) => {
		if (status === 'edited') return 'mdi:check';
		if (status === 'exported') return 'mdi:check-all';
		if (status === 'original') return 'mdi:camera-image';
	};
</script>

<!-- <pre>{JSON.stringify(selectedValue, undefined, 2)}</pre> -->

<div class="p-4 flex flex-col gap-4 h-full">
	<FileDropzone
		on:change={gotPhotos}
		bind:files
		name="files"
		multiple
		accept="image/png, image/gif, image/jpeg"
	>
		<svelte:fragment slot="message">
			<strong>Upload one or multiple photos</strong>
			<span> or drag and drop</span>
		</svelte:fragment>
		<svelte:fragment slot="meta">(PNG and JPG allowed)</svelte:fragment>
	</FileDropzone>

	{#if $library.length}
		<ListBox>
			{#each $library as item}
				<ListBoxItem
					bind:group={selectedValue}
					name="medium"
					value={item.id}
					on:click={drawerClose}
				>
					<div class="flex gap-2 items-center">
						<img src={item.data} alt={item.name} class="h-4 w-4 object-cover" />
						<span class="line-clamp-1 mr-auto">{item.name}</span>
						<!-- <Icon icon={statusLogo(item.status)} /> -->
					</div>
				</ListBoxItem>
			{/each}
		</ListBox>
		<div class="footer mt-auto flex gap-2 flex-wrap">
			<button class="btn variant-ringed btn-sm" on:click={library.reset}>Clear all photos</button>
			<!-- <button class="btn variant-filled-primary">Export all edited</button> -->
		</div>
	{:else}
		<p>Aucune photo n'est chargée.</p>
	{/if}
</div>
