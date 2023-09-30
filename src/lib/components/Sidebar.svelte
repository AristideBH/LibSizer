<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { X, Menu } from 'lucide-svelte';
	import Listing from './images/Listing.svelte';
	import Button from './ui/button/button.svelte';
	import Logo from './Logo.svelte';
	import BundleSelector from './bundles/BundleSelector.svelte';
	import { sheetOpen } from '$lib/utils';
</script>

<Sheet.Root
	open={$sheetOpen}
	onOpenChange={(open) => {
		$sheetOpen = open === true;
	}}
>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="lg:hidden">
			<!-- <Logo class="h-7 w-7 stroke-[1.5px]" /> -->
			<Menu />
		</Button>
	</Sheet.Trigger>

	<Sheet.Content side="left" class="p-4">
		<Sheet.Header class="flex flex-row gap-2 justify-between items-baseline">
			<div class="font-bold ms-2">Menu</div>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="button" size="icon" variant="outline" class="!mt-0">
					<X class="h-4 w-4" />
				</Button>
			</Sheet.Close>
		</Sheet.Header>

		<div class="grid gap-4 py-4">
			<BundleSelector />
			<Listing />
		</div>
	</Sheet.Content>
</Sheet.Root>
