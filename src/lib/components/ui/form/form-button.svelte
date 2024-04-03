<script lang="ts">
	import * as Button from '$lib/components/ui/button';
	type $$Props = Button.Props;
	type $$Events = Button.Events;
</script>

<Button.Root {...$$restProps} type="submit" on:click on:keydown>
	<slot />
</Button.Root>
