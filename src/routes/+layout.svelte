<script lang="ts">
	import '../app.postcss';
	import { Button } from '$lib/components/ui/button';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { Toaster } from 'svelte-sonner';

	import { Github } from 'lucide-svelte';
	import { autoModeWatcher } from '$lib/theme';
</script>

<svelte:head>
	<title>LibSizer</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<header class="py-5 sticky top-0 bg-background border-b z-50">
	<div class="container flex justify-between items-center">
		<a href="/">
			<h1>LibSizer</h1>
		</a>

		<div class="flex gap-5">
			<ThemeSwitcher />

			<Button
				variant="outline"
				size="icon"
				href="https://github.com/AristideBH/LibSizer"
				target="_blank"
				title="Visit the github repo"
			>
				<Github />
			</Button>
		</div>
	</div>
</header>

<div
	class="container main my-5 grid lg:grid-cols-12 gap-x-8 gap-y-5 grow max-h-screen overflow-auto"
>
	<slot />
</div>

<Toaster position="bottom-center" theme="system" richColors />
