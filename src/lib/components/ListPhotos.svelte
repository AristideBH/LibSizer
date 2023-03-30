<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';

	import { drawerStore } from '@skeletonlabs/skeleton';
	function drawerClose(): void {
		drawerStore.close();
	}
	let images = [];
	let valueSingle: string = '';

	if (typeof localStorage !== 'undefined') {
		images = JSON.parse(localStorage.getItem('images') || '[]');
	}
</script>

<header class="flex p-4 gap-4 items-center justify-between sticky top-0 bg-surface-100">
	<h2>Photos</h2>
	<button class="btn bg-primary-500" on:click={drawerClose}>Close</button>
</header>
<hr />
<div class="p-4">
	{#if images.length}
		<ListBox>
			{#each images as item, i}
				<ListBoxItem bind:group={valueSingle} name="medium" value={item.title}>
					<div class="flex gap-2 items-center">
						<img src={item.image} alt={item.title} class="h-4 w-4 object-cover" />
						<!-- <pre>{JSON.stringify(item, undefined, 2)}</pre> -->
						<p>{item.title}</p>
					</div>
				</ListBoxItem>
			{/each}
		</ListBox>
	{:else}
		<p>Aucune photo n'a été chargée.</p>
	{/if}
</div>
