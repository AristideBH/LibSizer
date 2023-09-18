<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte';
	import { X, ImagePlus } from 'lucide-svelte';
	import { imagesStore } from '$lib';

	let files = {
		accepted: [],
		rejected: []
	};

	function handleFilesSelect(e: CustomEvent) {
		const { acceptedFiles, fileRejections } = e.detail;

		files.accepted = [...files.accepted, ...acceptedFiles];
		$imagesStore = [...files.accepted];
		files.rejected = [...files.rejected, ...fileRejections];
	}

	function handleRemoveFile(e: PointerEvent | MouseEvent, index: number) {
		files.accepted.splice(index, 1);
		files.accepted = [...files.accepted];
	}
	function handleRemoveAll() {
		files.accepted = [];
	}
</script>

<Dropzone
	on:drop={handleFilesSelect}
	accept={['image/*']}
	inputElement=""
	disableDefaultStyles={true}
	containerClasses="cn-dropzone"
>
	<ImagePlus class="mb-5 w-12 h-12 stroke-primary stroke-1" />
	<button type="button" tabindex="-1">Choose images to upload</button>
	<span>or</span>
	<span>Drag and drop them here</span>
</Dropzone>
<div class="m-5">
	{#if files.accepted.length > 0}
		<button on:click={handleRemoveAll}>Remove All</button>
	{/if}
	{#each files.accepted as item, index}
		<ul>
			<li>
				<span>{item.name}</span>
				<button on:click={(e) => handleRemoveFile(e, index)} title="Remove file">
					<X />
				</button>
			</li>
		</ul>
	{/each}
</div>
