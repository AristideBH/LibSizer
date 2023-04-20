<script lang="ts">
	import { library, selected } from '$lib/stores/imagesStore';

	import WelcomeScreen from '$lib/components/WelcomeScreen.svelte';
	import CropperToolbar from '$lib/components/CropperToolbar.svelte';
	import CropperCanvas from '$lib/components/CropperCanvas.svelte';

	$: currentPhoto = library.getById($selected, $library);
</script>

{#if currentPhoto}
	<CropperToolbar />
	<CropperCanvas />
{:else}
	<WelcomeScreen />
{/if}
