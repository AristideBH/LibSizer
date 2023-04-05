<script lang="ts">
	import Icon from '@iconify/svelte';

	let open = false;
	export let items, onSingleDownload, onZipDownload;

	const toggleDrop = () => (open = !open);
</script>

<div class="relative inline-block text-left {$$props.class ?? ''}">
	<div>
		<button
			type="button"
			class="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-surface-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
			on:click={toggleDrop}
		>
			<span><Icon icon="ic:outline-file-download" /></span>
			Download
			<svg
				class="-mr-1 h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	<div
		class="absolute left-0 z-10 mt-2 w-max origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
        transition ease-in duration-75 transform opacity-0 scale-95"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
		class:open
	>
		<div class="p-1" role="none">
			<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
			{#if items.length > 1}
				<button
					on:click={() => onZipDownload()}
					class="text-gray-700 pr-4 pl-3 py-2 text-sm flex items-center gap-4 hover:bg-surface-50 rounded unstyled w-full font-semibold border-b text-primary-500"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					<span><Icon icon="ic:outline-folder-zip" /></span>
					Download all
				</button>
			{/if}
			{#each items as item, i}
				<!-- <pre>{JSON.stringify(item, undefined, 2)}</pre> -->
				<button
					on:click={() => onSingleDownload(item)}
					class="text-gray-700 pr-4 pl-3 py-2 text-sm flex items-center gap-4 hover:bg-surface-50 rounded no-underline unstyled w-full"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					<span><Icon icon="ic:outline-file-download" /></span>
					{item.name}
				</button>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.open {
		@apply transition ease-out duration-100 transform opacity-100 scale-100;
	}
</style>
