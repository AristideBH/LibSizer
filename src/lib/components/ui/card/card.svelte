<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/logic/utils';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		onClick?: Function | undefined;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };

	export let onClick: $$Props['onClick'] = undefined;
	let role: 'button' | 'undefined' = onClick ? 'button' : 'undefined';

	function handleClick() {
		if (onClick) onClick();
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
	{...$$restProps}
	on:click={handleClick}
	{role}
	tabindex={onClick ? 0 : -1}
>
	<slot />
</div>
