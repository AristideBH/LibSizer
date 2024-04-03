<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { tick } from 'svelte';
	import { cn } from '$lib/logic/utils';
	import SuperDebug from 'sveltekit-superforms';
	import { onMount } from 'svelte';
	import { addBundle } from '$lib/components/bundles';
	import { Trash2, Plus } from 'lucide-svelte';

	export let data: SuperValidated<Infer<FormSchema>>;
	let dialogOpen = false;
	let closeButton: Button;

	function addFormat() {
		//@ts-expect-error validation says the appended new format is undefined, which is normal
		$formData.formats = [...$formData.formats, { name: '' }];

		tick().then(() => {
			const formatsInput = Array.from(
				document.querySelectorAll<HTMLElement>("#add-form input[name='formats']")
			);
			const lastInput = formatsInput[formatsInput.length - 3];
			lastInput && lastInput.focus();
		});
	}

	function removeFormat(i: number) {
		$formData.formats = $formData.formats.filter((_, index) => index !== i);
	}

	onMount(() => {
		addFormat();
	});

	const form = superForm(data, {
		validators: zodClient(formSchema),
		dataType: 'json',
		clearOnSubmit: 'errors-and-message',
		validationMethod: 'onsubmit',
		onResult: (data) => {
			const { result } = data;
			if (result.type === 'success' && result.data) {
				addBundle(result.data.submittedBundle.bundleName, result.data.submittedBundle.formats);
				dialogOpen = false;
			}
		}
	});
	const { form: formData, enhance } = form;
</script>

<Dialog.Root
	open={dialogOpen}
	closeOnEscape={false}
	closeOnOutsideClick={false}
	onOpenChange={(open) => {
		dialogOpen = open === true;
	}}
>
	<Dialog.Trigger class=" w-fit">
		<Button class="me-auto">Add a new bundle</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New bundle</Dialog.Title>
			<Dialog.Description>Add your new custom bundle here.</Dialog.Description>
		</Dialog.Header>

		<form method="POST" use:enhance class="flex flex-col gap-4" id="add-form">
			<Form.Field {form} name="bundleName">
				<Form.Control let:attrs>
					<Form.Label>Bundle name</Form.Label>
					<Input {...attrs} bind:value={$formData.bundleName} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Fieldset {form} name="formats" class="space-y-0">
				<Form.Legend class="mb-2">Formats</Form.Legend>
				{#each $formData.formats as _, i}
					<div class="grid grid-flow-col gap-2 auto-cols-auto">
						<Form.ElementField {form} name="formats[{i}].name">
							<Form.Description class={cn(i !== 0 && 'sr-only')}>Name</Form.Description>
							<Form.Control let:attrs>
								<Input {...attrs} bind:value={$formData.formats[i].name} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.ElementField>
						<Form.ElementField {form} name="formats[{i}].width">
							<Form.Description class={cn(i !== 0 && 'sr-only')}>Width</Form.Description>
							<Form.Control let:attrs>
								<Input type="number" {...attrs} bind:value={$formData.formats[i].width} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.ElementField>
						<Form.ElementField {form} name="formats[{i}].height">
							<Form.Description class={cn(i !== 0 && 'sr-only')}>Height</Form.Description>
							<Form.Control let:attrs>
								<Input type="number" {...attrs} bind:value={$formData.formats[i].height} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.ElementField>
						<div class="space-y-2">
							<Button
								variant="outline"
								size="icon"
								title="Remove format"
								class="flex {i === 0 ? 'mt-7' : 'mt-2'}"
								disabled={i === 0}
								on:click={() => removeFormat(i)}
							>
								<Trash2 class="size-4" />
							</Button>
						</div>
					</div>
				{/each}
			</Form.Fieldset>
			<Button type="button" variant="secondary" size="sm" class="w-fit" on:click={addFormat}>
				<Plus class="size-4 me-2" />
				Add a format
			</Button>
			<!-- <SuperDebug data={$formData} /> -->

			<Dialog.Footer class="mt-8">
				<Dialog.Close asChild let:builder>
					<Button builders={[builder]} variant="outline" class="me-auto" bind:this={closeButton}>
						Close
					</Button>
				</Dialog.Close>
				<Form.Button>Submit</Form.Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
