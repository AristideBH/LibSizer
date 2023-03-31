<script>
	import { onMount } from 'svelte';
	import { afterUpdate } from 'svelte';

	let imageSrc =
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABPSURBVBhXAUQAu/8BeFc+/9fd5ADT4O4ABAH+AALo5+cAAv/9AAUC/wD/AAAAAv38/QDy8vMADwoGACIcFgAE9Pf4ABQUEgAZCA0AEhEPAAmoGMjTWC6oAAAAAElFTkSuQmCC'; // base64 image string

	function drawImage() {
		const canvas = document.querySelector('canvas');
		const ctx = canvas.getContext('2d');
		const image = new Image();
		image.src = imageSrc;
		image.onload = () => {
			canvas.width = image.width;
			canvas.height = image.height;
			ctx.drawImage(image, 0, 0);
		};
	}

	onMount(() => {
		drawImage();
	});
</script>

<canvas />

<style>
	canvas {
		border: 1px solid black;
		min-width: 120px;
	}
</style>
