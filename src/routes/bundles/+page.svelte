<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import BundleTable from '$lib/components/bundles/BundleTable.svelte';
	import NewBundleForm from '$lib/components/bundles/NewBundleForm.svelte';

	export let data: PageData;
</script>

<aside>
	<Card.Root>
		<Card.Header>
			<Card.Title class="mt-0">Bundles</Card.Title>
			<Card.Description>
				The default bundles are here to simplify your workflow, but feel free to add more.
				<br />
				Be aware that bundles are stored in a browser Indexed database (localy), implying they will get
				removed upon cache clearing and are only available in the current browser.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<NewBundleForm data={data.form} />
		</Card.Content>
	</Card.Root>
</aside>

<main class="flex flex-col w-full gap-6 overflow-auto">
	<BundleTable />
</main>
