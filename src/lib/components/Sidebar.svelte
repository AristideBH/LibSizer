<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Library } from 'lucide-svelte';
	import BundleSelect from './BundleSelect.svelte';
	import Listing from './Listing.svelte';
	import Button from './ui/button/button.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="lg:hidden">
			<Library />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content side="left" class=" flex flex-col gap-2">
		<BundleSelect />
		<Listing />
	</Sheet.Content>
</Sheet.Root>
