<script lang="ts">
	import { fly } from 'svelte/transition';
	import { toastStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { tEdit } from '$lib/strings';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	import { library, selected } from '$lib/stores/imagesStore';
	import { omitExt } from '$lib/utils';
	import type CropperEl from '$lib/components/CropperEl.svelte';
	import Arrow from '$lib/components/Arrow.svelte';

	$: currentPhoto = library.getById($selected, $library);
	export let cropperEls: Array<CropperEl>;

	const save = () => {
		let allCrops: { ratioName: number; cropData: any }[] = [];
		cropperEls.forEach((child) => {
			const data = child.saveMetas();
			allCrops.push(data);
		});
		library.updatePhotoById($selected, allCrops);
		toastStore.trigger(tEdit);
		// console.log('save');
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
		// console.log('export');
	};
</script>

<div
	class="bg-surface-50-900-token border-b border-surface-200-700-token z-20 shadow-sm sticky top-0"
	transition:fly={{ y: -10 }}
>
	<div class="container px-4 py-3 items-center justify-between !gap-x-2 !flex-nowrap">
		<div class="flex items-center">
			<Arrow direction="left" />
			<Arrow direction="right" />
		</div>
		<strong class=" line-clamp-1">{currentPhoto?.name}</strong>

		<div class="flex gap-2 ml-auto">
			<button
				type="button"
				class="btn-icon md:btn md:aspect-auto md:w-fit variant-ghost-primary ml-auto"
				on:click={exportAll}
				title="Download zip bundle"
			>
				<span><Icon icon="solar:zip-file-linear" /></span>
				<span class="hidden md:block">Download bundle</span>
			</button>
			<button
				type="button"
				class="variant-ghost-primary btn-icon"
				on:click={save}
				title="Save crops"
			>
				<span><Icon icon="ic:outline-save" /></span>
			</button>
		</div>
	</div>
</div>
