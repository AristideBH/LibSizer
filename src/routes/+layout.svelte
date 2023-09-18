<script lang="ts">
	import '../app.postcss';
	import SvelteTheme from 'svelte-themes/SvelteTheme.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';
</script>

<SvelteTheme attribute="class" />

<header class="py-5 mb-5 sticky top-0 bg-white border-b">
	<div class="container flex justify-between">
		<a href="/">
			<h1>LibSizer</h1>
		</a>
		<Sheet.Root>
			<Sheet.Trigger>
				<Menu className="h-4 w-4" />
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
					<Sheet.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Sheet.Description>
				</Sheet.Header>
				<Sheet.Footer>footer</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>

<main class="container grid lg:grid-cols-12 gap-x-8 gap-y-5">
	<slot />
</main>
