<script lang="ts">
	import { bundles } from '$lib/bundles';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
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
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>
					Add a new bundle
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Name</Label>
							<Input id="name" value="Pedro Duarte" class="col-span-3" />
						</div>
					</div>
					<Dialog.Footer>
						<Button type="submit">Save changes</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Card.Content>
	</Card.Root>
</aside>
<main class="flex flex-col gap-1 overflow-auto">
	{#each $bundles as bundle}
		<h2 class="mb-3 sticky top-0 bg-background">{bundle.label}</h2>
		<!-- <pre>{JSON.stringify(bundle.bundle, undefined, 2)}</pre> -->

		<div class="rounded-md border">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						{#each Object.entries(bundle.bundle[0]) as [key, value]}
							<Table.Head>
								<Table.Cell class="capitalize">{key}</Table.Cell>
							</Table.Head>
						{/each}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each bundle.bundle as row (row.id)}
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
	{/each}
</main>
