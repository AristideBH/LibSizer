<script lang="ts">
	import { ListBox, ListBoxItem, FileDropzone } from '@skeletonlabs/skeleton';
	import { library, selected } from '$lib/imagesStore';
	import { drawerClose } from '$lib/utils';
	import Icon from '@iconify/svelte';

	let files: FileList;
	let selectedValue: string;

	$: selected.set(selectedValue);

	const gotPhotos = () => {
		library.loadPhotos(files);
	};

	const statusLogo = (status: string) => {
		if (status === 'edited') return 'mdi:check';
		if (status === 'exported') return 'mdi:check-all';
		if (status === 'original') return 'mdi:camera-image';
	};

	const getEdited = () => {
		const data = library.getEdited($library);
		console.log(data);
	};
</script>

<!-- <pre>{JSON.stringify(selectedValue, undefined, 2)}</pre> -->

<div class="p-4 flex flex-col gap-4 h-full">
	<h2>Library</h2>
	<hr />
	<FileDropzone
		on:change={gotPhotos}
		bind:files
		name="files"
		multiple
		accept="image/png, image/gif, image/jpeg"
		slotLead="flex items-center justify-center mb-4"
		title="Upload your pictures"
		placeholder=""
	>
		<svelte:fragment slot="lead"
			><Icon
				class="h-8 w-8 text-surface-900/70"
				icon="mdi:folder-upload-outline"
			/></svelte:fragment
		>
		<svelte:fragment slot="message">
			<strong>Upload one or multiple pictures</strong>
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
						<!-- <span>
							<Icon icon={statusLogo(item.status)} />
						</span> -->
					</div>
				</ListBoxItem>
			{/each}
		</ListBox>
		<div class="footer mt-auto flex gap-2 flex-wrap">
			<button class="btn variant-ringed btn-sm" type="button" on:click={library.reset}
				>Clear all photos</button
			>
			<!-- <button class="btn variant-filled-primary" type="button" on:click={getEdited}
				>Export all edited</button
			> -->
		</div>
	{:else}
		<p class="text-center">No loaded pictures.</p>
	{/if}
</div>
