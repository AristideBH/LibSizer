<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { autoModeWatcher } from '$lib/logic/theme';
	import { flyAndScale } from '$lib/logic/utils';
	import { Toaster } from 'svelte-sonner';

	import { FormInput, Github, Info, Library } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<header class="sticky top-0 z-50 py-5 border-b bg-background">
	<div class="container flex items-center justify-between">
		<div class="flex gap-2">
			<Sidebar />
			<a href="/" class="no-underline">
				<div class="flex gap-2 text-3xl font-extrabold tracking-tight">
					<Logo class="!h-10 !w-10 !stroke-[1.35] stroke-foreground hidden lg:block" />

					LibSizer
				</div>
			</a>
		</div>

		<div class="flex items-center gap-5">
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
				<Button
					href="/library"
					title="View your library"
					size="icon"
					class="no-underline md:ms-2 md:h-10 md:px-4 md:py-2 md:h-unset md:w-fit "
				>
					<Library class="md:mr-1" />
					<span class="hidden md:block">Library</span>
				</Button>
			</div>
		</div>
	</div>
</header>

{#key $page.route.id}
	<div
		class="container flex flex-col items-start my-5 main lg:grid lg:grid-cols-12 gap-x-8 gap-y-5 grow"
		in:flyAndScale={{ start: 0.99 }}
	>
		<slot />
	</div>
{/key}

<Toaster position="bottom-center" theme="system" richColors />
