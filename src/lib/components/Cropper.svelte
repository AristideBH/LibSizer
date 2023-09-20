<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import { getImageById, type Picture, getSrc } from '$lib/db';
	import getCroppedImg from '$lib/canvasUtils';
	import Button from './ui/button/button.svelte';

	export let id: number | undefined;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let imageData: Picture | undefined;
	let croppedImage, pixelCrop;

	// Fetch the image data based on the id prop
	$: {
		getImageById(id)
			.then((image) => {
				imageData = image;
			})
			.catch((error) => {
				console.error('Error fetching image:', error);
			});
	}

	async function cropImage() {
		// croppedImage = await getCroppedImg(getSrc(imageData), pixelCrop);
	}
</script>

{#if imageData}
	<div class="relative w-full h-full cropper min-h-[550px]">
		<Cropper
			showGrid={true}
			image={getSrc(imageData)}
			bind:crop
			bind:zoom
			on:cropcomplete={(e) => (pixelCrop = e.detail.percent)}
		/>
	</div>

	<Button>Action</Button>
{/if}
