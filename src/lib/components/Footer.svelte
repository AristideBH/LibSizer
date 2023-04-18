<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	import type { LayoutData } from '../../routes/$types';

	export let data: LayoutData;
</script>

<div class="container py-2 px-4 flex justify-between text-sm">
	<div>
		<span class="badge variant-ghost-primary">{data.appVersion}</span>
		Developped with ♥ by <a href="https://github.com/AristideBH" target="_blank">AristideBH</a>
	</div>
	<Nav />
</div>
