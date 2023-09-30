<script lang="ts">
	import type { PageData } from './$types';
	import { liveQuery } from 'dexie';
	import { browser } from '$app/environment';

	import { Loader2, MonitorDown, ImageOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';

	import type { Picture } from '$lib/types';
	import { db } from '$lib/db';
	import { selectedB, findBundleByValue, getUniqueRatios2 } from '$lib/components/bundles/bundleDB';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
	import Cropper from '$lib/components/images/Cropper.svelte';
	import Library from '$lib/components/images/Library.svelte';

	export let data: PageData;
	let isLoading = true;
	let image: Picture | null = null;

	$: imageQuery = liveQuery(async () => {
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
	$imageQuery;

	$: bundles = liveQuery(() => (browser ? db.bundles.toArray() : []));
	$: selectedBundleDetail =
		$bundles && $selectedB ? findBundleByValue($selectedB?.value, $bundles) : undefined;
	$: ratioList2 = getUniqueRatios2(selectedBundleDetail?.formats);
</script>

<svelte:head>
	<title>Cropping - LibSizer</title>
</svelte:head>

<aside class="hidden lg:flex">
	<BundleSelector />
	<Library />
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
		{#if ratioList2}
			{#each ratioList2 as { ratio, formats }}
				<Cropper {image} {ratio} {formats} />
			{/each}
			<pre>{JSON.stringify(ratioList2, undefined, 2)}</pre>
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
