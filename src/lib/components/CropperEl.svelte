<script lang="ts">
	import '$lib/css/croppr.postcss';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import JSZip from 'jszip';
	import { saveAs } from 'file-saver';

	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { library, selected } from '$lib/stores/imagesStore';
	import type { Size } from '$lib/stores/settingsStore';
	import { omitExt, dataURLToBlob, ratioNbtoString, isEmpty } from '$lib/utils';

	$: currentPhoto = library.getById($selected, $library);

	let imgRef: HTMLImageElement, cropper: Cropper | null;
	export let ratio: number, sizes: Size[];

	const initCropper = () => {
		let cropData;
		if (currentPhoto && !isEmpty(currentPhoto?.meta)) {
			cropData = getObjectByRatioName(currentPhoto.meta, ratio);
		}
		cropper = new Cropper(imgRef, {
			aspectRatio: ratio,
			viewMode: 3,
			guides: true,
			autoCropArea: 1,
			zoomable: false,
			dragMode: 'none',
			data: cropData,
			autoCrop: true
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
		return blobsData;
	};

	function getObjectByRatioName(array: any, ratioName: number) {
		for (const key in array) {
			if (array.hasOwnProperty(key)) {
				if (array[key].ratioName === ratioName) {
					return array[key].cropData;
				}
			}
		}
		return null; // return null if the ratioName is not found in any of the objects
	}

	export const saveMetas = () => {
		let croppedSize = cropper.getData();
		return { ratioName: ratio, cropData: croppedSize };
	};

	const handleCropperReset = () => {
		if (cropper) {
			if (confirm('Are you sure you want to reset your crop?')) {
				cropper.reset();
			}
		}
	};

	onMount(async () => {
		initCropper();
	});

	let popupWarnSize: PopupSettings = {
		event: 'hover',
		target: 'popupWarnSize',
		placement: 'right'
	};
</script>

{#if currentPhoto}
	<div
		class="card w-full p-4 flex gap-y-6 gap-x-8 justify-center items-stretch flex-wrap lg:flex-nowrap"
	>
		<div class=" bg-slate-100 mx-auto md:mx-0 max-w-2xl w-full">
			{#if currentPhoto}
				<img src={currentPhoto.data} alt="" bind:this={imgRef} class="block w-full" />
			{/if}
		</div>

		<div class="flex flex-col gap-2 items-start w-full max-w-2xl xl:w-full">
			<h2>Ratio <strong>{ratioNbtoString(parseFloat(ratio.toFixed(4)))}</strong></h2>
			<hr />
			<code class="flex flex-col gap-0 w-fit my-2">
				{#each sizes as size}
					<button
						class="flex items-center gap-1 p-1 hover:underline text-md"
						type="button"
						on:click={() => cropImage(size)}
						title="Download file"
					>
						{#if size.height && size.width && currentPhoto}
							{#if currentPhoto.dimensions.width < size.width || currentPhoto.dimensions.height < size.height}
								<div class="flex flex-row text-error-500">
									<span use:popup={popupWarnSize}><Icon icon="ic:round-warning-amber" /> </span>
									<div
										class="tes bg-surface-200-700-token px-2 py-1 text-xs rounded-sm"
										data-popup="popupWarnSize"
									>
										<div class="arrow bg-surface-200-700-token" />
										<div class="flex-col items-start justify-center flex">
											{#if currentPhoto.dimensions.width < size.width}
												<span
													>Image is narrower then desired width: {currentPhoto.dimensions.width} px</span
												>
											{/if}
											{#if currentPhoto.dimensions.height < size.height}
												<span
													>Image is shorter then desired height: {currentPhoto.dimensions.height} px</span
												>
											{/if}
											<strong>> This might result in pixelated output</strong>
										</div>
									</div>
								</div>
							{/if}
						{/if}
						<span><Icon icon="solar:download-minimalistic-linear" /></span>
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
					class="btn variant-outline-primary w-fit btn-sm"
					type="button"
					on:click={gatherCropped}
				>
					<span><Icon icon="ic:outline-folder-zip" /></span>
					<span>Download ratio bundle</span>
				</button>
			{/if}

			<button class="btn btn-sm variant-filled mt-auto" on:click={handleCropperReset}>
				<span><Icon icon="solar:crop-minimalistic-linear" /></span>
				<span>Reset crop zone</span>
			</button>
		</div>
	</div>
{/if}
