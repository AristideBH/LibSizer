<script lang="ts">
	import FileImport from '$lib/components/FileImport.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import Cropper from '$lib/components/Cropper.svelte';
</script>

<head>
	<meta
		name="description"
		content="Libsizer is a tool allowing you to quickly crop and resize your picture library to multiple format."
	/>
</head>

<aside>
	<!-- <Listing /> -->
	<BundleSelect />
</aside>

<main class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16 my-10">
	<Welcome />
	<FileImport class="max-w-2xl mx-auto" />
	<!-- <Cropper id={$selected}></Cropper> -->
</main>
