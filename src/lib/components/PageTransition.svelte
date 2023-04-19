<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quadInOut } from 'svelte/easing';
	export let pathname = '',
		speed = 250,
		distance = 10;
</script>

{#key pathname}
	<div
		class="h-full w-full overflow-hidden"
		in:fly={{ duration: speed, delay: speed, y: distance, easing: quadInOut }}
		out:fly={{ duration: speed, y: -distance }}
	>
		<slot />
	</div>
{/key}
