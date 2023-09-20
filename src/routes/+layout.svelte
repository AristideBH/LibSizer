<script lang="ts">
	import '../app.postcss';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { autoModeWatcher } from '$lib/theme';
</script>

<svelte:head>
	<title>LibSizer</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<header class="py-5 sticky top-0 bg-background border-b z-50">
	<div class="container flex justify-between">
		<a href="/">
			<h1>LibSizer</h1>
		</a>
		<Sheet.Root>
			<Sheet.Trigger>
				<Button variant="ghost">
					<Menu className="h-4 w-4" />
				</Button>
			</Sheet.Trigger>
			<Sheet.Content class="flex flex-col justify-between">
				<Sheet.Header>
					<!-- <Sheet.Title> -->
					<h2>Settings</h2>
					<!-- </Sheet.Title> -->
					<Sheet.Description>
						This action cannot be undone. This will permanently delete your account and remove your
						data from our servers.
					</Sheet.Description>
				</Sheet.Header>

				<Sheet.Footer>
					<!-- <ThemeSwitcher /> -->
					<span>
						Made with ♡ by
						<a href="https://github.com/AristideBH" target="_blank"> @AristideBH </a>
					</span>
				</Sheet.Footer>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>

<main class="container my-5 grid lg:grid-cols-12 gap-x-8 gap-y-5 grow max-h-screen overflow-auto">
	<slot />
</main>
