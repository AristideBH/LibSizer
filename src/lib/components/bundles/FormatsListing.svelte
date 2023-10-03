<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { getForm } from 'formsnap';
	const { form, errors } = getForm<Schema>();

	import { Button } from '$lib/components/ui/button';
	import { Plus, Minus } from 'lucide-svelte';
	import { emptyFormat, type Schema } from './schema';

	const addFormat = () => {
		$form.formats?.push(emptyFormat);
	};

	const removeLastFormat = () => {
		$form.formats?.pop();
	};

	// @ts-expect-error
	export let config;
</script>

{#if $errors?.formats?._errors}
	<p>{$errors?.formats?._errors}</p>
{/if}

<!-- <pre>{JSON.stringify($form?.formats.length, undefined, 2)}</pre> -->

<div class="flex gap-1 mt-6 items-center">
	<p>Formats</p>
	<Button
		variant="outline"
		size="icon"
		class="h-6 w-6"
		on:click={removeLastFormat}
		disabled={$form.formats.length < 2 ?? true}
		title="Remove the last format line"
	>
		<Minus class="h-4 w-4" />
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="h-6 w-6"
		on:click={addFormat}
		disabled={$form.formats.length > 9 ?? true}
		title="Add a new format line"
	>
		<Plus class="h-4 w-4" />
	</Button>
</div>

{#each $form.formats as _, i}
	<div class="grid grid-cols-[1fr_minmax(50px,_100px)_minmax(50px,_100px)] gap-4">
		<Form.Field {config} name={`formats[${i}].name`}>
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input />
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name={`formats[${i}].width`}>
			<Form.Item>
				<Form.Label>Width</Form.Label>
				<Form.Input type="number" />
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name={`formats[${i}].height`}>
			<Form.Item>
				<Form.Label>Height</Form.Label>
				<Form.Input type="number" />
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	</div>
{/each}
