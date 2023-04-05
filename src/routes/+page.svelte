<script lang="ts">
	import { drawerStore, toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { library, selected } from '$lib/imagesStore';
	import { sizes, getUniqueRatios } from '$lib/settingsStore';
	import { omitExt, ratioToNb, drawerOpen } from '$lib/utils';
	import { tEdit } from '$lib/strings';
	import CropperEl from '$lib/components/CropperEl.svelte';
	import { saveAs } from 'file-saver';
	import JSZip from 'jszip';

	$: currentPhoto = library.getById($selected, $library);
	const ratioList = getUniqueRatios(sizes);
	let cropperEl: Array<CropperEl> = [];

	const save = () => {
		let allCrops: { ratioName: number; cropData: any }[] = [];
		cropperEl.forEach((child) => {
			const data = child.saveMetas();
			allCrops.push(data);
		});
		library.updatePhotoById($selected, allCrops);
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
			zip.file(omitExt(currentPhoto.name) + ' - ' + blob.name + '.jpg', blob.data);
		});
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExt(currentPhoto.name));
		});
	};
</script>

{#if currentPhoto}
	<!-- <pre>{JSON.stringify(currentPhoto.meta[1], undefined, 2)}</pre> -->
	<div class="bg-surface-50 border-b border-surface-300 sticky top-0 z-20">
		<div class="container p-4 items-center justify-between">
			<span class="mr-auto">Editing <strong>[{currentPhoto.name}]</strong></span>
			<!-- <button class="btn variant-outline-primary" on:click={save} title="Save data">
				<span><Icon icon="ic:outline-save" /></span>
				<span>Save</span>
			</button> -->
			<button
				class="btn variant-outline-primary bg-white"
				on:click={exportAll}
				title="Download all files (Zip)"
			>
				<span><Icon icon="ic:outline-folder-zip" /></span>
				<span>Download all files (Zip)</span>
			</button>
		</div>
	</div>
{/if}

{#if currentPhoto !== undefined && ratioList}
	<div class="container flex-col p-4 gap-4">
		{#each ratioList as ratio, index}
			<CropperEl ratio={ratioToNb(ratio.ratio)} sizes={ratio.sizes} bind:this={cropperEl[index]} />
		{/each}
	</div>
{:else}
	<div class="flex flex-col items-center h-full justify-center gap-6">
		<Icon icon="ic:outline-photo-size-select-large" class="w-16 h-16 text-surface-500" />
		<p>Please select a photo in the <a href="/" on:click={drawerOpen}>library</a></p>
	</div>
{/if}

<style lang="postcss">
	button span:last-of-type {
		@apply hidden lg:block;
	}
</style>
