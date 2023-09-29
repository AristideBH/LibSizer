<script lang="ts">
	import { browser } from '$app/environment';
	import { flyAndScale } from '$lib/utils';
	import { liveQuery } from 'dexie';
	import { bDB, deleteBundle } from '$lib/js/bundleDB';

	import * as Card from '$lib/components/ui/card';
	import BundleAdder from '$lib/components/bundle/BundleAdder.svelte';

	$: bundles = liveQuery(() => (browser ? bDB.bundles.toArray() : []));
</script>

<aside>
	<Card.Root>
		<Card.Header>
			<Card.Title class="mt-0">Bundles</Card.Title>
			<Card.Description>
				The default bundles are here to simplify your workflow, but feel free to add more.
				<br />
				Any important notice : bundles are store in a local browser database. If you clear it, you'll
				lose your new informations
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<BundleAdder class="mt-4" />
		</Card.Content>
	</Card.Root>
</aside>
<main class="flex flex-col gap-1 overflow-auto">
	{#if $bundles}
		<section class="container col-span-full grid grid-cols-6 gap-4">
			{#each $bundles as bundle}
				<div class="col-span-2" transition:flyAndScale>
					<pre>{JSON.stringify(bundle, undefined, 2)}</pre>
					<button on:click={() => deleteBundle(bundle.id)}>Delete</button>
				</div>
			{/each}
		</section>
	{/if}
</main>
