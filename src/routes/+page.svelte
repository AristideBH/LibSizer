<script lang="ts">
	import FileImport from '$lib/components/FileImport.svelte';
	import Listing from '$lib/components/Listing.svelte';

	import Cropper from '$lib/components/Cropper.svelte';

	import { selected } from '$lib';
</script>

<FileImport />

<aside class="lg:col-span-4 xl:col-span-3 gap-2 flex flex-col">
	<Listing />
</aside>

<section class="lg:col-span-8 xl:col-span-9 gap-2 flex flex-col">
	<h2>selected : {$selected}</h2>
	<Cropper id={$selected}></Cropper>
</section>
