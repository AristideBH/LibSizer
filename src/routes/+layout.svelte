<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { autoModeWatcher } from '$lib/logic/theme';
	import { flyAndScale } from '$lib/logic/utils';
	import { Toaster } from 'svelte-sonner';

	import { Github, Info, Library } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<header class="py-5 sticky top-0 bg-background border-b z-50">
	<div class="container flex justify-between items-center">
		<div class="flex gap-3">
			<Sidebar />
			<a href="/" class="no-underline">
				<div class="flex gap-2 text-3xl font-extrabold tracking-tight">
					<Logo class="!h-10 !w-10 !stroke-[1.35] stroke-foreground " />
					LibSizer
				</div>
			</a>
		</div>

		<div class="flex gap-5 items-center">
			<!-- <ThemeSwitcher /> -->

			<div class="flex gap-1">
				<Button
					variant="outline"
					size="icon"
					href="https://github.com/AristideBH/LibSizer"
					target="_blank"
					title="Github project page"
				>
					<Github />
				</Button>

				<Button variant="outline" size="icon" href="/about" title="About LibSizer">
					<Info />
				</Button>
				<Button variant="outline" size="icon" href="/library" title="View your library">
					<Library />
				</Button>
			</div>
		</div>
	</div>
</header>

{#key $page.route.id}
	<div
		class="container main my-5 flex flex-col lg:grid lg:grid-cols-12 gap-x-8 gap-y-5 grow"
		in:flyAndScale={{ start: 0.99 }}
	>
		<slot />
	</div>
{/key}

<Toaster position="bottom-center" theme="system" richColors />
