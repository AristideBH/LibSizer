<script lang="ts">
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import { AllBundles } from '$lib/SizeBundles';
</script>

<RadioGroup>
	{#each AllBundles as bundle}
		<RadioItem bind:group={$BundleSelected} name="justify" value={bundle.name}>
			{bundle.name}
		</RadioItem>
	{/each}
</RadioGroup>
