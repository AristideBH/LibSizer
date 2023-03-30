<script lang="ts">
	import { FileDropzone } from '@skeletonlabs/skeleton';

	let files: FileList;
</script>

<FileDropzone name="files" bind:files>
	<svelte:fragment slot="lead">(icon)</svelte:fragment>
	<svelte:fragment slot="message">(message)</svelte:fragment>
	<svelte:fragment slot="meta">(meta)</svelte:fragment>
</FileDropzone>

<pre>{JSON.stringify(files, undefined, 2)}</pre>

{@debug files}
