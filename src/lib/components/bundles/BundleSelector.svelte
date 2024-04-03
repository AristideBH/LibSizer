<script lang="ts">
	import { liveQuery } from 'dexie';
	import { browser } from '$app/environment';
	import { db } from '$lib/logic/db';
	import { selectedB, findBundleByValue } from '$lib/components/bundles';

	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { Button } from '$lib/components/ui/button';
	import { Info, Settings2, ChevronsUpDown } from 'lucide-svelte';
	import { flyAndScale, sheetOpen } from '$lib/logic/utils';
	import { slide } from 'svelte/transition';

	let className = '';
	export { className as class };
	export let detailOpen = true;
	const closeSheet = () => {
		$sheetOpen = false;
	};

	$: bundles = liveQuery(() => (browser ? db.bundles.toArray() : []));
	$: selectedBundleDetail =
		$bundles && $selectedB ? findBundleByValue($selectedB?.value, $bundles) : undefined;
</script>

<Card.Root class={className}>
	<Card.Header>
		<Card.Title class="mt-0 ">Bundle selector</Card.Title>
		<Card.Description>Choose the bundle you which to export</Card.Description>
	</Card.Header>

	<Card.Content>
		{#if $bundles}
			<Select.Root bind:selected={$selectedB}>
				<div class="flex gap-1 items-center justify-center">
					<Select.Trigger class="bg-background">
						<Select.Value placeholder="Choose" />
					</Select.Trigger>
					<Button
						variant="outline"
						size="icon"
						title="Edit bundles"
						class="text-foreground "
						href="/bundles"
						on:click={() => closeSheet()}
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

			{#if selectedBundleDetail}
				<Collapsible.Root class="mt-2 bg-background border rounded-md" open={detailOpen}>
					<Collapsible.Trigger asChild let:builder>
						<Button
							builders={[builder]}
							variant="ghost"
							class="w-full justify-start items-center p-3 "
						>
							<Info class="h-4 w-4 mr-2" />
							<p class="text-xs">
								{selectedBundleDetail.label} formats
							</p>
							<span class="sr-only">Toggle</span>
							<ChevronsUpDown class="h-4 w-4 ml-auto" />
						</Button>
					</Collapsible.Trigger>

					<Collapsible.Content class="space-y-2">
						<ul
							id="formats"
							class="gap-3 my-0 ml-0 mt-1 flex flex-col p-3 pt-1 pl-7 overflow-x-auto font-mono"
						>
							{#each selectedBundleDetail.formats as format}
								{@const { name, width, height } = format}

								<li class="text-sm" transition:slide>
									<span class="capitalize font-semibold">{name}</span>
									<br />
									<span>{width}px × {height}px</span>
								</li>
							{/each}
						</ul>
					</Collapsible.Content>
				</Collapsible.Root>
			{/if}
		{/if}
	</Card.Content>
</Card.Root>
