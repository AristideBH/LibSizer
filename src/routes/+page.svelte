<script lang="ts">
	import { browser } from '$app/environment';
	import { db, deleteImage, clearDB, createDataUrl } from '$lib/db';
	import { liveQuery } from 'dexie';
	import { Trash2 } from 'lucide-svelte';
	import FileImport from '$lib/components/FileImport.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<FileImport />

<section class="text-slate-500">
	<div class="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
		{#if $images}
			{#if $images.length < 1}
				<p>No images are loaded</p>
			{:else if $images.length > 1}
				<Button variant="destructive" class="col-span-full" on:click={() => clearDB()}>
					Remove all
				</Button>
			{/if}
			{#each $images as image}
				<div class="bg-slate-100 rounded-sm p-4 flex flex-col gap-x-4 gap-y-2">
					<!-- <pre>{JSON.stringify(image, undefined, 2)}</pre> -->
					<img src={createDataUrl(image.blob, image.type)} alt={image.name} />
					<button title="Delete image" on:click={() => deleteImage(image.id)}>
						<Trash2 class="h-4 w-4" />
					</button>
				</div>
			{/each}
		{/if}
	</div>
</section>
