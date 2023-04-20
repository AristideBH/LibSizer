<script lang="ts">
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { tEdit } from '$lib/strings';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	import { library, selected } from '$lib/stores/imagesStore';
	import { getUniqueRatios, bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import Arrow from '$lib/components/Arrow.svelte';
	import type CropperEl from '$lib/components/CropperEl.svelte';
	import { omitExt } from '$lib/utils';

	$: currentPhoto = library.getById($selected, $library);
	$: ratioList = getUniqueRatios(bundleSizes($BundleSelected));
	let cropperEls: Array<CropperEl> = [];

	const save = () => {
		let allCrops: { ratioName: number; cropData: any }[] = [];
		cropperEls.forEach((child) => {
			const data = child.saveMetas();
			allCrops.push(data);
		});
		library.updatePhotoById($selected, allCrops);
		toastStore.trigger(tEdit);
	};

	const exportAll = async () => {
		let allBlobs: { sizeName: string; data: Blob | undefined }[] = [];
		cropperEls.forEach((child) => {
			const data = child.exportAll();
			data.forEach((item) => {
				allBlobs.push(item);
			});
		});

		const zip = new JSZip();
		allBlobs.forEach((blob) => {
			if (blob.data)
				zip.file(omitExt(currentPhoto.name) + ' - ' + blob.sizeName + '.jpg', blob.data);
		});
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExt(currentPhoto.name));
		});
	};
</script>

<div
	class="bg-surface-100-800-token border-b border-surface-200-700-token z-20 shadow-sm sticky top-0 px-2"
>
	<div class="container px-4 py-3 items-center justify-between !gap-y-3 !gap-x-2 !flex-nowrap">
		<div class="mr-auto flex items-center">
			<Arrow direction="left" />
			<Arrow direction="right" />
			<span class=" line-clamp-1">
				<strong>{currentPhoto.name}</strong>
			</span>
		</div>

		<div class="flex gap-2 ml-auto">
			<button
				type="button"
				class="btn-icon md:btn md:aspect-auto md:w-fit variant-ghost-primary ml-auto"
				on:click={exportAll}
				title="Download bundle"
			>
				<span><Icon icon="solar:zip-file-linear" /></span>
				<span class="hidden md:block">Download bundle</span>
			</button>
			<button
				type="button"
				class="variant-ghost-primary btn-icon"
				on:click={save}
				title="Save metadata"
			>
				<span><Icon icon="ic:outline-save" /></span>
			</button>
		</div>
	</div>
</div>
