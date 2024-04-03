<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { liveQuery } from 'dexie';

	import { db } from '$lib/logic/db';
	import { getSrc, deleteImage } from '$lib/components/images';
	import Masonry from '$lib/components/Masonry.svelte';

	import { Trash, ImageOff } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import FileImport from '$lib/components/images/FileImport.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let refreshLayout: any;
	const cardLink = (id: number | undefined) => {
		if (!id) return;
		goto(`/library/${id}`);
	};
	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<svelte:head>
	<title>Your uploaded library - LibSizer</title>
</svelte:head>

<main class="col-span-full">
	<FileImport class="max-w-2xl mx-auto mt-6" />

	{#if $images}
		{#if $images.length < 1}
			<Alert.Root class="max-w-2xl mx-auto">
				<ImageOff class="w-4 h-4" />
				<Alert.Title>No images are loaded</Alert.Title>
				<Alert.Description>Please import some with the dropzone.</Alert.Description>
			</Alert.Root>
		{:else}
			<Masonry bind:refreshLayout gridGap="16px">
				{#each $images as image}
					<Card.Root class="group" onClick={() => cardLink(image.id)}>
						<Card.Content class="relative px-0 pb-0">
							<img
								on:load={refreshLayout}
								src={getSrc(image)}
								alt=""
								class="rounded-t-md max-h-[960px] object-cover w-full"
							/>
							<Button
								variant="outline"
								size="icon"
								class="absolute z-10 hidden  group-hover:flex top-2 right-2"
								on:click={(e) => {
									e.stopPropagation();
									deleteImage(image.id);
								}}
							>
								<Trash class="w-4 h-4" />
							</Button>
						</Card.Content>
						<Card.Footer class="flex items-center gap-4 pt-6 overflow-x-auto overflow-y-hidden ">
							<span class="font-semibold whitespace-nowrap">
								{image.name}
							</span>
						</Card.Footer>
					</Card.Root>
				{/each}
			</Masonry>
		{/if}
	{:else}
		<Loading />
	{/if}
</main>
