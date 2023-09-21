<script lang="ts">
	// from https://github.com/skeletonlabs/skeleton/blob/master/packages/skeleton/src/lib/utilities/LightSwitch/LightSwitch.svelte
	import { onMount } from 'svelte';
	// prettier-ignore
	import { modeCurrent, setModeUserPrefers, setModeCurrent, setInitialClassState, getModeOsPrefers } from '$lib/theme';
	import { Switch } from '$lib/components/ui/switch';
	import { Label } from '$lib/components/ui/label';

	function onToggleHandler(): void {
		$modeCurrent = !$modeCurrent;
		setModeUserPrefers($modeCurrent);
		setModeCurrent($modeCurrent);
	}

	// Lifecycle
	onMount(() => {
		// Sync lightswitch with the theme
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});
</script>

<svelte:head>
	<!-- Workaround for a svelte parsing error: https://github.com/sveltejs/eslint-plugin-svelte/issues/492 -->
	{@html `<\u{73}cript nonce="%sveltekit.nonce%">(${setInitialClassState.toString()})();</script>`}
</svelte:head>

<div class="flex items-center space-x-2">
	<!-- <Label class="cursor-pointer" for="theme-switch"
		>{$modeCurrent === true ? 'Light' : 'Dark'} mode</Label
	> -->
	<Switch
		on:click={onToggleHandler}
		role="switch"
		aria-label="Light Switch"
		aria-checked={$modeCurrent}
		title="Toggle {$modeCurrent === true ? 'Dark' : 'Light'} Mode"
		tabindex={0}
		id="theme-switch"
	/>
</div>
