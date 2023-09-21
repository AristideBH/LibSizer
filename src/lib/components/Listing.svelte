<script lang="ts">
	import { liveQuery } from 'dexie';
	import { selected } from '$lib';
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';

	import { db, deleteImage, clearDB, imageClearLoading } from '$lib/db';

	import { Trash2, Loader2 } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';

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
			<ul class="m-0" transition:slide>
				{#each $images as image}
					{@const { id, blob, name, type } = image}
					<li class="flex flex-row gap-1 items-center" transition:slide|local>
						<Button
							variant="outline"
							class="w-full justify-start flex gap-2 no-underline !text-foreground "
							on:click={() => handleSelect(id)}
							href="/{id}"
						>
							{name}
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
			<Dialog.Root>
				<Dialog.Trigger>
					<Button variant="destructive">Remove all</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Remove all image ?</Dialog.Title>
						<Dialog.Description>
							This action is not reversible. Be sure you want to delete all uploaded images.
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Button
							disabled={$imageClearLoading ? true : false}
							variant="destructive"
							on:click={() => clearDB()}
						>
							{#if $imageClearLoading}
								<Loader2 class="mr-2 h-4 w-4 animate-spin" />
								Deleting
							{:else}
								Yes, remove them all !
							{/if}
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Card.Footer>
	{/if}
</Card.Root>
