<script lang="ts">
	import img from '$lib/assets/img.png';
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';
	import { template } from '$lib/cropperSettings';
	import { goto } from '$app/navigation';

	let imgRef, cropper, canvasEl, outputParent;

	onMount(async () => {
		const Cropper = await import('cropperjs');
		cropper = new Cropper.default(imgRef, {
			// container: '.container',
			template: template(1.7)
		});
	});

	// Destroy the cropper instance when the component is destroyed
	afterUpdate(() => {
		return () => {
			if (cropper) {
				cropper.destroy();
				cropper = null;
			}
		};
	});

	async function cropImage() {
		const selection = cropper.getCropperSelection();
		canvasEl = await selection.$toCanvas();
		download(canvasEl);
	}

	function download(canvas) {
		let dt = canvas.toDataURL('image/jpeg');
		let a = document.createElement('a');
		a.setAttribute('download', `image`);
		a.setAttribute('href', dt);
		outputParent.appendChild(a);
		a.click();
		outputParent.removeChild(a);
	}
</script>

<div class="w-full h-full flex flex-col items-center justify-center p-4">
	<img id="intput" src={img} alt="" bind:this={imgRef} />
	<button class="btn variant-filled" on:click={cropImage}>Crop</button>
	<div bind:this={outputParent} />
	<!-- <pre>{JSON.stringify(canvasEl, undefined, 2)}</pre> -->
	<!-- {@html canvasEl} -->
</div>

<style lang="postcss">
	:global(cropper-canvas) {
		@apply min-h-[400px];
	}
	:global(cropper-image) {
		/* @apply max-w-lg object-contain; */
	}

	img {
		@apply block w-96 h-96 max-w-full;
	}
</style>
