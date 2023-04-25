<script lang="ts">
	import { library, selected } from '$lib/stores/imagesStore';
	import { ratioNbtoString, statusIcon } from '$lib/utils';
	import { noPhoto } from '$lib/strings';
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	const handleClick = (e: MouseEvent) => {
		if (!e || e !== null) return;
		let id = e.target.closest('tr').children[0].innerHTML;
		console.log(id);
		// selected.set(id);
		// goto('/');
	};
</script>

<div class="container py-6 px-2 space-y-3">
	<h1>Datatable</h1>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Status</th>
					<th>Dimensions</th>
					<th>Meta</th>
				</tr>
			</thead>
			<tbody>
				{#if $library.length}
					{#each $library as photo}
						<tr on:click={handleClick} class="cursor-pointer hover:!bg-primary-500/10">
							<td>{photo['id']}</td>
							<td>{photo['name']}</td>
							<td>
								<code class="flex w-fit gap-1 items-center">
									<Icon icon={statusIcon(photo['status'])} />
									{photo['status']}
								</code>
							</td>
							<td>
								<span class="flex flex-col gap-1 w-fit">
									{#each Object.keys(photo['dimensions']) as key}
										{#if photo['dimensions'][key]}
											<code class="mr-1 inline-flex w-fit">
												<strong>{key}:&hairsp;</strong>
												{photo['dimensions'][key]}px
											</code>
										{/if}
									{/each}
								</span>
							</td>
							<td class="w-fit">
								<ul class="flex flex-col gap-1 w-fit">
									{#each Object.keys(photo['meta']) as key}
										{#if photo['meta'][key]}
											<li
												class=" bg-surface-50-900-token rounded-md p-1 flex gap-1 flex-wrap w-fit"
											>
												<div class="w-full">
													Ratio:
													{ratioNbtoString(photo['meta'][key]['ratioName'])}
													<i>({photo['meta'][key]['ratioName']})</i>
												</div>
												<code>
													x: {photo['meta'][key]['cropData']['x']}
												</code>
												<code>
													y: {photo['meta'][key]['cropData']['y']}
												</code>
												<code>
													width: {photo['meta'][key]['cropData']['width']}
												</code>
												<code>
													height: {photo['meta'][key]['cropData']['height']}
												</code>
											</li>
										{/if}
									{:else}
										<li><code>No metadata</code></li>
									{/each}
								</ul>
							</td>
						</tr>
					{/each}
				{:else}
					<tr>
						<td colspan="5" class="!py-8 text-center"> {noPhoto} </td>
					</tr>
				{/if}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4">Total photos number</th>
					<td>{$library.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
	<!-- <Table source={tableSimple} interactive={true} on:selected={handleClick} /> -->
</div>
