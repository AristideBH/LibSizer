<script lang="ts">
	import Icon from '@iconify/svelte';

	export let handleLibClick, handleCogClick;
</script>

<div class="inline-flex group">
	<button type="button" class="btn variant-filled-primary" on:click|preventDefault={handleLibClick}>
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
		@apply rounded-l-none pr-6;
	}
</style>
