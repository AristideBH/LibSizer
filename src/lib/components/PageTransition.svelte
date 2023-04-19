<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	export let pathname = '',
		speed = 250;
</script>

{#key pathname}
	<div
		class="gab TransitionHolder h-full"
		in:fade={{ duration: speed, delay: speed }}
		out:fade={{ duration: speed }}
	>
		<slot />
	</div>
{/key}
