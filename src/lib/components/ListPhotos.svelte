<script lang="ts">
	import { ListBox, ListBoxItem, FileDropzone } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { library, selected } from '$lib/stores/imagesStore';
	import { drawerClose, statusIcon } from '$lib/utils';

	let files: FileList;
	let selectedValue: number;

	$: if (selectedValue) selected.set(selectedValue);

	const gotPhotos = () => {
		library.loadPhotos(files);
	};

	const getEdited = () => {
		const data = library.getEdited($library);
		console.log(data);
	};
</script>

<div class="p-4 flex flex-col gap-4 h-full">
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<h2 tabindex="0">
		Library

		{#if $library.length > 0}
			<span>({$library.length})</span>
		{/if}
	</h2>
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
		<svelte:fragment slot="lead">
			<span class="h-8 w-8 text-primary-900/70">
				<Icon icon="mdi:folder-upload-outline" width="100%" />
			</span>
		</svelte:fragment>
		<svelte:fragment slot="message">
			<strong>Upload one or multiple pictures</strong>
			<span> or drag and drop</span>
		</svelte:fragment>
		<svelte:fragment slot="meta">(PNG and JPG allowed)</svelte:fragment>
	</FileDropzone>

	<!-- LIST UPLOADED PHOTOS -->
	{#if $library.length}
		<ListBox>
			{#each $library as { id, data, name, status }}
				<ListBoxItem
					bind:group={selectedValue}
					name="medium"
					value={id}
					on:click={() => {
						drawerClose();
						goto('/');
					}}
				>
					<div class="flex gap-2 items-center">
						<img src={data} alt={name} class="h-4 w-4 object-cover" />
						<span class="line-clamp-1 mr-auto">{name}</span>
						<span>
							<Icon icon={statusIcon(status)} />
						</span>
					</div>
				</ListBoxItem>
			{/each}
		</ListBox>
		<div class="footer mt-auto flex gap-2 flex-wrap">
			<button class="btn variant-ringed btn-sm" type="button" on:click={library.reset}>
				Clear all photos
			</button>
			<button class="btn variant-filled-primary" type="button" on:click={getEdited}
				>Export all edited</button
			>
		</div>
	{:else}
		<p class="text-center">No loaded pictures.</p>
	{/if}
</div>
