<script lang="ts">
	import type { PageData } from './$types';
	import * as Form from '$lib/components/ui/form';
	import { schema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { Button } from '$lib/components/ui/button';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;

	const options: FormOptions<typeof schema> = {
		validators: schema,
		dataType: 'json',
		defaultValidator: 'clear',
		taintedMessage: null
		// validationMethod: 'oninput'
	};

	const addFormat = () => {
		data.form.data.formats.push({ name: '', width: 0, height: 0 });
		console.log(data.form.data.formats);
	};
</script>

<main class="col-span-full">
	<h1>form demo</h1>

	<Form.Root method="POST" form={data.form} {options} {schema} action="?/submit" let:config>
		<Form.Field {config} name="bundleName">
			<Form.Item>
				<Form.Label>Bundle name</Form.Label>
				<Form.Input />
				<!-- <Form.Description>This is your public display name.</Form.Description> -->
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<h4>Formats :</h4>

		<!-- <Button on:click|once={addFormat} variant="outline">addformat</Button> -->
		{#if data.form.errors?.formats?._errors}
			<p>{data.form.errors.formats._errors}</p>
		{/if}
		{#each data.form.data.formats as _, i}
			<div class="flex gap-3">
				<!-- <Form.Field {config} name={`formats[${i}].id`}>
					<Form.Item class="">
						<Form.Label>ID</Form.Label>
						<Form.Input />
					</Form.Item>
				</Form.Field> -->
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
		<Form.Button type="submit">Submit</Form.Button>
	</Form.Root>

	<!-- <pre>{JSON.stringify(form, undefined, 2)}</pre> -->

	<SuperDebug data={data.form} theme="vscode" />
</main>
