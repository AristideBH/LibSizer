<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';

	import { Trash, ImageOff } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Alert from '$lib/components/ui/alert';
	import { Button } from '$lib/components/ui/button';

	import { db } from '$lib/logic/db';
	import { flyAndScale } from '$lib/logic/utils';
	import { deleteBundle } from '$lib/components/bundles';
	import Loading from '$lib/components/Loading.svelte';

	$: bundles = liveQuery(() => (browser ? db.bundles.toArray() : []));
</script>

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
		{#each $bundles as bundle}
			<section class="container" transition:flyAndScale>
				<header class="flex justify-between items-bottom">
					<h1 class="mb-3 sticky top-0 bg-background">{bundle.label}</h1>
					<Button variant="outline" on:click={() => deleteBundle(bundle.id)}>
						<Trash class="mr-2 h-4 w-4" />
						Delete
					</Button>
				</header>

				<div class="rounded-md border">
					<Table.Root>
						<Table.Header>
							<Table.Row>
								{#each Object.entries(bundle.formats[0]) as [key]}
									<Table.Head class="!px-0">
										<Table.Cell class="capitalize">{key}</Table.Cell>
									</Table.Head>
								{/each}
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each bundle.formats as row (row.id)}
								<Table.Row>
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
