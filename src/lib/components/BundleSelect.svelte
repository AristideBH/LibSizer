<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { AllBundles, type SizesBundle } from '$lib/bundles';
	import { slide } from 'svelte/transition';

	let selected: any;
	let value: string;

	function findSizeBundleByName(name: string, bundles: SizesBundle[]): SizesBundle | undefined {
		return bundles.find((bundle) => bundle.name === name);
	}

	$: if (selected) {
		value = selected.value;
	}

	$: selectedBundle = findSizeBundleByName(value, AllBundles)?.bundle;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="mt-0 ">Bundle selector</Card.Title>
		<Card.Description>Choose the bundle you which to export</Card.Description>
	</Card.Header>
	<Card.Content>
		<Select.Root bind:selected>
			<Select.Trigger>
				<Select.Value placeholder="Choose" />
			</Select.Trigger>
			<Select.Content>
				{#each AllBundles as bundle}
					<Select.Item value={bundle.name}>{bundle.name}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		{#if selectedBundle}
			<ul class="gap-3 mb-0" transition:slide>
				{#each selectedBundle as size}
					{@const { name, width, height } = size}
					<li class="flex flex-col" transition:slide|local>
						<span class="font-semibold capitalize">{name}</span>
						<span>{width}px × {height}px</span>
					</li>
				{/each}
			</ul>
		{/if}
	</Card.Content>
</Card.Root>
