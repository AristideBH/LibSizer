<script lang="ts">
	import { ListBox, ListBoxItem, FileDropzone, drawerStore } from '@skeletonlabs/skeleton';
	import { library, selected } from '$lib/imagesStore';

	let files: FileList;
	let selectedValue: string = '';

	const gotPhotos = () => {
		library.loadPhotos(files);
	};

	$: selected.set(selectedValue);

	function drawerClose(): void {
		drawerStore.close();
	}
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
		<svelte:fragment slot="message"
			><strong>Upload a photo</strong> <span> or drag and drop</span></svelte:fragment
		>
		<svelte:fragment slot="meta">(PNG and JPG allowed)</svelte:fragment>
	</FileDropzone>

	{#if $library.length}
		<ListBox>
			{#each $library as item, i}
				<ListBoxItem
					bind:group={selectedValue}
					name="medium"
					value={item.id}
					on:click={drawerClose}
				>
					<div class="flex gap-2 items-center">
						<img src={item.data} alt={item.name} class="h-4 w-4 object-cover" />
						<!-- <pre>{JSON.stringify(item, undefined, 2)}</pre> -->
						<span class="line-clamp-1">{item.name}</span>
						<span>{item.status}</span>
					</div>
				</ListBoxItem>
			{/each}
		</ListBox>
		<div class="footer mt-auto">
			<button class="btn variant-ringed btn-sm" on:click={library.reset}>Clear all photos</button>
		</div>
	{:else}
		<p>Aucune photo n'a été chargée.</p>
	{/if}
</div>
