<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import LibLoader from '$lib/components/LibLoader.svelte';
	import { slide } from 'svelte/transition';
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
		console.log('cropper initiated');

		cropper = new Cropper(imgRef, {
			aspectRatio: ratio,
			viewMode: 2,
			guides: true,
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

	const downloadFile = (imageData: Blob, fileName: string) => {
		saveAs(imageData, omitExtension(currentPhoto.name) + ' - ' + fileName);
	};

	const cropImage = (format: Size) => {
		if (cropper) {
			downloadFile(exportCroppedImage(format), format.name);
		}
	};

	const gatherCropped = async () => {
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
		let blobsData: { name: string; data: Blob | undefined }[] = [];
		sizes.forEach((size) => {
			blobsData.push({ name: size.name, data: exportCroppedImage(size) });
		});
		return blobsData;
	};

	export const resetCropper = () => {
		if (cropper) {
			cropper.destroy();
		}
	};
</script>

<LibLoader
	url="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"
	on:loaded={initCropper}
/>

{#key currentPhoto}
	<div class="card w-full p-4 flex flex-wrap md:flex-nowrap gap-8" transition:slide>
		<div class="max-w-3xl mx-auto">
			{#if currentPhoto}
				<img src={currentPhoto.data} alt="" bind:this={imgRef} />
			{/if}
		</div>

		<div class="flex flex-col w-full gap-2 h-full">
			<h2>Gamme ratio <strong>{ratio}</strong></h2>
			<hr />
			<code class="flex flex-col gap-1 w-fit text-lg my-2">
				{#each sizes as size}
					<span><strong>{size.name} </strong>- {size.width} × {size.height}</span>
				{/each}
			</code>
			<div class="flex gap-2 flex-wrap mt-auto">
				{#each sizes as size}
					<button class="btn variant-filled btn-sm" on:click={cropImage(size)}>
						<span><Icon icon="ic:baseline-file-download" /></span>
						<span>{size.name}</span>
					</button>
				{/each}
			</div>
			{#if sizes.length > 1}
				<button class="btn variant-filled-primary w-fit btn-sm" on:click={gatherCropped}>
					<span><Icon icon="ic:outline-folder-zip" /></span>
					<span>Download (Zip)</span>
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
