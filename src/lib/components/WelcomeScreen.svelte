<script>
	import { drawerOpen } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import SizesSettings from '$lib/components/SizesSettings.svelte';
</script>

<div class="flex flex-col items-center h-full justify-center gap-6 text-center py-8 px-4">
	<span class="w-24 h-24 text-primary-500/50">
		<Icon icon="solar:crop-minimalistic-bold-duotone" width="100%" />
	</span>
	<p class="pb-3">
		No picture selected. <br /> Please choose one from the
		<a href="/" on:click={drawerOpen}>library</a>.
	</p>
	<SizesSettings />
</div>
