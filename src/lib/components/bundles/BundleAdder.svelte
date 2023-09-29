<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import { addBundle, type Format, type NullableKeys } from '$lib/components/bundles/bundleDB';
	import { toast } from 'svelte-sonner';

	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Plus, Minus } from 'lucide-svelte';

	type FieldName = keyof Format;

	let bundleName = '';
	let formatNumber = writable(2);
	let formatList: Writable<Array<NullableKeys<Format>>>;
	let closeButton: Button;
	let dialogOpen = false;

	let className = '';
	export { className as class };

	// Function to update format information when inputs change
	function updateFormat(index: number, field: FieldName, value: any) {
		formatList.update((list) => {
			return list.map((item, i) => {
				if (i === index) {
					//@ts-expect-error
					item[field] = value === undefined ? null : (value as NullableKeys<Format>[FieldName]);
				}
				return item;
			});
		});
	}

	function areFormatNamesUnique(formats: NullableKeys<Format>[]): boolean {
		const formatNames = new Set<string>();

		for (const format of formats) {
			if (format.name !== null && formatNames.has(format.name)) {
				return false; // Duplicate name found
			}

			if (format.name !== null) {
				formatNames.add(format.name);
			}
		}

		return true; // All names are unique or null
	}

	// Function to check if all values are not null or undefined
	function areAllValuesNotNull(formats: NullableKeys<Format>[]): boolean {
		return formats.every(
			(format) =>
				(format.name !== null || undefined) &&
				(format.width !== null || undefined) &&
				(format.height !== null || undefined)
		);
	}

	// Click handler for the "Add Bundle" button
	function handleAddBundle() {
		if (!areFormatNamesUnique($formatList)) {
			// Handle the case where format names are not unique
			toast.warning('Format names must be unique.');
			console.error('Duplicate format names found.');
			return;
		}

		if (!areAllValuesNotNull($formatList)) {
			// Handle the case where some values are null
			toast.warning('Please fill all fields to add your new bundle.');
			console.error('Some name, width, or height values are null.');
			return;
		}

		// All checks passed, add the bundle
		addBundle(bundleName, $formatList);
		dialogOpen = false;
		// Reset form
		$formatNumber = 2; // Reset format number
		bundleName = '';
	}

	// Subscribe to formatNumber changes and update the formatList accordingly
	$: {
		formatList = writable<Array<NullableKeys<Format>>>(
			Array.from({ length: $formatNumber }, (_, i) => ({
				id: i + 1,
				name: null,
				width: null,
				height: null
			}))
		);
	}
</script>

<Dialog.Root
	open={dialogOpen}
	closeOnEscape={false}
	closeOnOutsideClick={false}
	onOpenChange={(open) => {
		dialogOpen = open === true;
	}}
>
	<Dialog.Trigger class="{buttonVariants()} w-fit ">Add a new bundle</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New bundle</Dialog.Title>
			<Dialog.Description>Add your new custom bundle here.</Dialog.Description>
		</Dialog.Header>

		<fieldset class="flex flex-col gap-6 {className}">
			<div class="inputWrapper">
				<Label for="bundleName">Bundle name</Label>
				<Input id="bundleName" class="" required type="text" bind:value={bundleName} />
			</div>

			<!-- * Formats listing -->
			<fieldset class=" flex flex-col gap-3">
				<legend class="flex gap-1 w-full mb-2">
					<span class="mr-auto">Formats</span>
					<Button
						variant="outline"
						size="icon"
						class="h-6 w-6"
						title="Add a new format line"
						on:click={() => $formatNumber++}
						disabled={$formatNumber > 10 ?? false}
					>
						<Plus class="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						class="h-6 w-6"
						title="Remove a format line"
						on:click={() => $formatNumber--}
						disabled={$formatNumber < 2 ?? true}
					>
						<Minus class="h-4 w-4" />
					</Button>
				</legend>

				{#each $formatList as format, index (format.id)}
					<div class="flex gap-2">
						<!-- * Name -->
						<div class="inputWrapper">
							<Label for={`formatName-${index}`}>Name</Label>
							<Input
								id={`formatName-${index}`}
								type="text"
								required
								bind:value={format.name}
								on:input={() => updateFormat(index, 'name', format.name)}
							/>
						</div>
						<!-- * Width -->
						<div class="inputWrapper">
							<Label for={`formatWidth-${index}`}>Width</Label>
							<Input
								id={`formatWidth-${index}`}
								type="number"
								required
								min="10"
								max="2500"
								step="1"
								inputmode="numeric"
								bind:value={format.width}
								on:input={() =>
									updateFormat(index, 'width', format.width === null ? null : Number(format.width))}
							/>
						</div>
						<!-- * Height -->
						<div class="inputWrapper">
							<Label for={`formatHeight-${index}`}>Height</Label>
							<Input
								id={`formatHeight-${index}`}
								type="number"
								required
								min="10"
								max="2500"
								step="1"
								inputmode="numeric"
								bind:value={format.height}
								on:input={() =>
									updateFormat(
										index,
										'height',
										format.height === null ? null : Number(format.height)
									)}
							/>
						</div>

						<Input type="number" hidden required disabled value={format.id} class="hidden" />
					</div>
				{/each}
			</fieldset>
		</fieldset>

		<Dialog.Footer>
			<Button type="button" on:click={handleAddBundle}>Add bundle</Button>
			<Dialog.Close asChild let:builder>
				<Button builders={[builder]} type="button" variant="outline" bind:this={closeButton}>
					Close
				</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<style lang="postcss">
	.inputWrapper {
		@apply flex flex-col w-full max-w-lg gap-1.5;
	}
</style>
