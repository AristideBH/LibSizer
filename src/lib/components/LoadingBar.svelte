<script lang="ts">
	import { navigating } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { ProgressBar } from '@skeletonlabs/skeleton';

	import { loading } from '$lib/stores/imagesStore';
	import { scrollToTop } from '$lib/utils';
	$: if ($navigating) scrollToTop();
</script>

{#if $loading}
	<div
		transition:slide|local
		class="progress-bar w-full fixed bottom-0 z-50 left-0 right-0 pointer-events-none"
	>
		<ProgressBar rounded="rounded-none" meter="bg-primary-500" class="pointer-events-none" />
	</div>
{/if}
