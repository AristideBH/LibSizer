<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import { getImageById, type Picture, getSrc } from '$lib/db';

	export let id: number;
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let imageData: Picture | undefined;

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
</script>

{#if imageData}
	<div class="relative w-full h-full">
		<Cropper
			image={getSrc(imageData)}
			bind:crop
			bind:zoom
			on:cropcomplete={(e) => console.log(e.detail)}
		/>
	</div>
{/if}
