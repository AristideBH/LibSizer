<script lang="ts">
	import { X, Menu } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import Button from './ui/button/button.svelte';
	import { page } from '$app/stores';

	import { sheetOpen } from '$lib/logic/utils';
	import Logo from './Logo.svelte';
	import LibraryList from './images/LibraryList.svelte';
	import BundleSelector from './bundles/BundleSelector.svelte';
</script>

<Sheet.Root
	open={$sheetOpen}
	onOpenChange={(open) => {
		$sheetOpen = open === true;
	}}
>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="lg:hidden">
			<Menu class="stroke-primary" />
		</Button>
	</Sheet.Trigger>

	<Sheet.Content side="left" class="p-4">
		<Sheet.Header class="flex flex-row gap-2 justify-between items-center">
			<div class="flex gap-2 items-center">
				<Logo class="h-9 w-9 stroke-[1.5px]" />
				<div class="font-bold text-2xl !mt-0">LibSizer</div>
			</div>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="button" size="icon" variant="outline" class="!mt-0">
					<X class="h-4 w-4" />
				</Button>
			</Sheet.Close>
		</Sheet.Header>

		<div class="grid gap-4 py-4">
			<BundleSelector detailOpen={false} />
			{#if $page.route.id != ('/' && '/library')}
				<LibraryList />
			{/if}
		</div>
	</Sheet.Content>
</Sheet.Root>
