<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import { createDataUrl, type Picture } from '$lib/db';
	import getCroppedImg, { omitExt } from '$lib/canvasUtils';
	import { saveAs } from 'file-saver';
	import Button from './ui/button/button.svelte';

	export let image: Picture;
	export let aspect: number = 4 / 3;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let croppedImage: string | null,
		pixelCrop: { x: number; y: number; width: number; height: number };

	$: imageData = createDataUrl(image.blob, image.type);

	function previewCrop(e: CustomEvent) {
		pixelCrop = e.detail.pixels;
	}

	const downloadFile = (imageData: Blob | string, fileName: string) => {
		saveAs(imageData, omitExt(image.name));
	};
</script>

<div class="relative w-full h-full cropper min-h-[550px]">
	<Cropper image={imageData} {aspect} bind:crop bind:zoom on:cropcomplete={previewCrop} />
</div>

<Button
	type="button"
	on:click={async () => {
		croppedImage = await getCroppedImg(imageData, pixelCrop);
		if (croppedImage) downloadFile(croppedImage, image.name);
	}}
>
	Download this crop
</Button>
