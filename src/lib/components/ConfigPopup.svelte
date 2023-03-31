<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { sizes } from '$lib/settingsStore';
	import Icon from '@iconify/svelte';
	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'settingPopup',
		placement: 'bottom-end'
	};
</script>

<button class="btn variant-filled btn-icon" use:popup={popupSettings}>
	<span>
		<Icon icon="mdi:cog" />
	</span>
</button>
<div class="card p-4 min-w-[26em] z-20 shadow" data-popup="settingPopup">
	<div class="card-header"><strong>Tailles :</strong></div>
	<section class="p-4 min-h-[260px] max-h-32">
		<ul class="flex flex-col gap-1">
			{#each sizes as size}
				<li><strong>{size.name}</strong> - {size.width} × {size.height}</li>
			{/each}
		</ul>
	</section>
	<div class="card-footer"><button class="btn variant-filled">Apply</button></div>
	<div class="arrow" />
</div>
