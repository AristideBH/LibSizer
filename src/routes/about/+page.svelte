<script lang="ts">
	export let data;
</script>

<div class="container flex-col py-4 px-4 space-y-3">
	<h1 class="py-4">
		About LibSizer
		<span class="text-sm"><div class="badge variant-ghost-primary">{data.appVersion}</div></span>
	</h1>
	<div class="flex flex-col max-w-4xl prose">
		<!-- <p>
			LibSizer is a tool created to simplify your work when you need to crop mutliples images to a
			specific list of format/dimensions.
		</p> -->

		<p class="mb-2">
			Do you need to crop multiple images to specific formats or dimensions? LibSizer is the tool
			for you!
		</p>
		<p>
			LibSizer is a simple and powerful tool that lets you crop your photos library to predefined
			dimensions in just a few clicks.
		</p>
		<p>Try it now for free and see how easy it is to resize your library!</p>
	</div>

	<hr />

	<section class="w-full flex flex-col lg:flex-row gap-10">
		<div class="flex flex-col w-full">
			<h2 class="pt-4 pb-2">Usage</h2>
			<ol class="list-decimal pl-6 space-y-1">
				<li>Choose your dimensions set in the setting modal.</li>
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
		<div class="flex flex-col min-w-[320px]">
			<h2 class="pt-4 pb-2">Thanks to</h2>
			<ol class="list-disc pl-6 space-y-1">
				<li>
					<a href="https://kit.svelte.dev/" target="_blank">Sveltekit</a> for their awesome framework
				</li>
				<li><a href="https://www.skeleton.dev/" target="_blank">Skeleton</a> for the UI Toolkit</li>
				<li>
					<a href="https://fengyuanchen.github.io/cropperjs/" target="_blank">CropperJS</a>
					for the cropping JS library
				</li>
				<li>
					<a href="https://icon-sets.iconify.design/" target="_blank">Iconify</a> for all the used icons
				</li>
			</ol>
		</div>
		<!-- <div class="flex flex-col w-full">
			<h2 class="pt-4 pb-2">Roadmap</h2>
			<fieldset class="space-y-1">
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="cursorLoading" name="cursorLoading" disabled />
					<label for="cursorLoading"
						>Add a waiting state upon image load and <i>selection</i>
						<sub>(partial-WIP)</sub></label
					>
				</div>

				<div class="flex gap-2 items-center">
					<input type="checkbox" id="nextCrop" name="nextCrop" disabled />
					<label for="nextCrop">Switch to next picture in library upon saving metadatas</label>
				</div>

				<div class="flex gap-2 items-center">
					<input type="checkbox" id="savePopup" name="savePopup" disabled />
					<label for="savePopup">Popup upon page/photos change if metadatas are not saved</label>
				</div>

				<div class="flex gap-2 items-center">
					<input type="checkbox" id="multiExport" name="multiExport" disabled />
					<label for="multiExport"
						>Allow for export all images with "edited" status in one go
					</label>
				</div>
			</fieldset>
		</div> -->
	</section>

	<!-- <pre>{JSON.stringify(bundleSizes($BundleSelected), null, 2)}</pre> -->
</div>
