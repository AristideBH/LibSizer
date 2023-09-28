<script lang="ts">
	import type { PageData } from './$types';

	import { liveQuery } from 'dexie';
	import { db, type Picture } from '$lib/js/db';
	import { getUniqueRatios, bundleSizes, selectedBundle } from '$lib/js/bundles';

	import { Loader2, MonitorDown, ImageOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import Cropper from '$lib/components/Cropper.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';

	export let data: PageData;
	let isLoading = true;
	let image: Picture | null = null;

	$: ratioList = getUniqueRatios(bundleSizes($selectedBundle));

	$: query = liveQuery(async () => {
		try {
			const fetchedImage = await db.images.where('id').equals(Number(data.id)).first();
			isLoading = false;
			image = fetchedImage || null;
		} catch (error) {
			console.error('Error fetching data:', error);
			isLoading = false;
			image = null;
		}
	});
	$query;
</script>

<svelte:head>
	<title>Cropping - LibSizer</title>
</svelte:head>

<aside class="hidden lg:flex">
	<BundleSelect class="sticky top-0" />
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-12">
	{#if isLoading}
		<Button disabled variant="ghost">
			<Loader2 class="mr-2 h-4 w-4 animate-spin" />
			Loading
		</Button>
	{:else if image}
		<div class="flex flex-col gap-3 sticky top-0 z-50">
			<h1>{image.name}</h1>
			<code class="w-fit">Original size: {image.width}px × {image.height}px</code>
			<Button size="lg">
				<MonitorDown class="mr-2 h-4 w-4" />
				Download the whole bundle
			</Button>
		</div>
		{#if ratioList}
			{#each ratioList as { ratio, sizes }}
				<Cropper {image} {ratio} {sizes} />
			{/each}
		{/if}
	{:else}
		<Alert.Root>
			<ImageOff class="h-4 w-4" />
			<Alert.Title>Image is missing</Alert.Title>
			<Alert.Description>
				Please go back to the <a href="/">homescreen</a> and load up your images.
			</Alert.Description>
		</Alert.Root>
	{/if}
</main>
