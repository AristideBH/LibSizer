<!-- src/routes/index.svelte -->

<script lang="ts">
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';
	import { redirect } from '@sveltejs/kit';

	const t: ToastSettings = {
		message: 'Image chargée avec succès',
		autohide: true
	};

	async function handleSubmit(event) {
		const files = event.target.elements.file.files;
		let images = [];

		if (typeof localStorage !== 'undefined') {
			images = JSON.parse(localStorage.getItem('images') || '[]');
		}

		for (let i = 0; i < files.length; i++) {
			const reader = new FileReader();
			reader.addEventListener('load', () => {
				images.push({ title: files[i].name, image: reader.result });
				if (typeof localStorage !== 'undefined') {
					localStorage.setItem('images', JSON.stringify(images));
				}
				toastStore.trigger(t);
				// console.log(`Image ${i + 1} added to LocalStorage`);
			});
			reader.readAsDataURL(files[i]);
		}
		// throw redirect(302, '/editor');
	}
</script>

<form on:submit|preventDefault={handleSubmit} class="card flex p-4 items-end justify-between">
	<label for="file" class="flex flex-col">
		Chargez un ou plusieurs fichier(s):
		<input type="file" name="file" accept="image/*" multiple class="pt-2" /></label
	>
	<button type="submit" class="btn variant-filled-primary">Submit</button>
</form>

<Toast />
