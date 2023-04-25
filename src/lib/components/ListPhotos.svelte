<script lang="ts">
	import { ListBox, ListBoxItem, FileDropzone } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
	import { library, selected } from '$lib/stores/imagesStore';
	import { drawerClose, statusIcon } from '$lib/utils';
	import { slide } from 'svelte/transition';

	let files: FileList;
	let selectedValue: number;

	$: if (selectedValue) selected.set(selectedValue);

	const gotPhotos = async () => {
		selectedValue = $selected ? 0 : 1;
		if (!$selected) drawerClose();
		await library.loadPhotos(files);
	};

	const getEdited = () => {
		const data = library.getEdited($library);
		console.log(data);
	};
</script>

<div class="flex flex-col h-full grow">
	<!-- HEADER -->
	<div class="px-4 sticky top-0 bg-surface-100-800-token z-10">
		<h2 class="py-4">
			Library
			{#if $library.length > 0}
				<span class="text-sm">({$library.length} photos)</span>
			{/if}
		</h2>
		<hr />
	</div>

	<div class=" flex flex-col px-4 gap-4 pt-4 grow">
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
				<span class="h-8 w-8 text-primary-500/70">
					<Icon icon="solar:gallery-add-bold" width="100%" />
				</span>
			</svelte:fragment>
			<svelte:fragment slot="message">
				<strong>Upload one or multiple pictures</strong>
				<span> or drag and drop</span>
			</svelte:fragment>
			<svelte:fragment slot="meta">(PNG and JPG allowed)</svelte:fragment>
		</FileDropzone>

		<!-- UPLOADED PHOTOS -->
		{#if $library.length}
			<ListBox>
				{#each $library as { id, name, status }}
					<span class="flex grow gap-2 justify-between [&>label]:grow">
						<ListBoxItem
							class="w-full"
							bind:group={selectedValue}
							name="medium"
							value={id}
							on:click={() => {
								drawerClose();
								goto('/');
							}}
						>
							<div class="flex gap-2 items-center">
								<!-- <img src={data} alt={name} class="h-4 w-4 object-cover" /> -->
								<span>
									<Icon icon={statusIcon(status)} />
								</span>
								<span class="line-clamp-1 mr-auto">{name}</span>
							</div>
						</ListBoxItem>
						<button on:click={() => library.deleteById(id)}>
							<Icon icon="solar:close-circle-linear" />
						</button>
					</span>
				{/each}
			</ListBox>
		{:else}
			<p class="text-center">No loaded pictures.</p>
		{/if}
	</div>

	{#if $library.length}
		<!-- BOTTOM ACTIONS -->
		<div
			class="footer flex gap-2 flex-wrap sticky bottom-0 bg-surface-100-800-token p-4 mt-auto"
			transition:slide|local
		>
			<button class="btn variant-ringed btn-sm" type="button" on:click={library.reset}>
				Clear all photos
			</button>
			<button class="btn variant-filled-primary" type="button" on:click={getEdited}>
				Export all edited
			</button>
		</div>
	{/if}
</div>
