<script lang="ts">
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { library } from '$lib/stores/imagesStore';

	export let handleLibClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>,
		handleCogClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>;
</script>

<div
	class="container flex bg-surface-100-800-token py-4 px-4 flex-row items-center justify-between"
>
	<a href="/" class=" unstyled text-2xl font-black uppercase flex flex-row items-center gap-1">
		<span class="w-9 h-9 text-primary-500/70 translate-y-[2px]">
			<Icon icon="solar:crop-minimalistic-bold-duotone" width="100%" height="100%" />
		</span>
		LibSizer
	</a>
	<div class="inline-flex group">
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click|preventDefault={handleLibClick}
		>
			<span><Icon icon="solar:album-linear" /></span>
			<span>
				Library
				{#if $library.length > 0}
					({$library.length})
				{/if}
			</span>
		</button>
		<button
			type="button"
			class="btn variant-filled-primary"
			on:click|preventDefault={handleCogClick}
			title="Sizes settings"
		>
			<span>
				<Icon icon="solar:settings-linear" />
			</span>
		</button>
	</div>
</div>

<style lang="postcss">
	.group {
		@apply gap-[1px] bg-primary-700 rounded-full;
	}
	.group .btn:not(:first-of-type):not(:last-of-type) {
		@apply rounded-none;
	}
	.group .btn:first-of-type {
		@apply rounded-r-none pl-4 pr-3;
	}
	.group .btn:last-of-type {
		@apply rounded-l-none pl-3 pr-4;
	}
</style>
