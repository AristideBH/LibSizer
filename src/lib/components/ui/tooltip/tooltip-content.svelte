<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import { cn, flyAndScale } from '$lib/logic/utils';

	type $$Props = TooltipPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let sideOffset: $$Props['sideOffset'] = 3;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		y: 6,
		duration: 100
	};
	export { className as class };
</script>

<TooltipPrimitive.Content
	{transition}
	{transitionConfig}
	{sideOffset}
	class={cn(
		'z-50 overflow-hidden rounded-md border bg-tooltip px-3 py-1.5 text-sm text-popover-foreground shadow-md flex flex-col gap-0',
		className
	)}
	{...$$restProps}
>
	<slot />
</TooltipPrimitive.Content>
