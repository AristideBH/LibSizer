<script lang="ts">
	import img from '$lib/assets/img.png';
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';
	import { template } from '$lib/cropperSettings';

	let imgRef, cropper, canvasEl;

	onMount(async () => {
		const Cropper = await import('cropperjs');
		cropper = new Cropper.default(imgRef, {
			// Cropper options go here
			container: '.container',
			template: template
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
		console.log(canvasEl);
	}
</script>

<div class="container mx-auto max-w-md h-full">
	<img src={img} alt="" bind:this={imgRef} />
	<button class="btn variant-filled" on:click={cropImage}>Crop</button>
	<!-- <pre>{JSON.stringify(canvasEl, undefined, 2)}</pre> -->
	<!-- {@html canvasEl} -->

	<canvas bind:this={canvasEl} width="200" height="200" />
</div>

<style lang="postcss">
	:global(cropper-canvas) {
		@apply min-h-[400px];
	}
	canvas {
		@apply bg-primary-500;
	}
</style>
