<script lang="ts">
	import { slide } from 'svelte/transition';
	import Cropper from 'svelte-easy-crop';

	import type { PixelCrop, Picture, Format } from '$lib/types';
	// prettier-ignore
	import getCroppedImg, { decimalToFraction, downloadFile, handleAspectDownload } from '$lib/components/images/canvasUtils';
	import { createDataUrl } from '$lib/components/images';

	import { FileArchive, AlertTriangle, FileDown } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let image: Picture;
	export let formats: Format[];
	export let ratio: number;

	let crop = { x: 0, y: 0 },
		zoom = 1,
		croppedImage: string | null,
		pixelCrop: PixelCrop;

	$: imageData = createDataUrl(image.blob, image.type);

	const dispatch = createEventDispatcher();
	const previewCrop = (e: CustomEvent) => {
		pixelCrop = e.detail.pixels;
		const upstream = new CustomEvent('upstream-crop', {
			detail: {
				pixelCrop,
				formats,
				imageData
			}
		});
		dispatch('upstream-crop', upstream);
	};
</script>

<section class="flex flex-col gap-2">
	<h2 class="capitalize">{decimalToFraction(ratio)} format</h2>

	<div class="flex gap-2 overflow-x-auto overflow-y-hidden pb-2 pt-1 items-baseline">
		<!-- * Download each formats -->
		{#each formats as format}
			{@const width = format.width ? format.width : pixelCrop.width}
			{@const height = format.height ? format.height : pixelCrop.height}
			{@const formatSize = width + 'px × ' + height + 'px'}
			{@const sizeAlert =
				(image.width && width > image.width) || (image.height && height > image.height)}

			<Button
				type="button"
				class="w-fit"
				variant={sizeAlert ? 'warn' : 'outline'}
				title={sizeAlert
					? 'At default scale, the image is smaller than this format.\nThis will result in pixelated cropping.'
					: formatSize}
				on:click={async () => {
					croppedImage = await getCroppedImg(imageData, pixelCrop, { width, height }, image.type);
					if (croppedImage) downloadFile(croppedImage, format.name, image.name, image.type);
				}}
			>
				{#if sizeAlert}
					<AlertTriangle class="mr-2 h-4 w-4 stroke-warn" />
				{:else}
					<FileDown class="mr-2 h-4 w-4" />
				{/if}
				{format.name}
			</Button>
		{/each}

		<!-- * Download multiple formats -->
		{#if formats.length > 1}
			<Button
				type="button"
				variant="secondary"
				class="w-fit ms-auto sticky right-0"
				on:click={() =>
					handleAspectDownload(formats, croppedImage, imageData, pixelCrop, image.name, image.type)}
			>
				<FileArchive class="mr-2 h-4 w-4" />
				Download all formats
			</Button>
		{/if}
	</div>

	<!-- * Cropper interface -->

	<div class="relative w-full h-full cropper min-h-[500px]" transition:slide>
		<Cropper
			image={imageData}
			aspect={ratio}
			bind:crop
			bind:zoom
			maxZoom={2.5}
			zoomSpeed={0.3}
			on:cropcomplete={previewCrop}
		/>
	</div>
</section>
