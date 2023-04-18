<script lang="ts">
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { library } from '$lib/stores/imagesStore';

	export let handleLibClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>,
		handleCogClick: svelte.JSX.MouseEventHandler<HTMLButtonElement>;
</script>

<AppBar
	regionRowMain=" px-4 container !gap-x-3 !gap-y-4 flex-col justify-center sm:flex-row sm:justify-between"
	slotTrail="flex flex-wrap"
	slotDefault="hidden"
>
	<svelte:fragment slot="lead">
		<a
			href="/"
			class="text-2xl font-black uppercase underline underline-offset-4 decoration-primary-500 decoration-dashed hover:decoration-solid"
		>
			LibSizer
		</a>
	</svelte:fragment>

	<svelte:fragment slot="trail">
		<div class="inline-flex group">
			<button
				type="button"
				class="btn variant-filled-primary"
				on:click|preventDefault={handleLibClick}
			>
				<span><Icon icon="ic:baseline-photo-library" /></span>
				<span>Library</span>
				{#if $library.length > 0}
					<span>({$library.length})</span>
				{/if}
			</button>
			<button
				type="button"
				class="btn variant-filled-primary"
				on:click|preventDefault={handleCogClick}
				title="Sizes settings"
			>
				<span>
					<Icon icon="mdi:cog" />
				</span>
				<span> Settings </span>
			</button>
		</div>
	</svelte:fragment>
</AppBar>

<style lang="postcss">
	.group {
		@apply gap-[1px] bg-primary-700 rounded-full;
	}
	.group .btn:not(:first-of-type):not(:last-of-type) {
		@apply rounded-none;
	}
	.group .btn:first-of-type {
		@apply rounded-r-none pl-6;
	}
	.group .btn:last-of-type {
		@apply rounded-l-none pl-4;
	}
</style>
