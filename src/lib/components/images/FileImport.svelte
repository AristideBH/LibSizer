<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { ImagePlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import { addImage, imageAddLoading, toggleHighlight } from '$lib/components/images';
	import Loading from '../Loading.svelte';

	let className = '';
	export { className as class };
	let hover = false;
	$: hoverClass = hover ? '!border-primary !bg-card' : '';

	const handleAccepted = async (event: CustomEvent) => {
		const acceptedFiles = event.detail.acceptedFiles;

		try {
			for (const file of acceptedFiles) {
				const reader = new FileReader();
				reader.onload = async (e) => {
					if (e.target && e.target.result) {
						const imageBlob = e.target.result as Blob | ArrayBuffer;
						const image = new Image();
						let width, height;

						image.onload = () => {
							width = image.width;
							height = image.height;
							addImage(file, imageBlob, width, height);
						};

						// Set the src attribute of the Image object to the data URL
						image.src = URL.createObjectURL(new Blob([imageBlob]));
					}
				};
				reader.readAsArrayBuffer(file);
			}
			hover = false;
			toast.success('Imported successfully !');
			toggleHighlight(2000);
			goto('/library');
		} catch (error) {
			console.error('Error importing file(s):', error);
			toast.error('Something went wrong during the import');
		}
	};
</script>

<Dropzone
	on:dropaccepted={handleAccepted}
	on:dragover={() => (hover = true)}
	on:dragleave={() => (hover = false)}
	accept={['image/jpeg', 'image/png', 'image/gif', 'image/tiff', 'image/ico', 'image/webp']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone {className} {hoverClass}"
>
	<ImagePlus class="mb-5 w-12 h-12 stroke-primary stroke-1" />

	{#if $imageAddLoading}
		<Loading />
	{:else if hover}
		<p>Drop your files</p>
	{:else}
		<button type="button" tabindex="-1">Click to upload images</button>
		<span class="text-center"> or drag & drop them here </span>
		<small class="mt-1">(jpg, png, gif, webp, ico and tif are accepted)</small>
	{/if}
</Dropzone>
