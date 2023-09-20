<script lang="ts">
	import { browser } from '$app/environment';
	import { Trash2 } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Card from '$lib/components/ui/card';
	import { db, deleteImage, clearDB, createDataUrl } from '$lib/db';
	import { liveQuery } from 'dexie';

	import { selected } from '$lib';
	const handleSelect = (index: number | undefined) => {
		if (index) $selected = index;
	};
	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="mt-0 ">Library</Card.Title>
		<Card.Description>Find your uploaded picture here</Card.Description>
	</Card.Header>
	<Card.Content>
		{#if $images}
			<ul class="m-0">
				{#each $images as image}
					{@const { id, blob, name, type } = image}
					<li class="flex flex-row gap-1 items-center">
						<Button
							variant="outline"
							class="w-full justify-start flex pl-2 gap-2"
							on:click={() => handleSelect(id)}
						>
							<Avatar.Root class="h-6 w-6">
								<Avatar.Image class="object-cover " src={createDataUrl(blob, type)} alt={name} />
								<Avatar.Fallback>{id}</Avatar.Fallback>
							</Avatar.Root>
							<span>{name}</span>
						</Button>
						<Button
							variant="outline"
							size="icon"
							title="Delete image"
							on:click={() => deleteImage(id)}
						>
							<Trash2 class="h-4 w-4" />
						</Button>
					</li>
				{/each}
			</ul>

			{#if $images.length < 1}
				<span>No images are loaded</span>
			{/if}
		{/if}
	</Card.Content>
	{#if $images && $images.length > 1}
		<Card.Footer>
			<Button variant="destructive" class="self-start" on:click={() => clearDB()}>
				Remove all
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
