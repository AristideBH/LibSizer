<script lang="ts">
	import { browser } from '$app/environment';
	import { bDB, deleteBundle } from '$lib/js/bundleDB';
	import { liveQuery } from 'dexie';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import BundleAdder from '$lib/components/bundle/BundleAdder.svelte';
	import { flyAndScale } from '$lib/utils';

	$: bundles = liveQuery(() => (browser ? bDB.bundles.toArray() : []));
</script>

<main class="container col-span-full space-y-4">
	<!-- <BundleAdder /> -->

	<BundleAdder class="mt-4" />
</main>

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
