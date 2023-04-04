<script lang="ts">
	import { library, selected } from '$lib/imagesStore';
	import { sizes, getUniqueRatios } from '$lib/settingsStore';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	import { tEdit } from '$lib/strings';
	import CropperEl from '$lib/components/CropperEl.svelte';

	$: currentPhoto = library.getById($selected, $library);
	const ratioList = getUniqueRatios(sizes);

	const save = () => {
		library.updatePhotoById($selected, { test: '1', position: 'yo' });
		toastStore.trigger(tEdit);
	};

	const ratioToNb = (ratio: string | number) => (typeof ratio === 'string' ? 0 : ratio);
</script>

<div
	class="p-4 bg-surface-50 border-b border-surface-300 gap-2 flex items-center justify-between sticky top-0 z-10"
>
	{#if currentPhoto !== undefined}
		<span class="mr-auto">Editing [{currentPhoto.name}]</span>
		<button class="btn variant-outline-primary" on:click={save}>Save</button>
		<button class="btn variant-filled-primary">
			<span><Icon icon="ic:outline-folder-zip" /></span>
			<span>Download all files</span>
		</button>
	{:else}
		Please upload and select a photo
	{/if}
</div>

{#if currentPhoto !== undefined && ratioList}
	<!-- <pre>{JSON.stringify($library, undefined, 2)}</pre> -->
	<div class="flex flex-wrap gap-4 p-4">
		{#each ratioList as ratio}
			<CropperEl ratio={ratioToNb(ratio.ratio)} sizes={ratio.sizes} />
		{/each}
	</div>
{/if}
