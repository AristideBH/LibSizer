<script lang="ts">
	import type { PageData } from './$types';
	import Cropper from '$lib/components/Cropper.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	import { getUniqueRatios, bundleSizes, selectedBundle } from '$lib/bundles';

	$: ratioList = getUniqueRatios(bundleSizes($selectedBundle));

	export let data: PageData;
	$: ({ image } = data);
</script>

<aside>
	<BundleSelect class="sticky top-0" />
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-12">
	<div class="flex flex-col gap-2">
		<h1>id: {data.id} / {image.name}</h1>
		<code class="w-fit">Original size: {image.width}px × {image.height}px</code>
	</div>
	{#if ratioList}
		{#each ratioList as { ratio, sizes }, index}
			<!-- <pre>{JSON.stringify(ratio, undefined, 2)}</pre> -->
			<Cropper {image} {ratio} {sizes} />
		{/each}
	{/if}
</main>
