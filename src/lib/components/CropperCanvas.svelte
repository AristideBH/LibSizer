<script lang="ts">
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';
	import { template } from '$lib/cropperSettings';
	import type Cropper from 'cropperjs';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { tErr } from '$lib/strings';

	let imgRef: string | HTMLImageElement | HTMLCanvasElement,
		cropper: Cropper | null,
		canvasEl: HTMLCanvasElement,
		outputParent: HTMLDivElement;

	export let ratio: number = 1.7,
		img: string;

	const resetCropper = () => cropper && (cropper = null);

	onMount(async () => {
		const Cropper = await import('cropperjs');
		cropper = new Cropper.default(imgRef, {
			template: template(ratio)
		});
	});
	// Destroy the cropper instance on component destroyed
	afterUpdate(() => resetCropper());

	async function cropImage() {
		if (cropper) {
			const selection = cropper.getCropperSelection();
			if (selection) {
				canvasEl = await selection.$toCanvas();
			}
			download(canvasEl);
		} else {
			toastStore.trigger(tErr);
		}
	}

	function download(canvas: HTMLCanvasElement) {
		const downloadUrl = canvas.toDataURL('image/jpeg');
		const downloadLink = document.createElement('a');
		downloadLink.download = 'image';
		downloadLink.href = downloadUrl;
		outputParent.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-4">
	<img id="intput" src={img} alt="" bind:this={imgRef} />
	<button class="btn variant-filled" on:click={cropImage}>Export</button>
	<div bind:this={outputParent} />
</div>
