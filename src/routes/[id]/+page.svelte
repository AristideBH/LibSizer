<script lang="ts">
	import type { PageData } from './$types';
	import Cropper from '$lib/components/Cropper.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	import { getUniqueRatios, bundleSizes, selectedBundle } from '$lib/bundles';

	$: ratioList = getUniqueRatios(bundleSizes($selectedBundle));

	export let data: PageData;
</script>

<aside>
	<BundleSelect class="sticky top-0" />
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16">
	<h1>{data.id} / {data.image.name}</h1>

	{#if ratioList}
		{#each ratioList as aspect, index}
			<!-- <pre>{JSON.stringify(aspect, undefined, 2)}</pre> -->
			<Cropper image={data.image} aspect={aspect.ratio} />
		{/each}
	{/if}
</main>
