<script lang="ts">
	import { browser } from '$app/environment';
	import { db } from '$lib/db';
	import { liveQuery } from 'dexie';
	import FileImport from '$lib/components/FileImport.svelte';

	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<FileImport />

<section class="container text-slate-500 mx-auto px-0">
	<div class="mt-6 mx-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
		{#if $images}
			{#if $images.length < 1}
				<p>no images</p>
			{/if}
			{#each $images as image}
				<div class="bg-slate-100 rounded-sm p-4 flex flex-col gap-x-4 gap-y-2">
					<h1 class="text-2xl">{image.data}</h1>
					<h1 class="text-2xl">{image.id}</h1>
				</div>
			{/each}
		{/if}
	</div>
</section>
