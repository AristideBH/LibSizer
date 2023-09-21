<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { ImagePlus, Loader2 } from 'lucide-svelte';
	import { addImage, imageAddLoading } from '$lib/db';
	import Button from './ui/button/button.svelte';

	let className = '';
	export { className as class };

	const handleAccepted = (event: CustomEvent) => {
		const acceptedFiles = event.detail.acceptedFiles;

		for (const file of acceptedFiles) {
			const reader = new FileReader();
			reader.onload = async (e) => {
				if (e.target && e.target.result) {
					const imageBlob = e.target.result as Blob | ArrayBuffer;
					await addImage(file, imageBlob);
				}
			};
			reader.readAsArrayBuffer(file);
		}

		// window.location.href = '/test';
	};
</script>

<Dropzone
	on:dropaccepted={handleAccepted}
	accept={['image/*']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone {className}"
>
	<ImagePlus class="mb-5 w-12 h-12 stroke-primary stroke-1" />

	{#if $imageAddLoading}
		<Button disabled variant="ghost">
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Importing
		</Button>
	{:else}
		<button type="button" tabindex="-1">Click to upload images</button>
		<span class="text-center"> or drag & drop them here </span>
		<small class="mt-1">(jpg, png, ico and tiff are accepted)</small>
	{/if}
</Dropzone>
