<script lang="ts">
	import { addSize, deleteSize } from '$lib/stores/settingsStore';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import SettingsSizes from '$lib/components/SettingsSizes.svelte';

	let newSize = { name: '', width: 0, height: 0 };

	function handleAddSize() {
		addSize(newSize);
		newSize = { name: '', width: 0, height: 0 };
	}

	function handleRemoveSize(id: number) {
		// deleteSize(id);
	}
</script>

<div class="flex flex-col gap-2 w-full max-w-[580px] shadow-sm">
	<div class="card p-4 w-full">
		<h2 class="pb-3">Options</h2>
		<hr class="mb-4" />
		<div class="flex gap-2">
			<span>Theme :</span>
			<LightSwitch />
		</div>
	</div>
	<div class="card p-4 w-full">
		<SettingsSizes showTitle={true} />
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
