<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { ImagePlus, Loader2 } from 'lucide-svelte';
	import { addImage, imageAddLoading } from '$lib/db';
	import Button from './ui/button/button.svelte';
	import { toast } from 'svelte-sonner';

	let className = '';
	export { className as class };
	let hovering = false;
	$: hoveringClass = hovering ? '!border-primary' : '';

	const handleAccepted = async (event: CustomEvent) => {
		const acceptedFiles = event.detail.acceptedFiles;

		try {
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
			hovering = false;
			toast.success('Imported successfully !');
			// window.location.href = '/test';
		} catch (error) {
			console.error('Error importing file(s):', error);
			toast.error('Something wrong happened during the import');
		}
	};
</script>

<Dropzone
	on:dropaccepted={handleAccepted}
	on:dragover={() => {
		hovering = true;
	}}
	on:dragleave={() => {
		hovering = false;
	}}
	accept={['image/*']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone {className} {hoveringClass}"
>
	<ImagePlus class="mb-5 w-12 h-12 stroke-primary stroke-1" />

	{#if $imageAddLoading}
		<Button disabled variant="ghost">
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Loading
		</Button>
	{:else if hovering}
		<p>Drop your files</p>
	{:else}
		<button type="button" tabindex="-1">Click to upload images</button>
		<span class="text-center"> or drag & drop them here </span>
		<small class="mt-1">(jpg, png, gif, webp, ico and tif are accepted)</small>
	{/if}
</Dropzone>
