<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	import BundleAdder from '$lib/components/bundles/BundleAdder.svelte';
	import BundleSelector from '$lib/components/bundles/BundleSelector.svelte';
	import BundleTable from '$lib/components/bundles/BundleTable.svelte';
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
			<BundleAdder class="mt-4" />
		</Card.Content>
	</Card.Root>
	<BundleSelector />
</aside>

<main class="flex flex-col gap-6 overflow-auto">
	<BundleTable />
</main>
