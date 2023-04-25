<script lang="ts">
	import { bundleSizes } from '$lib/stores/settingsStore';
	import { slide } from 'svelte/transition';

	import { BundleSelected } from '$lib/stores/bundleStore';

	import ClientSelect from '$lib/components/ClientSelect.svelte';

	export let showTitle = false;
	const withTitleClass = () => (showTitle ? '!flex-row justify-between' : '');
</script>

<header class="flex flex-col gap-x-4 gap-y-2 items-center justify-center {withTitleClass()}">
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
