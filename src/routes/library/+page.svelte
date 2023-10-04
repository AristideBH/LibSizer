<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { liveQuery } from 'dexie';
	import { db } from '$lib/logic/db';
	import { getSrc, deleteImage } from '$lib/components/images';

	import { Trash, ImageOff } from 'lucide-svelte';
	import * as Alert from '$lib/components/ui/alert';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import FileImport from '$lib/components/images/FileImport.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { flyAndScale } from '$lib/logic/utils';
	import { fly, slide } from 'svelte/transition';

	const cardLink = (id: number | undefined) => {
		if (!id) return;
		goto(`/library/${id}`);
	};
	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<main class="col-span-full">
	<FileImport class="max-w-2xl mx-auto mt-6" />

	{#if $images}
		{#if $images.length < 1}
			<Alert.Root class="max-w-2xl mx-auto">
				<ImageOff class="h-4 w-4" />
				<Alert.Title>No images are loaded</Alert.Title>
				<Alert.Description>Please import some with the dropzone.</Alert.Description>
			</Alert.Root>
		{:else}
			<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each $images as image}
					<div transition:slide>
						<Card.Root class="flex flex-col h-full group" onClick={() => cardLink(image.id)}>
							<Card.Content class="px-0 pb-0 grow">
								<img
									src={getSrc(image)}
									alt=""
									class="rounded-t-md h-full object-cover w-full max-h-64"
								/>
							</Card.Content>
							<Card.Footer class="flex gap-4 items-center overflow-x-auto overflow-y-hidden pt-6 ">
								<span class="font-semibold whitespace-nowrap">
									{image.name}
								</span>
								<Button
									variant="outline"
									size="icon"
									class="ml-auto sticky right-0 px-3 hidden group-hover:flex z-1 -my-2"
									on:click={(e) => {
										e.stopPropagation();
										deleteImage(image.id);
									}}
								>
									<Trash class="h-4 w-4" />
								</Button>
							</Card.Footer>
						</Card.Root>
					</div>
				{/each}
			</section>
		{/if}
	{:else}
		<Loading />
	{/if}
</main>
