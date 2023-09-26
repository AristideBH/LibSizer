<script lang="ts">
	import FileImport from '$lib/components/FileImport.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	import Listing from '$lib/components/Listing.svelte';
</script>

<head>
	<meta
		name="description"
		content="Libsizer is a tool allowing you to quickly crop and resize your picture library to multiple format."
	/>
</head>

<main
	class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16 my-10 lg:max-h-screen overflow-auto"
>
	<Welcome />
	<FileImport class="max-w-2xl mx-auto mb-20" />
</main>

<aside>
	<Listing />
	<BundleSelect />
</aside>
