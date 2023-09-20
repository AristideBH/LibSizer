<script lang="ts">
	import FileImport from '$lib/components/FileImport.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';

	import Cropper from '$lib/components/Cropper.svelte';

	import { selected } from '$lib';
</script>

<!-- <FileImport /> -->

<aside
	class="lg:col-span-4 xl:col-span-3 gap-2 flex flex-col sticky top-6 max-h-screen overflow-y-auto overflow-x-hidden"
>
	<BundleSelect />
	<Listing />
</aside>

<section class="lg:col-span-8 xl:col-span-9 gap-2 flex flex-col grow sticky top-24">
	<h2>selected : {$selected}</h2>
	<Cropper id={$selected}></Cropper>
</section>
