<script lang="ts">
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	import { library, selected } from '$lib/stores/imagesStore';
	import { getUniqueRatios, bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import { omitExt, ratioToNb, drawerOpen } from '$lib/utils';
	import { tEdit } from '$lib/strings';
	import CropperEl from '$lib/components/CropperEl.svelte';

	$: currentPhoto = library.getById($selected, $library);
	$: ratioList = getUniqueRatios(bundleSizes($BundleSelected));
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
		let allBlobs: { sizeName: string; data: Blob | undefined }[] = [];
		cropperEl.forEach((child) => {
			const data = child.exportAll();
			data.forEach((item) => {
				allBlobs.push(item);
			});
		});

		const zip = new JSZip();
		allBlobs.forEach((blob) => {
			if (blob.data) {
				zip.file(omitExt(currentPhoto.name) + ' - ' + blob.sizeName + '.jpg', blob.data);
			}
		});
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExt(currentPhoto.name));
		});
	};
</script>

{#if currentPhoto}
	<!-- TOOLBAR -->
	<div class="bg-surface-50 border-b border-surface-300 sticky top-0 z-20">
		<div class="container p-4 items-center justify-between">
			<span class="mr-auto">
				Editing <strong>[{currentPhoto.name}]</strong>
			</span>
			<button
				type="button"
				class="btn variant-outline-primary bg-white"
				on:click={exportAll}
				title="Download bundle"
			>
				<span><Icon icon="ic:outline-folder-zip" /></span>
				<span>Download bundle</span>
			</button>
			<!-- <button
				type="button"
				class="btn variant-outline bg-white btn-icon"
				on:click={save}
				title="Save metadata"
			>
				<span><Icon icon="ic:outline-save" /></span>
			</button> -->
		</div>
	</div>
{/if}

{#if currentPhoto}
	<!-- EDITING SCREEN -->
	<div class="container flex-col p-4 gap-4">
		{#each ratioList as ratio, index}
			{#key currentPhoto && bundleSizes($BundleSelected)}
				<CropperEl
					ratio={ratioToNb(ratio.ratio)}
					sizes={ratio.sizes}
					bind:this={cropperEl[index]}
				/>
			{/key}
		{/each}
	</div>
{/if}

{#if !currentPhoto}
	<div class="flex flex-col items-center h-full justify-center gap-6 text-center">
		<span class="w-20 h-20 text-primary-500/30">
			<Icon icon="ic:outline-photo-size-select-large" width="100%" />
		</span>
		<p>
			No picture selected. <br /> Please choose one from the
			<a href="/" on:click={drawerOpen}>library</a>
		</p>
	</div>
{/if}
