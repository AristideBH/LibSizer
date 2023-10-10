<script lang="ts">
	import type { PageData } from './$types';
	import { liveQuery } from 'dexie';
	import { browser } from '$app/environment';

	import { FolderArchive, ImageOff } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Alert from '$lib/components/ui/alert';
	import { Badge } from '$lib/components/ui/badge';

	import type { Picture, childData } from '$lib/types';
	import { db } from '$lib/logic/db';
	import { selectedB, findBundleByValue, getUniqueRatios2 } from '$lib/components/bundles';
	import { handleBundleDownload, simpleImageType } from '$lib/components/images/canvasUtils';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
	import Cropper from '$lib/components/images/Cropper.svelte';
	import LibraryList from '$lib/components/images/LibraryList.svelte';
	import Loading from '$lib/components/Loading.svelte';

	export let data: PageData;
	let isLoading = true;
	let image: Picture | null = null;
	let testElement: HTMLElement;
	let childsData: childData[] = [];

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
		$bundles && $selectedB && browser ? findBundleByValue($selectedB?.value, $bundles) : undefined;
	$: ratioList = browser ? getUniqueRatios2(selectedBundleDetail?.formats) : undefined;

	function handleUpstream(event: CustomEvent<any>) {
		const dataFromChild = event.detail.detail;
		const existingIndex = childsData.findIndex(
			(item) => item.imageData === dataFromChild.imageData
		);
		if (existingIndex !== -1) {
			childsData[existingIndex].pixelCrop = dataFromChild.pixelCrop;
		} else {
			childsData.push(dataFromChild);
		}
	}
</script>

<svelte:head>
	<title>Cropping - LibSizer</title>
</svelte:head>

<aside class="hidden lg:flex">
	<BundleSelector detailOpen={false} />
	<LibraryList />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-12">
	{#if isLoading}
		<Loading />
	{:else if image}
		<div class="flex flex-col gap-3 sticky top-0 z-50" bind:this={testElement}>
			<h1>{image.name}</h1>
			<div class="flex gap-2">
				<Badge variant="outline">{image.width}px × {image.height}px</Badge>
				<Badge variant="outline">.{simpleImageType(image.type)}</Badge>
			</div>
			{#if childsData && image}
				<Button size="lg" on:click={() => handleBundleDownload(childsData, image)}>
					<FolderArchive class="mr-2 h-4 w-4" />
					Download the whole bundle
				</Button>
			{/if}
		</div>
		{#if ratioList}
			{#each ratioList as { ratio, formats }}
				<Cropper {image} {ratio} {formats} on:upstream-crop={handleUpstream} />
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
