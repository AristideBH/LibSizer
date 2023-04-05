<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';
	import { library, selected } from '$lib/imagesStore';
	import { omitExt, dataURLToBlob, ratioNbtoString } from '$lib/utils';
	import type { Size } from '$lib/settingsStore';

	$: currentPhoto = library.getById($selected, $library);

	let imgRef: HTMLImageElement, cropper: Cropper | null;
	export let ratio: number, sizes: Size[];

	const initCropper = () => {
		// console.log('cropperEl initiated');
		cropper = new Cropper(imgRef, {
			aspectRatio: ratio,
			viewMode: 3,
			guides: true,
			autoCropArea: 1,
			zoomable: false,
			dragMode: 'none'
		});
	};

	const exportCroppedImg = (format: Size) => {
		let canvas = cropper.getCroppedCanvas(format);
		let dataURL = canvas.toDataURL('image/jpeg');
		return dataURLToBlob(dataURL);
	};

	const downloadFile = (imageData: Blob, fileName: string) => {
		saveAs(imageData, omitExt(currentPhoto.name) + ' - ' + fileName);
	};

	const cropImage = (format: Size) => {
		if (cropper) {
			downloadFile(exportCroppedImg(format), format.name);
		}
	};

	const gatherCropped = async () => {
		const zip = new JSZip();
		sizes.forEach((size) => {
			zip.file(omitExt(currentPhoto.name) + ' - ' + size.name + '.jpg', exportCroppedImg(size));
		});
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExt(currentPhoto.name));
		});
	};

	export const exportAll = () => {
		let blobsData: { sizeName: string; data: Blob | undefined }[] = [];
		sizes.forEach((size) => {
			blobsData.push({ sizeName: size.name, data: exportCroppedImg(size) });
		});
		// console.log(blobsData);

		return blobsData;
	};

	export const saveMetas = () => {
		let croppedSize = cropper.getData();
		return { ratioName: ratio, cropData: croppedSize };
	};

	onMount(async () => {
		initCropper();
	});
</script>

{#key currentPhoto}
	<div class="card w-full p-4 flex flex-wrap md:flex-nowrap gap-6 justify-center" transition:fade>
		<div class="mx-auto bg-slate-100 w-full max-w-3xl">
			{#if currentPhoto}
				<img src={currentPhoto.data} alt="" bind:this={imgRef} />
			{/if}
		</div>

		<div class="flex flex-col min-w-[400px] gap-2 h-full items-start">
			<h2>Ratio <strong>{ratioNbtoString(ratio)}</strong></h2>
			<hr />
			<code class="flex flex-col gap-0 w-fit my-2">
				{#each sizes as size}
					<button
						class="flex items-center gap-1 p-1 hover:underline text-md"
						type="button"
						on:click|preventDefault={cropImage(size)}
					>
						<span><Icon icon="ic:round-sim-card-download" class="h-3 w-3" /></span>
						<strong>{size.name}</strong> :
						<span>
							{size.width == undefined ? 'fit' : size.width + 'px'}
							×
							{size.height == undefined ? 'fit' : size.height + 'px'}
						</span>
					</button>
				{/each}
			</code>

			{#if sizes.length > 1}
				<button
					class="btn variant-outline-primary w-fit btn-sm bg-white"
					type="button"
					on:click={gatherCropped}
				>
					<span><Icon icon="ic:outline-folder-zip" /></span>
					<span>Download ratio bundle</span>
				</button>
			{/if}
		</div>
	</div>
{/key}

<style>
	img {
		display: block;
		max-width: 100%;
		width: 100%;
	}
</style>
