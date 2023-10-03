<script lang="ts">
	import type { FormOptions } from 'formsnap';
	import type { PageData, ActionData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import { schema } from '$lib/components/bundles/schema';
	import FormatsListing from '$lib/components/bundles/FormatsListing.svelte';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
	import BundleTable from '$lib/components/bundles/BundleTable.svelte';

	export let data: PageData;
	export let form: ActionData;
	let dialogOpen = false;
	let closeButton: Button;

	const options: FormOptions<typeof schema> = {
		validators: schema,
		dataType: 'json',
		defaultValidator: 'clear',
		taintedMessage: null,
		validationMethod: 'submit-only'
		// SPA: true
	};

	$: console.log(form);
</script>

<main class="flex flex-col gap-6 overflow-auto">
	<!-- <BundleTable /> -->
	{#if form?.success}
		<!-- this message is ephemeral; it exists because the page was rendered in
		   response to a form submission. it will vanish if the user reloads -->
		<p>Success</p>
	{/if}
</main>

<aside>
	<Card.Root>
		<Card.Header>
			<Card.Title class="mt-0">Bundles</Card.Title>
			<Card.Description>
				The default bundles are here to simplify your workflow, but feel free to add more.
			</Card.Description>
		</Card.Header>
		<Card.Content>
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

					<Form.Root method="POST" form={data.form} {options} {schema} let:config>
						<Form.Field {config} name="bundleName">
							<Form.Item>
								<Form.Label>Bundle name</Form.Label>
								<Form.Input />
								<Form.Validation />
							</Form.Item>
						</Form.Field>

						<FormatsListing {config} />

						<Dialog.Footer class="mt-4">
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
							<Form.Button type="submit">Add bundle</Form.Button>
						</Dialog.Footer>
					</Form.Root>
				</Dialog.Content>
			</Dialog.Root>
		</Card.Content>
	</Card.Root>
	<!-- <BundleSelector /> -->
</aside>
