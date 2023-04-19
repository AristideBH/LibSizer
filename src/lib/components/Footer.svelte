<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '$lib/components/Nav.svelte';
</script>

<div
	class="container py-2 px-4 flex justify-between items-baseline text-sm border-t border-surface-200-700-token"
>
	<Nav />
	<span class="ml-auto">
		Made with love by
		<a href="https://github.com/AristideBH" target="_blank">AristideBH</a>
	</span>
	<span class=" text-xs badge variant-ghost-primary">{$page.data.appVersion}</span>
</div>
