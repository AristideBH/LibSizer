<script lang="ts">
	import { bundles, selectedBundle, findBundleByValue } from '$lib/bundles';
	import { slide } from 'svelte/transition';
	import { Settings2 } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import Label from './ui/label/label.svelte';
	import { page } from '$app/stores';

	let className = '';
	export { className as class };

	let selected = $selectedBundle;
	$: $selectedBundle = selected ? findBundleByValue(selected.value, $bundles) : undefined;
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title class="mt-0 ">Bundle selector</Card.Title>
		<Card.Description>Choose the bundle you which to export</Card.Description>
	</Card.Header>
	<Card.Content>
		<Select.Root bind:selected>
			<div class="flex gap-1 items-center justify-center">
				<Select.Trigger class="bg-background">
					<Select.Value placeholder="Choose" />
				</Select.Trigger>
				<!-- Todo: implement action -->
				<Button
					variant="outline"
					size="icon"
					title="Edit bundles"
					class="text-foreground "
					href="/bundles"
				>
					<Settings2 class=" h-4 w-4" />
				</Button>
			</div>
			<Select.Content>
				{#each $bundles as bundle}
					<Select.Item value={bundle.value}>
						{bundle.label}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>

		{#if $selectedBundle && $page.route.id == '/'}
			<pre class="flex flex-col gap-3 p-3 mt-2 overflow-x-auto bg-background border">
					<Label for="formats" class="sticky left-0 ">Formats :</Label>
					<ul id="formats" class="gap-2 my-0 ml-0" transition:slide>
						{#each $selectedBundle.bundle as size}
						{@const { name, width, height } = size}
							<li class="flex flex-col" transition:slide|local>
								<span class="font-bold capitalize">{name}</span>
								<span>{width}px × {height}px</span>
							</li>
					{/each}
					</ul>
			</pre>
		{/if}
	</Card.Content>
</Card.Root>
