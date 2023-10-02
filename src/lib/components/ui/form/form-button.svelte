<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	type $$Props = Button.Props;
	type $$Events = Button.Events;
	export let type = 'submit';
</script>

<Button.Root {...$$restProps} {type} on:click on:keydown>
	<slot />
</Button.Root>
