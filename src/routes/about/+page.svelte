<script lang="ts">
	import { bundleSizes } from '$lib/stores/settingsStore';
	import { BundleSelected } from '$lib/stores/bundleStore';
</script>

<div class="container flex-col py-4 px-4 space-y-3">
	<h1 class="py-4">About LibSizer</h1>

	<p class="max-w-lg">
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, molestiae libero temporibus
		quis ea quisquam hic minus perferendis vero quia? Repellendus quibusdam nostrum tempore,
		assumenda dolor nihil doloremque fugiat nesciunt?
	</p>
	<pre>{JSON.stringify(bundleSizes($BundleSelected), null, 2)}</pre>
</div>
