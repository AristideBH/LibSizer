<script lang="ts">
	import { browser } from '$app/environment';
	import { db, deleteImage, clearDB, createDataUrl } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { Trash2 } from 'lucide-svelte';
	import FileImport from '$lib/components/FileImport.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { selected } from '$lib';

	const handleSelect = (index: number) => {
		console.log(index);
		$selected = index;
	};

	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<FileImport />

<aside class="lg:col-span-4 xl:col-span-3 gap-2 flex flex-col">
	{#if $images}
		<ul class="bg-slate-100 rounded-sm p-4 m-0">
			{#each $images as image}
				{@const { id, blob, name, type } = image}
				<li class="flex flex-row gap-3 items-center">
					<Button
						variant="outline"
						class="w-full justify-start flex pl-2 gap-2"
						on:click={() => handleSelect(id)}
					>
						<Avatar.Root class="h-6 w-6">
							<Avatar.Image class="object-cover " src={createDataUrl(blob, type)} alt={name} />
							<Avatar.Fallback>T</Avatar.Fallback>
						</Avatar.Root>
						<span>{name}</span>
					</Button>
					<button title="Delete image" on:click={() => deleteImage(id)}>
						<Trash2 class="h-4 w-4" />
					</button>
				</li>
			{/each}
		</ul>

		{#if $images.length < 1}
			<p>No images are loaded</p>
		{:else if $images.length > 1}
			<Button variant="destructive" class="self-start" on:click={() => clearDB()}>
				Remove all
			</Button>
		{/if}
	{/if}
</aside>

<section class="lg:col-span-8 xl:col-span-9 gap-2 flex flex-col">
	<h2>selected</h2>

	{$selected}
</section>
