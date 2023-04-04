<script lang="ts">
	import { library, selected } from '$lib/imagesStore';
	import { sizes, getUniqueRatios } from '$lib/settingsStore';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { tEdit } from '$lib/strings';
	import CropperCanvas from '$lib/components/CropperCanvas.svelte';

	$: currentPhoto = library.getById($selected, $library);
	const ratioList = getUniqueRatios(sizes);

	const save = () => {
		library.updatePhotoById($selected, { test: '1', position: 'yo' });
		toastStore.trigger(tEdit);
	};
</script>

<div
	class="p-4 bg-surface-50 border-b border-surface-300 gap-2 flex items-center justify-between sticky top-0"
>
	{#if currentPhoto !== undefined}
		<span class="mr-auto">Editing [{currentPhoto.name}]</span>
		<button class="btn variant-outline-primary" on:click={save}>Save</button>
		<button class="btn variant-filled-primary">Export all</button>
	{:else}
		Please upload and select a photo
	{/if}
</div>

{#if currentPhoto !== undefined && ratioList}
	<!-- <pre>{JSON.stringify($library, undefined, 2)}</pre> -->
	<div class="flex flex-wrap gap-4 p-4">
		{#each ratioList as ratio}
			<div class="card w-full p-4 flex flex-nowrap gap-8">
				<div class="flex flex-col w-full gap-4 h-full">
					<h3><strong>Ratio</strong> - {ratio.ratio}</h3>
					<code class="flex flex-col gap-1 w-fit">
						{#each ratio.sizes as size}
							<span>{size.name} - {size.width} × {size.height}</span>
						{/each}
					</code>
				</div>
				<CropperCanvas ratio={ratio.ratio} />
			</div>
		{/each}
	</div>
{/if}
