<script lang="ts">
	import LibLoader from '$lib/components/LibLoader.svelte';
	import { library, selected } from '$lib/imagesStore';
	import Icon from '@iconify/svelte';
	import { omitExtension, dataURLToBlob } from '$lib/utils';
	import type { Size } from '$lib/settingsStore';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	$: currentPhoto = library.getById($selected, $library);

	let imgRef: HTMLImageElement, cropper: Cropper | null;
	export let ratio: number, sizes: Size[];

	const initCropper = () => {
		cropper = new Cropper(imgRef, {
			aspectRatio: ratio,
			viewMode: 2,
			guides: false,
			autoCropArea: 1,
			zoomable: false,
			dragMode: 'none'
		});
	};

	const exportCroppedImage = (format: Size) => {
		if (cropper) {
			let canvas = cropper.getCroppedCanvas(format);
			let dataURL = canvas.toDataURL('image/jpeg');
			return dataURLToBlob(dataURL);
		}
	};

	const downloadFile = (imageData: Blob, fileName: string = '') => {
		saveAs(imageData, omitExtension(currentPhoto.name) + ' - ' + fileName);
	};

	const cropImage = (format: Size) => {
		if (cropper) {
			downloadFile(exportCroppedImage(format), format.name);
		}
	};

	export const gatherCropped = async () => {
		const zip = new JSZip();
		sizes.forEach((size) => {
			zip.file(
				omitExtension(currentPhoto.name) + ' - ' + size.name + '.jpg',
				exportCroppedImage(size)
			);
		});
		// console.log(zip);
		let gen = await zip.generateAsync({ type: 'blob' }).then(function (blob) {
			saveAs(blob, omitExtension(currentPhoto.name));
		});
	};

	export const exportAll = () => {
		let blobsData = [];
		sizes.forEach((size) => {
			blobsData.push({ name: size.name, data: exportCroppedImage(size) });
		});
		return blobsData;
	};
</script>

<LibLoader
	url="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"
	on:loaded={initCropper}
/>

<div class="card w-full p-4 flex flex-wrap md:flex-nowrap gap-8">
	<div class="max-w-3xl mx-auto">
		{#if currentPhoto}
			<img src={currentPhoto.data} alt="" bind:this={imgRef} />
		{/if}
	</div>

	<div class="flex flex-col w-full gap-2 h-full">
		<h2>Gamme ratio {ratio}</h2>
		<hr />
		<code class="flex flex-col gap-1 w-fit text-lg my-2">
			{#each sizes as size}
				<span><strong>{size.name} </strong>- {size.width} × {size.height}</span>
			{/each}
		</code>
		<div class="flex gap-2 flex-wrap mt-auto">
			{#each sizes as size}
				<button class="btn variant-filled btn-sm" on:click|preventDefault={cropImage(size)}>
					<span><Icon icon="ic:baseline-file-download" /></span>
					<span>{size.name}</span>
				</button>
			{/each}
		</div>
		{#if sizes.length > 1}
			<button class="btn variant-filled-primary w-fit btn-sm" on:click={gatherCropped}>
				<span><Icon icon="ic:outline-folder-zip" /></span>
				<span>Download ratio zip</span>
			</button>
		{/if}
	</div>
</div>

<style>
	img {
		display: block;
		max-width: 100%;
		width: 100%;
	}
</style>
