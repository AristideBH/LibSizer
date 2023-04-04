<script lang="ts">
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { library, selected } from '$lib/imagesStore';
	import { sizes, getUniqueRatios } from '$lib/settingsStore';
	import { omitExtension, ratioToNb } from '$lib/utils';
	import { tEdit } from '$lib/strings';
	import CropperEl from '$lib/components/CropperEl.svelte';
	import { saveAs } from 'file-saver';
	import JSZip from 'jszip';

	$: currentPhoto = library.getById($selected, $library);
	const ratioList = getUniqueRatios(sizes);

	let cropperEl: Array<CropperEl> = [];

	const save = () => {
		library.updatePhotoById($selected, { test: '1', position: 'yo' });
		toastStore.trigger(tEdit);
	};

	const exportAll = async () => {
		let allBlobs: any[] = [];
		cropperEl.forEach((child) => {
			const data = child.exportAll();
			data.forEach((item) => {
				allBlobs.push(item);
			});
		});

		const zip = new JSZip();
		allBlobs.forEach((blob) => {
			zip.file(omitExtension(currentPhoto.name) + ' - ' + blob.name + '.jpg', blob.data);
		});
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExtension(currentPhoto.name));
		});
	};
</script>

<div
	class="p-4 bg-surface-50 border-b border-surface-300 gap-2 flex items-center justify-between sticky top-0 z-10"
>
	{#if currentPhoto !== undefined}
		<span class="mr-auto">Editing <strong>[{currentPhoto.name}]</strong></span>
		<button class="btn variant-outline-primary" on:click={save} disabled>Save</button>
		<button class="btn variant-filled-primary" on:click={exportAll}>
			<span><Icon icon="ic:outline-folder-zip" /></span>
			<span>Download all files</span>
		</button>
	{:else}
		Please upload and select a photo
	{/if}
</div>

{#if currentPhoto !== undefined && ratioList}
	<div class="flex flex-wrap gap-4 p-4">
		{#each ratioList as ratio, index}
			<CropperEl ratio={ratioToNb(ratio.ratio)} sizes={ratio.sizes} bind:this={cropperEl[index]} />
		{/each}
	</div>
{/if}
