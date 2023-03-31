<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { sizes } from '$lib/settingsStore';
	let popupSettings: PopupSettings = {
		event: 'click',
		target: 'settingPopup',
		placement: 'right'
	};
</script>

<button class="btn variant-filled btn-sm" use:popup={popupSettings}>Config </button>
<div class="card p-4 min-w-[16em] z-20 shadow" data-popup="settingPopup">
	<div class="card-header"><strong>Tailles :</strong></div>
	<section class="p-4 min-h-[180px] max-h-16">
		<ul>
			{#each sizes as size}
				<li>{size.name} <span>- {size.width} × {size.height}</span></li>
			{/each}
		</ul>
	</section>
	<div class="card-footer"><button class="btn variant-filled">Apply</button></div>
	<div class="arrow" />
</div>
