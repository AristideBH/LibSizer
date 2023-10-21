<script lang="ts">
	import Welcome from '$lib/components/Welcome.svelte';
	import FileImport from '$lib/components/images/FileImport.svelte';
	import LibraryList from '$lib/components/images/LibraryList.svelte';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
</script>

<svelte:head>
	<title>LibSizer - Crop your library</title>
	<meta
		name="description"
		content="Libsizer is a tool allowing you to quickly crop and resize your picture library to multiple format."
	/>
</svelte:head>

<aside class="hidden lg:flex">
	<BundleSelector />
	<LibraryList />
</aside>

<main
	class="flex flex-col gap-16 my-10 overflow-auto lg:col-span-8 xl:col-span-9 grow lg:max-h-screen"
>
	<Welcome />
	<FileImport class="max-w-2xl mx-auto mb-20" />
</main>
