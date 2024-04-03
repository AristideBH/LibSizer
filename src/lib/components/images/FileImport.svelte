<script lang="ts">
	import Dropzone from 'svelte-file-dropzone';
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

	const handleRejected = async (event: CustomEvent<any>) => {
		// console.log('rejected');
		hover = false;
		toast.error('Non-valid file(s) , make sure your are only importing jpeg, png, bmp or webp.');
	};
</script>

<Dropzone
	on:droprejected={handleRejected}
	on:dropaccepted={handleAccepted}
	on:dragover={() => (hover = true)}
	on:dragleave={() => (hover = false)}
	accept={['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'image/webp']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone {className} {hoverClass}"
>
	<ImagePlus class="w-12 h-12 mb-5 stroke-1 stroke-primary" />

	{#if $imageAddLoading}
		<Loading />
	{:else if hover}
		<p>Drop your files</p>
	{:else}
		<button type="button" tabindex="-1">Click to upload images</button>
		<span class="text-center"> or drag & drop them here </span>
		<small class="mt-1">(jpeg, png, bmp and webp are accepted)</small>
	{/if}
</Dropzone>
