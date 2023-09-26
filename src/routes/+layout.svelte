<script lang="ts">
	import '../app.postcss';
	import { Toaster } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Github, Info } from 'lucide-svelte';

	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { autoModeWatcher } from '$lib/theme';
	import Logo from '$lib/components/Logo.svelte';
</script>

<svelte:head>
	<title>LibSizer - Crop your library</title>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<header class="py-5 sticky top-0 bg-background border-b z-50">
	<div class="container flex justify-between items-center">
		<a href="/" class="no-underline">
			<h1 class="flex gap-2">
				<Logo class="!h-10 !w-10 !stroke-[1.35] stroke-foreground translate-y-1" />
				LibSizer
			</h1>
		</a>

		<div class="flex gap-5">
			<ThemeSwitcher />

			<div class="flex gap-1">
				<Button
					variant="outline"
					size="icon"
					href="https://github.com/AristideBH/LibSizer"
					target="_blank"
					title="Github repo"
				>
					<Github />
				</Button>
				<Button variant="outline" size="icon" href="/about" title="About LibSizer">
					<Info />
				</Button>
			</div>
		</div>
	</div>
</header>

<div class="container main my-5 flex flex-col lg:grid lg:grid-cols-12 gap-x-8 gap-y-5 grow">
	<slot />
</div>

<Toaster position="top-center" theme="system" richColors />
