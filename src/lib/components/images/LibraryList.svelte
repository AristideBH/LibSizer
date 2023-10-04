<script lang="ts">
	import { slide } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { liveQuery } from 'dexie';

	import { Trash2, Loader2 } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';

	import { db } from '$lib/logic/db';
	// prettier-ignore
	import { deleteImage, clearDB, imageClearLoading, selectedImage, highlightLibrary } from '$lib/components/images';
	import { sheetOpen } from '$lib/logic/utils';

	const handleSelect = (index: number | undefined) => {
		if (index) $selectedImage = index;
	};
	const closeSheet = () => {
		$sheetOpen = false;
	};

	$: highlightClass = $highlightLibrary ? 'border-primary' : '';
	$: images = liveQuery(() => (browser ? db.images.toArray() : []));
</script>

<Card.Root class="{highlightClass} transition-[border] max-h-[500px] overflow-auto">
	<Card.Header>
		<Card.Title class="mt-0 ">Library</Card.Title>
		<Card.Description>
			Find your uploaded picture here.
			<br /> Preview them all in the <a href="/library" on:click={closeSheet}>library page</a>.
		</Card.Description>
	</Card.Header>

	<Card.Content>
		{#if $images}
			<ul class="m-0">
				{#each $images as image}
					{@const { id, name } = image}
					{@const active = Number($page.params?.id) == id ? 'border-s-primary border-s-[3px]' : ''}
					<li class="flex flex-row gap-1 items-center group relative" transition:slide|local>
						<Button
							variant="outline"
							class="w-full justify-start flex gap-2 no-underline !text-foreground {active} overflow-x-auto overflow-y-hidden group-hover:pr-14"
							href="/{id}"
							on:click={() => {
								handleSelect(id);
								closeSheet();
							}}
						>
							{name}
						</Button>
						<Button
							variant="outline"
							size="icon"
							title="Delete image"
							on:click={() => deleteImage(id)}
							class="absolute right-0 hidden group-hover:flex "
							type="button"
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
		<Card.Footer class="flex gap-2 sticky bottom-0 bg-card pt-4 ">
			{#if $page.route.id != '/'}
				<Button href="/library" class="no-underline" on:click={() => closeSheet()}>Add more</Button>
			{/if}
			<!-- * Remove all images -->
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
							on:click={() => {
								clearDB();
								closeSheet();
							}}
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
