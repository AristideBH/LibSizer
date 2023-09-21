<script lang="ts">
	import type { PageData } from './$types';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';

	export let data: PageData;
</script>

<aside>
	<!-- <BundleSelect /> -->
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16">
	<h1>image id: {data.id}</h1>

	<pre>{JSON.stringify(data.queriedImage, undefined, 2)}</pre>
</main>
