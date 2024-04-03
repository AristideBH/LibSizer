<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<Button disabled variant="ghost">
	<Loader2 class="w-4 h-4 mr-2 animate-spin" />
	Please wait
</Button>
