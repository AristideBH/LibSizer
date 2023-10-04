<script lang="ts">
	import { getForm } from 'formsnap';
	import { emptyFormat, type Schema } from './schema';
	import { Plus, Minus } from 'lucide-svelte';
	import * as Form from '$lib/components/ui/form';
	import { Button } from '$lib/components/ui/button';

	//@ts-ignore
	export let config;
	const { form, errors } = getForm<Schema>();
</script>

{#if $errors?.formats?._errors}
	<p>{$errors?.formats?._errors}</p>
{/if}

<div class="flex gap-1 mt-6 items-center">
	<p>Formats</p>
	<Button
		variant="outline"
		size="icon"
		class="h-6 w-6"
		type="submit"
		on:click={() => {
			$form.formats?.pop();
		}}
		disabled={$form.formats.length < 2 ?? true}
		title="Remove the last format line"
	>
		<Minus class="h-4 w-4" />
	</Button>
	<Button
		variant="outline"
		size="icon"
		class="h-6 w-6"
		type="submit"
		on:click={() => {
			//@ts-expect-error : Defaults bundles are intentionnaly undefined for 'width' and 'height'
			$form.formats?.push(emptyFormat);
		}}
		disabled={$form.formats.length > 9 ?? true}
		title="Add a new format line"
	>
		<Plus class="h-4 w-4" />
	</Button>
</div>

{#each $form.formats as _, i}
	<div class="grid grid-cols-[1fr_minmax(50px,_75px)_minmax(50px,_75px)] gap-4">
		<Form.Field {config} name={`formats[${i}].name`}>
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input placeholder="(eg. thumbnail, banner...)" autocomplete="off" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name={`formats[${i}].width`}>
			<Form.Item>
				<Form.Label>Width</Form.Label>
				<Form.Input type="number" placeholder="px" autocomplete="off" />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name={`formats[${i}].height`}>
			<Form.Item>
				<Form.Label>Height</Form.Label>
				<Form.Input type="number" placeholder="px" autocomplete="off" />
				<!-- <Form.Validation /> -->
			</Form.Item>
		</Form.Field>
	</div>
{/each}
