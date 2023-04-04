<script lang="ts">
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';
	import { template } from '$lib/cropperSettings';
	import Cropper from 'cropperjs';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { tErr } from '$lib/strings';
	import { library, selected } from '$lib/imagesStore';

	$: currentPhoto = library.getById($selected, $library);
	$: currentPhoto, changeCropper();

	let imgRef: HTMLImageElement | HTMLCanvasElement,
		cropper: Cropper | null,
		canvasEl: HTMLCanvasElement,
		outputParent: HTMLDivElement;

	export let ratio: number | string = 1.7;

	const resetCropper = () => cropper && (cropper = null);
	const initCropper = async () => {
		cropper = new Cropper(imgRef, {
			aspectRatio: ratio,
			viewMode: 3
		});
	};
	const changeCropper = () => {
		console.log('cC');
		// console.log('cropper:', cropper);
		if (cropper && typeof cropper !== null) {
			let image = cropper.getCropperImage();
			if (image) {
				console.log('img:', image);
				image.src = currentPhoto.data;
			}
		}
	};

	const cropImage = async () => {
		if (cropper) {
			const selection = cropper.getCropperSelection();
			if (selection) {
				canvasEl = await selection.$toCanvas();
			}
			download(canvasEl);
		} else {
			toastStore.trigger(tErr);
		}
	};

	const download = (canvas: HTMLCanvasElement) => {
		const downloadUrl = canvas.toDataURL('image/jpeg');
		const downloadLink = document.createElement('a');
		downloadLink.download = 'image';
		downloadLink.href = downloadUrl;
		outputParent.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
	};

	onMount(async () => initCropper());
	afterUpdate(() => resetCropper());
</script>

<pre>{JSON.stringify(cropper, undefined, 2)}</pre>

{#if currentPhoto}
	<div class="w-full h-full flex flex-col items-center justify-center p-4">
		<img id="intput" src={currentPhoto.data} alt="" bind:this={imgRef} />
		<button class="btn variant-filled" on:click={cropImage}>Export</button>
		<button class="btn variant-outline" on:click={initCropper}>init</button>
		<button class="btn variant-outline" on:click={resetCropper}>Reset</button>
		<button class="btn variant-outline" on:click={changeCropper}>change</button>
		<div bind:this={outputParent} />
	</div>
{/if}
