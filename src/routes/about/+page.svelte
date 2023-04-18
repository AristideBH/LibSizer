<script lang="ts">
	export let data;
</script>

<div class="container flex-col py-4 px-4 space-y-3">
	<h1 class="py-4">
		About LibSizer
		<span class="text-sm">{data.appVersion}</span>
	</h1>
	<div class="flex flex-col">
		<p>
			LibSizer is a tool created to simplify your work when you need to crop mutliples images to a
			specific list of format/dimensions.
		</p>
		<p>
			Currently, the tool only supports Zip bundling for one photo at the time, and for three sets
			of dimensions : <code>Standard</code>, <code>Mousquetaires</code> and <code>Visa</code>.
		</p>
	</div>

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
		<div class="flex flex-col w-full">
			<h2 class="pt-4 pb-2">Roadmap</h2>
			<fieldset class="space-y-1">
				<div class="flex gap-2 items-baseline">
					<input type="checkbox" id="cropSave" name="cropSave" disabled checked />
					<label for="cropSave"
						>Save cropping metadatas for later exports <sub>(partial-WIP)</sub>
						<br />
						If metadatas are present, load them in InitCropper()</label
					>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="nextCrop" name="nextCrop" disabled />
					<label for="nextCrop">Switch to next picture in library upon saving metadatas</label>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="navArrows" name="navArrows" disabled checked />
					<label for="navArrows"
						>Arrows for next and previous photos in library <sub>(0.2.5)</sub></label
					>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="savePopup" name="savePopup" disabled />
					<label for="savePopup">Popup upon page/photos change if metadatas are not saved</label>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="listStatus" name="listStatus" disabled checked />
					<label for="listStatus"
						>Add a status icon per image in the library <sub>(0.2.4)</sub></label
					>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="multiExport" name="multiExport" disabled />
					<label for="multiExport"
						>Allow for export all images with "edited" status in one go
					</label>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="cursorLoading" name="cursorLoading" disabled />
					<label for="cursorLoading">Add a waiting state to the cursor upon image load </label>
				</div>
				<div class="flex gap-2 items-center">
					<input type="checkbox" id="resetCropperEl" name="resetCropperEl" disabled checked />
					<label for="resetCropperEl"
						>Add a 'reset crop' button to cropping section <sub>(0.2.5)</sub></label
					>
				</div>
			</fieldset>
		</div>
	</section>

	<!-- <pre>{JSON.stringify(bundleSizes($BundleSelected), null, 2)}</pre> -->
</div>
