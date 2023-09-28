<script lang="ts">
	import Welcome from '$lib/components/Welcome.svelte';
	import FileImport from '$lib/components/FileImport.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
</script>

<svelte:head>
	<title>LibSizer - Crop your library</title>
	<meta
		name="description"
		content="Libsizer is a tool allowing you to quickly crop and resize your picture library to multiple format."
	/>
</svelte:head>

<aside class="hidden lg:flex">
	<BundleSelect />
	<Listing />
</aside>

<main
	class="lg:col-span-8 xl:col-span-9 flex flex-col grow gap-16 my-10 lg:max-h-screen overflow-auto"
>
	<Welcome />
	<FileImport class="max-w-2xl mx-auto mb-20" />
</main>
