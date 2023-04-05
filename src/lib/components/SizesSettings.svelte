<script lang="ts">
	import { sizesStore, addSize, deleteSize } from '$lib/settingsStore';

	import Icon from '@iconify/svelte';

	let newSize = { name: '', width: 0, height: 0 };

	function handleAddSize() {
		addSize(newSize);
		newSize = { name: '', width: 0, height: 0 };
	}

	function handleRemoveSize(id: number) {
		deleteSize(id);
	}
</script>

<div class="flex flex-col gap-2">
	<div class="card p-4 mt-8">
		<h2 class="pb-3">Sizes</h2>
		<hr />

		<ul class="my-4">
			{#each $sizesStore as size}
				<li class="flex items-center gap-2" />
				<dl class="list-dl">
					<div>
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
						<span>
							<button class="btn variant-outline" on:click={handleRemoveSize(size.id)}>
								<Icon icon="ic:baseline-delete-outline" class="text-current" />
							</button>
						</span>
					</div>
				</dl>
			{/each}
		</ul>

		<!-- <pre>{JSON.stringify(newSize, undefined, 2)}</pre> -->
	</div>
	<div class="card p-4 flex flex-col mb-6">
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
	</div>
</div>
