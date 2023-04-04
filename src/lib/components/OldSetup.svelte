<div class="grid customGrid grid-flow-row-dense p-4 w-full">
	<label for="ratio-{ratio.ratio}-x" class="flex flex-col items-center col-start-1 col-end-2 pb-2">
		<span>X</span>
		<input type="range" name="ratio-{ratio.ratio}-x" id="ratio-{ratio.ratio}-x" />
	</label>
	<label
		for="ratio-{ratio.ratio}-y"
		class="flex flex-col items-center col-start-2 col-end-3 row-start-2 row-end-3 justify-center w-[1.5rem] pl-4"
	>
		<span class="">Y</span>
		<input
			type="range"
			name="ratio-{ratio.ratio}-y"
			id="ratio-{ratio.ratio}-y"
			class="h-full w-fit"
			style="-webkit-appearance: slider-vertical"
		/>
	</label>

	<img
		class="imgWrapper object-cover w-full border border-surface-400 col-start-1 col-end-2 row-start-2 row-end-3 text-center"
		src={currentPhoto.data}
		alt=""
		style:--src={currentPhoto.data}
		style:--aspect-r={ratio.ratio}
	/>

	<!-- <div
        class="imgWrapper object-cover w-full border border-surface-400 col-start-1 col-end-2 row-start-2 row-end-3 text-center"
        style:--src={currentPhoto.data}
        style:--aspect-r={ratio.ratio}
    >
        [...photo...]
    </div> -->
</div>

<style>
	.imgWrapper {
		aspect-ratio: var(--aspect-r);
	}

	.customGrid {
		grid-template-rows: 1fr auto;
		grid-template-columns: 1fr auto;
	}
</style>
