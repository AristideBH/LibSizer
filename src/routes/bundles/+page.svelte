<script lang="ts">
	import { bundles } from '$lib/bundles';
</script>

<section class="col-span-full">
	<h1>Edit bundles</h1>

	{#each $bundles as bundle}
		<!-- content here -->
		<h2>{bundle.label}</h2>
		<pre>{JSON.stringify(bundle.bundle, undefined, 2)}</pre>
	{/each}
</section>
