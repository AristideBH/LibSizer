<script lang="ts">
	import { imagesStore } from '$lib';
	import FileImport from '$lib/components/FileImport.svelte';
</script>

<FileImport />

<pre>{JSON.stringify($imagesStore, undefined, 2)}</pre>
