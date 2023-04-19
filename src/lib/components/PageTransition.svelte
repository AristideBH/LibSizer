<script lang="ts">
	import { fly } from 'svelte/transition';
	export let pathname = '',
		speed = 500;
</script>

{#key pathname}
	<div
		class="gab TransitionHolder h-full"
		in:fly={{ duration: speed, delay: speed, y: 100 }}
		out:fly={{ duration: speed, y: -100 }}
	>
		<slot />
	</div>
{/key}
