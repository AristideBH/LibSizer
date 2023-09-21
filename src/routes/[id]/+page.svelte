<script lang="ts">
	import type { PageData } from './$types';
	import { createDataUrl } from '$lib/db';
	import Cropper from '$lib/components/Cropper.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';

	export let data: PageData;
</script>

<aside>
	<BundleSelect class="sticky top-0" />
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16 overflow-auto">
	<h1>image id: {data.id}</h1>

	<!-- <Cropper id={data.id}></Cropper> -->
	<img src={createDataUrl(data.image.blob, data.image.type)} alt="" />
</main>
