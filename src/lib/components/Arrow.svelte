<script lang="ts">
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	import { selected, library } from '$lib/stores/imagesStore';
	export let direction: 'right' | 'left';

	const directionsIcons = (direction: 'right' | 'left'): IconifyIcon => {
		if (direction == 'right') {
			return 'ic:baseline-keyboard-arrow-right' as unknown as IconifyIcon;
		} else {
			return 'ic:baseline-keyboard-arrow-left' as unknown as IconifyIcon;
		}
	};

	const handleClick = () => {
		if (direction == 'right') {
			if ($selected < $library.length) {
				$selected++;
			}
		} else {
			if ($selected > 1) {
				$selected--;
			}
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
	<button class="btn-icon btn-icon-sm variant-outline" on:click={handleClick} disabled={disabled()}>
		<span>
			<Icon icon={directionsIcons(direction)} />
		</span>
	</button>
{/if}
