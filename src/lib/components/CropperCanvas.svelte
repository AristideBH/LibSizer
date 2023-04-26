<script lang="ts">
	import { getUniqueRatios, bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import { ratioToNb } from '$lib/utils';

	import CropperToolbar from '$lib/components/CropperToolbar.svelte';
	import CropperEl from '$lib/components/CropperEl.svelte';

	$: ratioList = getUniqueRatios(bundleSizes($BundleSelected));
	export let currentPhoto;
	let cropperEls: Array<CropperEl> = [];
</script>

<CropperToolbar {cropperEls} />
<div class="container flex-col p-4 !gap-4">
	{#each ratioList as ratio, index}
		{#key currentPhoto && bundleSizes($BundleSelected)}
			<CropperEl ratio={ratioToNb(ratio.ratio)} sizes={ratio.sizes} bind:this={cropperEls[index]} />
		{/key}
	{/each}
</div>
