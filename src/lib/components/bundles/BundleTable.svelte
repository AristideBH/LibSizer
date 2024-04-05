<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';

	import { Trash, ImageOff, Edit } from 'lucide-svelte';
	import * as Table from '$lib/components/ui/table';
	import * as Alert from '$lib/components/ui/alert';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';

	import { db } from '$lib/logic/db';
	import { flyAndScale } from '$lib/logic/utils';
	import { deleteBundle, editBundle } from '$lib/components/bundles';
	import Loading from '$lib/components/Loading.svelte';

	$: bundles = liveQuery(() => (browser ? db.bundles.toArray() : []));

	let closeButton: Button;
</script>

{#if $bundles}
	{#if $bundles.length < 1}
		<Alert.Root>
			<ImageOff class="size-4" />
			<Alert.Title>There are no bundles loaded.</Alert.Title>
			<Alert.Description>
				Refresh your page to populate with default bundles or add your own.
			</Alert.Description>
		</Alert.Root>
	{:else}
		{#each $bundles as bundle}
			<section class="container" transition:flyAndScale>
				<header class="flex justify-between gap-2 items-bottom">
					<h1 class="sticky top-0 mb-3 bg-background me-auto">{bundle.label}</h1>
					<Dialog.Root>
						<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
							<Edit class="mr-2 size-4" />
							Edit
						</Dialog.Trigger>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Editing : {bundle.label} bundle</Dialog.Title>
							</Dialog.Header>
							<div class="grid gap-4 py-4">body</div>
							<Dialog.Footer class="mt-8">
								<Dialog.Close asChild let:builder>
									<Button
										builders={[builder]}
										variant="outline"
										class="me-auto"
										bind:this={closeButton}
									>
										Close
									</Button>
								</Dialog.Close>
								<Button>Submit</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>

					<Button variant="outline" on:click={() => deleteBundle(bundle.id)}>
						<Trash class="mr-2 size-4" />
						Delete
					</Button>
				</header>

				<div class="border rounded-md">
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
