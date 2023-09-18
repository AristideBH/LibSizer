<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { ImagePlus } from 'lucide-svelte';
	import { addImage } from '$lib/db';

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
	};
</script>

<Dropzone
	on:dropaccepted={handleAccepted}
	accept={['image/*']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone"
>
	<ImagePlus class="mb-5 w-12 h-12 stroke-primary stroke-1" />
	<button type="button" tabindex="-1">Choose images to upload</button>
	<span class="text-center">
		or
		<br />
		Drag & drop them here
	</span>
</Dropzone>
