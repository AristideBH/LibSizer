<script lang="ts">
	import { onMount } from 'svelte';
	// prettier-ignore
	import { modeCurrent, setModeUserPrefers, setModeCurrent, setInitialClassState, getModeOsPrefers } from '$lib/theme';
	import { Switch } from '$lib/components/ui/switch';

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

<Switch
	on:click={onToggleHandler}
	role="switch"
	aria-label="Light Switch"
	aria-checked={$modeCurrent}
	title="Toggle {$modeCurrent === true ? 'Dark' : 'Light'} Mode"
	tabindex={0}
	id="theme-switch"
/>
