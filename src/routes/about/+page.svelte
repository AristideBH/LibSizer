<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<svelte:head>
	<title>About LibSizer</title>
</svelte:head>

<main class="flex flex-col gap-16 my-10 overflow-auto lg:col-span-8 xl:col-span-9 grow">
	<section class="flex flex-col gap-4 lg:max-w-2xl">
		<h1>About</h1>
		<p class="mt-6 lead text-balance">
			Do you need to crop multiple images to specific formats or dimensions?
			<br />LibSizer is the tool for you!
		</p>
		<p class="text-balance">
			LibSizer is a simple and powerful tool that lets you crop your photos library to predefined
			dimensions in just a few clicks. Try it now for free and see how easy it is to resize your
			library!
		</p>
	</section>
	<section class="flex flex-col gap-6">
		<h2>Usage</h2>
		<ol class="pl-6 space-y-2 list-decimal">
			<li>Choose your dimensions set in the setting modal.</li>
			<li>Load your photos in the <code>Library</code> sidebar with the dedicated filezone.</li>
			<li>Select one of your photo from your loaded photos.</li>
			<li>
				LibSizer will automatically group listed dimensions into similar ratios.
				<br />(eg. Square, 4/3, 16/9, etc)
			</li>
			<li>Crop your image to your need, for each of the ratios.</li>
			<li>
				Use the <code>Export bundle</code> button in the toolbar to export the full package.
				<br />
				A window will open and let you chose where to save the zip file.
			</li>
			<li>You can use the dedicated button to donwload specific dimensions or ratio bundle.</li>
		</ol>
	</section>
	<section class="flex flex-col gap-6">
		<h2>Roadmap</h2>
		<p class="text-balance">
			I'm currently building the tool as I go, and have a lot of work still needed. Adding new
			features isn't a goal for now, as I mainly try to get everything working from the start.
		</p>
		<p class="text-balance">
			If you wish to submit a feature request, feel free to do so on the Github page, I'll try to
			keep this updated.
		</p>
	</section>
	<section class="flex flex-col gap-6">
		<h2>Issue reporting</h2>
		<p class="text-balance">
			LibSizer is my first big public project. I maintain it on my free time as a hobby and
			exercise, and chose not to include ads in the app.
		</p>
		<p class="text-balance">
			If you find any bugs, translation issue or have ideas for improvements, please open an issue
			on the <a href="https://github.com/AristideBH/LibSizer" target="_blank">
				Github project page
			</a>.
			<br /> I'll try to find time, but nothing is guaranted ;)
		</p>
		<p>Feel free to clone and submit pull requests if you do find ways to improve the tool !</p>
	</section>
</main>

<aside class="my-12">
	<h2>About the author</h2>
	<p class="flex items-center gap-3 mt-2 lead">
		<Avatar.Root>
			<Avatar.Image src="https://avatars.githubusercontent.com/u/11951633?v=4" alt="@AristideBH" />
			<Avatar.Fallback>A</Avatar.Fallback>
		</Avatar.Root>Hello, I'm Aristide !
	</p>
	<p class="text-balance">
		I'm a graphic designer and web developper from Paris, France. I'm currently working at <a
			href="https://noise.fr">Noise</a
		> agency on print and web projects.
	</p>
	<p>
		Follow me on <a href="https://github.com/AristideBH" target="_blank">Github</a> to support this
		project and have a look at my <a href="https://aristide-bh.com" target="_blank"> portfolio</a> to
		see my personal projects.
	</p>

	<h2>Thanks to</h2>
	<ul>
		<li><a href="https://kit.svelte.dev/" target="_blank"> Sveltekit </a> for the JS framework</li>
		<li>
			<a href="https://www.shadcn-svelte.com/" target="_blank"> Shadcn-svelte </a> for the UI toolkit
		</li>
		<li>
			<a href="https://www.vercel.com/" target="_blank">Vercel </a> for hosting service
		</li>
		<li>
			<a href="https://github.com/ValentinH/svelte-easy-crop" target="_blank"> ValentinH</a>
			for the cropping component
		</li>
		<li>
			<a href="https://github.com/thecodejack/svelte-file-dropzonee">thecodejack</a> for the dropzone
			component
		</li>
		<li><a href="https://lucide.dev/">lucide</a> for the icons</li>
		<li>
			<a href="https://github.com/wobsoriano/svelte-sonner">wobsoriano</a> for the toast component
		</li>
		<li><a href="https://www.npmjs.com/package/dexie">Dexie.js</a> for the IndexedDB wrapper</li>
	</ul>
</aside>
