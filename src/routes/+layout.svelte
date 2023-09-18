<script lang="ts">
	import '../app.postcss';
	import SvelteTheme from 'svelte-themes/SvelteTheme.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import FileImport from '$lib/components/FileImport.svelte';
</script>

<SvelteTheme enableColorScheme={false} attribute="class" />

<!-- <button on:click={() => setTheme('dark')}> Dark mode </button> -->

<header class="py-5">
	<h1 class="container">LibSizer</h1>
</header>
<main class="container">
	<slot />
</main>

<!-- <Sheet.Root>
	<Sheet.Trigger>Open</Sheet.Trigger>
	<Sheet.Content side="left">
		<Sheet.Header>
			<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
			<Sheet.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Sheet.Description>
			<FileImport />
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root> -->
