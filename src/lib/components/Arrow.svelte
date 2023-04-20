<script lang="ts">
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	import { selected, library } from '$lib/stores/imagesStore';
	export let direction: 'right' | 'left';

	const directionsIcons = () =>
		direction == 'right'
			? ('material-symbols:arrow-forward-ios-rounded' as unknown as IconifyIcon)
			: ('material-symbols:arrow-back-ios-new-rounded' as unknown as IconifyIcon);

	const directionClass = () => (direction === 'right' ? 'right' : 'left');

	const handleClick = () => {
		if (direction == 'right') {
			if ($selected < $library.length) $selected++;
		} else {
			if ($selected > 1) $selected--;
		}
	};

	$: disabled = () => {
		if (direction == 'left') {
			if ($selected == 1) {
				return true;
			} else {
				return false;
			}
		} else if (direction == 'right') {
			if ($selected < $library.length) {
				return false;
			} else {
				return true;
			}
		}
	};
</script>

{#if $library.length > 1}
	<button
		class="btn-icon btn-icon-sm h-[33px] variant-outline {directionClass()}"
		on:click={handleClick}
		disabled={disabled()}
	>
		<span>
			<Icon icon={directionsIcons()} />
		</span>
	</button>
{/if}

<style lang="postcss">
	.left {
		@apply rounded-r-none;
	}
	.right {
		@apply rounded-l-none -translate-x-[1px];
	}
</style>
