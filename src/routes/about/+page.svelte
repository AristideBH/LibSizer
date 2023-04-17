<script lang="ts">
	export let data;
</script>

<div class="container flex-col py-4 px-4 space-y-3">
	<h1 class="py-4">
		About LibSizer
		<span class="text-sm">{data.appVersion}</span>
	</h1>
	<div class="max-w-prose space-y-2">
		<p>
			LibSizer is a tool created to simplify your work when you need to crop mutliples images to a
			specific list of format/dimensions.
		</p>
		<p>
			Currently, the tool only supports Zip bundling for one photo at the time, and for three sets
			of dimensions : <code>Standard</code>, <code>Mousquetaires</code> and <code>Visa</code>.
		</p>

		<h2 class="pt-4 pb-2">Usage</h2>
		<ol class="list-decimal pl-6 space-y-1">
			<li>Choose your dimensions set in the header or in the setting modal.</li>
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
	</div>

	<!-- <pre>{JSON.stringify(bundleSizes($BundleSelected), null, 2)}</pre> -->
</div>
