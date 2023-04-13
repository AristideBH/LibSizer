<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { BundleSelected } from '$lib/bundleStore';
	import { MousquetairesSizes, VisaSizes } from '$lib/SizeBundles';
</script>

<RadioGroup>
	<RadioItem bind:group={$BundleSelected} name="justify" value={MousquetairesSizes.name}>
		{MousquetairesSizes.name}
	</RadioItem>
	<RadioItem bind:group={$BundleSelected} name="justify" value={VisaSizes.name}>
		{VisaSizes.name}
	</RadioItem>
</RadioGroup>
<!-- <code>{$BundleSelected}</code> -->
