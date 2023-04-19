<script lang="ts">
	import { library } from '$lib/stores/imagesStore';
</script>

<div class="container py-6 px-2 space-y-3">
	<h1>Datatable</h1>
	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Dimensions</th>
					<th>ID</th>
					<th>Status</th>
					<th>Meta</th>
				</tr>
			</thead>
			<tbody>
				{#each $library as photo}
					<tr>
						<td><strong>{photo['name']}</strong></td>
						<td><strong>{photo['type']}</strong></td>
						<td>
							{#each Object.keys(photo['dimensions']) as key}
								{#if photo['dimensions'][key]}
									<code class="mr-1">
										<strong>{key}:</strong>
										{photo['dimensions'][key]}
									</code>
								{/if}
							{/each}
						</td>
						<td>{photo['id']}</td>
						<td><code>{photo['status']}</code></td>
						<td>
							<ul class="flex flex-col gap-2">
								{#each Object.keys(photo['meta']) as key}
									{#if photo['meta'][key]}
										<li
											class="border border-surface-300 bg-surface-50-900-token/10 rounded-md p-1 px-2 flex gap-x-2 flex-wrap"
										>
											<div class="">
												ratioName: {photo['meta'][key]['ratioName']}
											</div>
											<code>
												<strong>x:</strong>
												{photo['meta'][key]['cropData']['x']}
											</code>
											<code>
												<strong>y:</strong>
												{photo['meta'][key]['cropData']['y']}
											</code>
											<code>
												<strong>width:</strong>
												{photo['meta'][key]['cropData']['width']}
											</code>
											<code>
												<strong>height:</strong>
												{photo['meta'][key]['cropData']['height']}
											</code>
										</li>
									{/if}
								{:else}
									<li><code>no metadata yet</code></li>
								{/each}
							</ul>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th colspan="4">Total photos number</th>
					<td>{$library.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
