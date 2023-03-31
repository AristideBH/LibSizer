<script lang="ts">
	import { library, selected } from '$lib/imagesStore';
	import { sizes, getUniqueRatios } from '$lib/settingsStore';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	$: currentPhoto = library.getById($selected, $library);
	const ratioList = getUniqueRatios(sizes);

	const tEdit: ToastSettings = {
		message: 'Photos mis à jour avec succès',
		background: 'variant-filled-surface'
	};
	const save = () => {
		library.updatePhotoById($selected, { test: '1', position: 'yo' });
		toastStore.trigger(tEdit);
	};
</script>

<!-- 
<pre>{JSON.stringify(currentPhoto, undefined, 2)}</pre> -->

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
					<!-- <button class="btn variant-filled-primary w-fit mt-auto">Export </button> -->
				</div>

				<div class="grid customGrid grid-flow-row-dense p-4 w-full">
					<label
						for="ratio-{ratio.ratio}-x"
						class="flex flex-col items-center col-start-1 col-end-2 pb-2"
					>
						<span>X</span>
						<input type="range" name="ratio-{ratio.ratio}-x" id="ratio-{ratio.ratio}-x" />
					</label>
					<label
						for="ratio-{ratio.ratio}-y"
						class="flex flex-col items-center col-start-2 col-end-3 row-start-2 row-end-3 justify-center w-[1.5rem] pl-4"
					>
						<span class="">Y</span>
						<input
							type="range"
							name="ratio-{ratio.ratio}-y"
							id="ratio-{ratio.ratio}-y"
							class="h-full w-fit"
							style="-webkit-appearance: slider-vertical"
						/>
					</label>

					<div
						class="imgWrapper object-cover w-full border border-surface-400 col-start-1 col-end-2 row-start-2 row-end-3 text-center"
						style:--src={currentPhoto.data}
						style:--aspect-r={ratio.ratio}
					>
						[...photo...]
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.imgWrapper {
		aspect-ratio: var(--aspect-r);
	}

	.customGrid {
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr auto;
	}
</style>
