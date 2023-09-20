<script lang="ts">
	import FileImport from '$lib/components/FileImport.svelte';
	import Listing from '$lib/components/Listing.svelte';
	import BundleSelect from '$lib/components/BundleSelect.svelte';
	import Cropper from '$lib/components/Cropper.svelte';
	import Welcome from '$lib/components/Welcome.svelte';
</script>

<aside
	class="lg:col-span-4 xl:col-span-3 gap-2 flex flex-col sticky top-6 max-h-screen overflow-y-auto overflow-x-hidden"
>
	<BundleSelect />
	<!-- <Listing /> -->
</aside>

<section class="lg:col-span-8 xl:col-span-9 flex flex-col grow sticky top-24 gap-16 my-10">
	<Welcome />
	<FileImport class="max-w-2xl mx-auto" />
	<!-- <h2>selectedImage : {$selected}</h2> -->
	<!-- <Cropper id={$selected}></Cropper> -->
</section>
