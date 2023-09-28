<script lang="ts">
	import type { ButtonEventHandler } from 'bits-ui/dist/bits/button';
	import type { Size } from '$lib/js/bundles';
	import { slide } from 'svelte/transition';
	import Cropper from 'svelte-easy-crop';
	import { saveAs } from 'file-saver';

	import { createDataUrl, type Picture } from '$lib/js/db';
	import getCroppedImg, { omitExt, decimalToFraction } from '$lib/js/canvasUtils';

	import { Download, FolderDown, AlertTriangle } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';

	export let image: Picture;
	export let ratio: number;
	export let sizes: Size[];

	let crop = { x: 0, y: 0 },
		zoom = 1,
		croppedImage: string | null,
		pixelCrop: { x: number; y: number; width: number; height: number };

	$: imageData = createDataUrl(image.blob, image.type);

	function previewCrop(e: CustomEvent) {
		pixelCrop = e.detail.pixels;
		// console.log(pixelCrop);
	}

	const downloadFile = (imageData: Blob | string, sizeName: string) => {
		saveAs(imageData, omitExt(image.name) + ' - ' + sizeName);
	};

	function handleAspectDownload(e: ButtonEventHandler<MouseEvent>): void {
		throw new Error('Function not implemented.');
	}
</script>

<section class="flex flex-col gap-2">
	<h2 class="">Format {decimalToFraction(ratio)}</h2>

	<div class="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 pt-1">
		{#each sizes as size}
			{@const width = size.width ? size.width : pixelCrop.width}
			{@const height = size.height ? size.height : pixelCrop.height}
			{@const originalSize = width + 'px × ' + height + 'px'}
			{@const sizeAlert =
				(image.width && width > image.width) || (image.height && height > image.height)}

			<Button
				type="button"
				class="w-fit"
				variant={sizeAlert ? 'warn' : 'outline'}
				title={sizeAlert
					? 'The loaded image is smaller than this format. This will result in pixelated cropping.'
					: originalSize}
				on:click={async () => {
					croppedImage = await getCroppedImg(imageData, pixelCrop, { width, height });
					if (croppedImage) downloadFile(croppedImage, size.name);
				}}
			>
				{#if sizeAlert}
					<AlertTriangle class="mr-2 h-4 w-4 stroke-destructive" />
				{:else}
					<Download class="mr-2 h-4 w-4" />
				{/if}
				{size.name}
			</Button>
		{/each}

		{#if sizes.length > 1}
			<Button
				type="button"
				disabled
				class="w-fit ms-auto sticky right-0"
				on:click={handleAspectDownload}
			>
				<FolderDown class="mr-2 h-4 w-4" />
				Download all sizes
			</Button>
		{/if}
	</div>

	{#key ratio}
		<div class="relative w-full h-full cropper min-h-[650px]" transition:slide>
			<Cropper
				image={imageData}
				aspect={ratio}
				bind:crop
				bind:zoom
				maxZoom={2.5}
				zoomSpeed={0.35}
				on:cropcomplete={previewCrop}
			/>
		</div>
	{/key}
</section>
