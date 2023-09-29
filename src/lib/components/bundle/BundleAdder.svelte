<script lang="ts">
	import { addBundle, type Format, type NullableKeys } from '$lib/js/bundleDB';
	import { toast } from 'svelte-sonner';
	import { writable, type Writable } from 'svelte/store';

	type FieldName = keyof Format;

	let bundleName = '';
	let formatNumber = writable(2);

	// Create a writable store for the format list
	let formatList: Writable<Array<NullableKeys<Format>>>;

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
	function handleAddBundleClick() {
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

<fieldset class="border p-2 space-y-2">
	<legend>Add new bundle</legend>

	<label class="mx-2">
		Bundle name :
		<input required type="text" bind:value={bundleName} />
	</label>

	<fieldset class="border p-2 flex flex-col gap-1">
		<legend>
			Format list
			{#if $formatNumber < 10}
				<button on:click={() => $formatNumber++}> + </button>
			{/if}
			{#if $formatNumber > 1}
				<button on:click={() => $formatNumber--}> - </button>
			{/if}
		</legend>

		{#each $formatList as format, index (format.id)}
			<div class="flex gap-5">
				<label>
					Format name :
					<input
						type="text"
						required
						bind:value={format.name}
						on:input={() => updateFormat(index, 'name', format.name)}
					/>
				</label>
				<label>
					Width :
					<input
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
					<span>px</span>
				</label>
				<label>
					Height :
					<input
						type="number"
						required
						min="10"
						max="2500"
						step="1"
						inputmode="numeric"
						bind:value={format.height}
						on:input={() =>
							updateFormat(index, 'height', format.height === null ? null : Number(format.height))}
					/>
					<span>px</span>
				</label>
				<label>
					<input type="number" hidden required value={format.id} disabled />
				</label>
			</div>
		{/each}
	</fieldset>

	<button class="border p-1" on:click={handleAddBundleClick}> Add Bundle </button>
</fieldset>

<style>
	input {
		@apply p-1;
	}
</style>
