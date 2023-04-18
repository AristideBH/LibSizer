<script lang="ts">
	import { library } from '$lib/stores/imagesStore';
</script>

<!-- Responsive Container (recommended) -->
<div class="container py-4">
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>ID</th>
					<th>Status</th>
					<th>Meta</th>
				</tr>
			</thead>
			<tbody>
				{#each $library as photo}
					<tr>
						<td><strong>{photo['name']}</strong></td>
						<td>{photo['id']}</td>
						<td><code>{photo['status']}</code></td>
						<td>
							<!-- <pre>{JSON.stringify(photo.meta, undefined, 2)}</pre> -->
							<ul class="flex flex-col gap-2">
								{#each Object.keys(photo['meta']) as key}
									{#if photo['meta'][key]}
										<li
											class="border border-surface-300 bg-surface-50-900-token/10 rounded-md p-1 px-2 flex gap-x-2 flex-wrap"
										>
											<div class="">
												ratioName: {photo['meta'][key]['ratioName']}
											</div>
											<code><strong>x:</strong> {photo['meta'][key]['cropData']['x']}</code>
											<code><strong>y:</strong> {photo['meta'][key]['cropData']['y']}</code>
											<code><strong>width:</strong> {photo['meta'][key]['cropData']['width']}</code>
											<code
												><strong>height:</strong> {photo['meta'][key]['cropData']['height']}</code
											>
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
					<th colspan="3">Total photos number</th>
					<td>{$library.length}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
