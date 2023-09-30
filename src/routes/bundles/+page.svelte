<script lang="ts">
	import { browser } from '$app/environment';
	import { flyAndScale } from '$lib/utils';
	import { liveQuery } from 'dexie';
	import { bDB, deleteBundle } from '$lib/components/bundles/bundleDB';

	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';
	import { Trash, ImageOff } from 'lucide-svelte';

	import BundleAdder from '$lib/components/bundles/BundleAdder.svelte';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
	import Loading from '$lib/components/Loading.svelte';

	$: bundles = liveQuery(() => (browser ? bDB.bundles.toArray() : []));
</script>

<aside>
	<Card.Root>
		<Card.Header>
			<Card.Title class="mt-0">Bundles</Card.Title>
			<Card.Description>
				The default bundles are here to simplify your workflow, but feel free to add more.
				<br />
				Any important notice : bundles are store in a local browser database. If you clear it, you'll
				lose your new informations
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<BundleAdder class="mt-4" />
		</Card.Content>
	</Card.Root>
	<BundleSelector></BundleSelector>
</aside>

<main class="flex flex-col gap-6 overflow-auto">
	{#if $bundles}
		{#if $bundles.length < 1}
			<Alert.Root>
				<ImageOff class="h-4 w-4" />
				<Alert.Title>There are no bundles loaded.</Alert.Title>
				<Alert.Description>
					Refresh your page to populate with default bundles or add your own.
				</Alert.Description>
			</Alert.Root>
		{:else}
			<!-- else content here -->
			{#each $bundles as bundle}
				<section class="container" transition:flyAndScale>
					<header class="flex justify-between items-bottom">
						<h1 class="mb-3 sticky top-0 bg-background">{bundle.label}</h1>
						<Button type="button" variant="outline" on:click={() => deleteBundle(bundle.id)}>
							<Trash class="mr-2 h-4 w-4" />
							Delete
						</Button>
					</header>
					<!-- <pre>{JSON.stringify(bundle.bundle, undefined, 2)}</pre> -->

					<div class="rounded-md border">
						<Table.Root>
							<Table.Header>
								<Table.Row>
									{#each Object.entries(bundle.formats[0]) as [key]}
										<Table.Head>
											<Table.Cell class="capitalize">{key}</Table.Cell>
										</Table.Head>
									{/each}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each bundle.formats as row (row.id)}
									<Table.Row>
										<!-- <pre>{JSON.stringify(row, undefined, 2)}</pre> -->
										{#each Object.entries(row) as [key, value]}
											<Table.Cell>
												{value}
											</Table.Cell>
										{/each}
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</div>
				</section>
			{/each}
		{/if}
	{:else}
		<Loading />
	{/if}
</main>
