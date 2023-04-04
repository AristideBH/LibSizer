<script lang="ts">
	import img from '$lib/assets/img2.jpg';
	import { toastStore } from '@skeletonlabs/skeleton';
	import { tErr } from '$lib/strings';
	import { library, selected } from '$lib/imagesStore';
	$: currentPhoto = library.getById($selected, $library);

	let imgRef: HTMLImageElement, cropper: Cropper | null, outputParent: HTMLDivElement;

	const initCropper = () => {
		cropper = new Cropper(imgRef, {
			aspectRatio: 1.2,
			viewMode: 3,
			guides: false,
			autoCropArea: 1,
			zoomable: false,
			dragMode: 'none'
		});
	};

	const cropImage = () => {
		if (cropper) {
			downloadFile(exportCroppedImage(150, 180));
		} else {
			toastStore.trigger(tErr);
		}
	};

	const downloadFile = (dataURL: string) => {
		const downloadLink = document.createElement('a');
		downloadLink.download = 'image';
		downloadLink.href = dataURL;
		outputParent.appendChild(downloadLink);
		downloadLink.click();
		downloadLink.remove();
	};

	const exportCroppedImage = (width: number, height: number) => {
		if (cropper) {
			let canvas = cropper.getCroppedCanvas({
				width: width,
				height: height
			});

			let dataURL = canvas.toDataURL('image/jpeg');
			return dataURL;
		}
	};
</script>

<div class="max-w-xl mx-auto">
	{#if currentPhoto}
		<img src={currentPhoto.data} alt="" bind:this={imgRef} />
	{/if}
	<button class="btn variant-filled" on:click={cropImage}>Export</button>
	<div bind:this={outputParent} />
</div>

<style>
	img {
		display: block;
		max-width: 100%;
	}
</style>
