<script lang="ts">
	import { addSize, deleteSize, bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	import Icon from '@iconify/svelte';
	import ClientSelect from '$lib/components/ClientSelect.svelte';
	import { slide } from 'svelte/transition';

	let newSize = { name: '', width: 0, height: 0 };

	function handleAddSize() {
		addSize(newSize);
		newSize = { name: '', width: 0, height: 0 };
	}

	function handleRemoveSize(id: number) {
		// deleteSize(id);
	}
	export let showTitle = false;
</script>

<div class="flex flex-col gap-2 w-full max-w-[580px] shadow-sm">
	<div class="card p-4 w-full">
		<header
			class="flex flex-col gap-x-4 gap-y-2 pt-1 items-center justify-center
				"
		>
			{#if showTitle}
				<h2>Sizes</h2>
			{/if}
			<ClientSelect />
		</header>
		{#key bundleSizes($BundleSelected)}
			<dt class="mt-4" transition:slide|local>
				{#each bundleSizes($BundleSelected) as size, i}
					<dl class="list-dl bg-surface-hover-token rounded-lg">
						<div class="text-left">
							<span class="badge-icon p-4 variant-soft-primary border border-primary-500">
								{i + 1}
							</span>
							<span class="flex-auto">
								<dt><strong>{size.name}</strong></dt>
								<dd>
									<span>
										{size.width == undefined ? 'fit' : size.width + 'px'}
										×
										{size.height == undefined ? 'fit' : size.height + 'px'}
									</span>
								</dd>
							</span>
							<!-- <span>
								<button class="btn-icon variant-outline" on:click={() => handleRemoveSize(size.id)}>
									<span>
										<Icon icon="ic:baseline-delete-outline" />
									</span>
								</button>
							</span> -->
						</div>
					</dl>
				{/each}
			</dt>
		{/key}
	</div>
	<!-- <div class="card p-4 flex flex-col mb-6">
		<h2 class="pb-3">Add a new size</h2>
		<hr />
		<div class="flex gap-4 justify-evenly flex-wrap my-4">
			<label class="label w-full grow">
				<span>Name</span>
				<input class="input" type="text" bind:value={newSize.name} required />
			</label>
			<div class="flex gap-4 w-full">
				<label class="label w-full">
					<span>Width</span>
					<input class="input" type="number" bind:value={newSize.width} required />
				</label>
				<label class="label w-full">
					<span>Height</span>
					<input class="input" type="number" bind:value={newSize.height} required />
				</label>
			</div>
		</div>
		<button
			type="button"
			class="btn variant-filled ml-auto"
			on:click|preventDefault={handleAddSize}
		>
			Add
		</button>
	</div> -->
</div>
