<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<Button disabled variant="ghost">
	<Loader2 class="mr-2 h-4 w-4 animate-spin" />
	Please wait
</Button>
