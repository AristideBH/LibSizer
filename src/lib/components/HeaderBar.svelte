<script lang="ts">
	import Icon from '@iconify/svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import Nav from '$lib/components/Nav.svelte';
	import ClientSelect from '$lib/components/ClientSelect.svelte';

	export let handleLibClick, handleCogClick;
</script>

<AppBar regionRowMain=" gap-2 justify-between px-4 container" slotLead="flex gap-7 justify-center">
	<svelte:fragment slot="lead">
		<a
			href="/"
			class="text-2xl font-black uppercase underline underline-offset-4 decoration-primary-500 decoration-dashed hover:decoration-solid"
		>
			LibSizer
		</a>

		<Nav />
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<ClientSelect />
		<div class="inline-flex group">
			<button
				type="button"
				class="btn variant-filled-primary"
				on:click|preventDefault={handleLibClick}
			>
				<span><Icon icon="ic:baseline-photo-library" /></span>
				<span>Library</span></button
			>
			<button
				type="button"
				class="btn btn-icon variant-filled-primary"
				on:click|preventDefault={handleCogClick}
				title="Sizes settings"
			>
				<span>
					<Icon icon="mdi:cog" />
				</span>
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
		@apply rounded-l-none pr-1;
	}
</style>
