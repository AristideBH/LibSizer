<script>
	import { drawerOpen } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import SizesSettings from '$lib/components/SizesSettings.svelte';
</script>

<div class="flex flex-col items-center h-full justify-center text-center px-4 pt-16 pb-4 gap-10">
	<div class=" flex flex-col items-center">
		<span class="w-24 h-24 text-primary-500/50">
			<Icon icon="solar:crop-minimalistic-bold-duotone" width="100%" />
		</span>
		<p class="py-3">
			No picture selected. <br /> Please choose one from the
			<a class="lg:hidden" href="/" on:click={drawerOpen}>library</a>
			<span class="hidden lg:inline">library.</span>
		</p>
	</div>
	<SizesSettings />
</div>
