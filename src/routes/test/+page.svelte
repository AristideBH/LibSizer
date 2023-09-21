<script lang="ts">
	// import type { PageData } from './$types';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	// export let data: PageData;
</script>

<aside
	class="lg:col-span-4 xl:col-span-3 gap-2 flex flex-col sticky top-6 max-h-screen overflow-y-auto overflow-x-hidden"
>
	<BundleSelect />
	<Listing />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16">
	<h1>test page</h1>
</main>
