<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { bundles, selectedBundle, findBundleByValue } from '$lib/bundles';
	import { slide } from 'svelte/transition';
	import Label from './ui/label/label.svelte';

	let selected = $selectedBundle;
	$: $selectedBundle = selected ? findBundleByValue(selected.value, $bundles) : undefined;
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
				{#each $bundles as bundle}
					<Select.Item value={bundle.value}>{bundle.label}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		{#if $selectedBundle}
			<div class="flex flex-col gap-3 mt-6">
				<Label for="formats">Formats :</Label>
				<ul id="formats" class="gap-3 my-0" transition:slide>
					{#each $selectedBundle.bundle as size}
						{@const { name, width, height } = size}
						<li class="flex flex-col" transition:slide|local>
							<span class="font-semibold capitalize">{name}</span>
							<span>{width}px × {height}px</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
