<script lang="ts">
	import { library, selected } from '$lib/stores/imagesStore';
	import { getUniqueRatios, bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import { ratioToNb } from '$lib/utils';

	import CropperEl from '$lib/components/CropperEl.svelte';

	$: currentPhoto = library.getById($selected, $library);
	$: ratioList = getUniqueRatios(bundleSizes($BundleSelected));
	let cropperEls: Array<CropperEl> = [];
</script>

<div class="container flex-col p-4 !gap-4">
	{#each ratioList as ratio, index}
		{#key currentPhoto && bundleSizes($BundleSelected)}
			<CropperEl ratio={ratioToNb(ratio.ratio)} sizes={ratio.sizes} bind:this={cropperEls[index]} />
		{/key}
	{/each}
</div>
