<script lang="ts">
	import { browser } from '$app/environment';
	import { db } from '$lib/logic/db';
	import { liveQuery } from 'dexie';
	import { getSrc } from '$lib/components/images';

	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';

	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<main class=" col-span-full">
	<h1>library</h1>
	{#if $images}
		<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
			{#each $images as image}
				<a href="/{image.id}" class="no-underline">
					<Card.Root class="flex flex-col h-full">
						<Card.Content class="px-0 grow">
							<img src={getSrc(image)} alt="" class="rounded-t-md h-full object-cover" />
						</Card.Content>
						<Card.Footer class="flex flex-col gap-2 items-start overflow-x-auto overflow-y-hidden">
							<Card.Title tag="h4">
								{image.name}
							</Card.Title>
						</Card.Footer>
					</Card.Root>
				</a>
			{/each}
		</section>
	{/if}
</main>
