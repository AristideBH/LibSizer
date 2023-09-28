<script lang="ts">
	import { page } from '$app/stores';
	import * as Alert from '$lib/components/ui/alert';
	import { AlertCircle } from 'lucide-svelte';
</script>

<div class="container col-span-full">
	<Alert.Root>
		<AlertCircle class="h-4 w-4" />
		<Alert.Title>{$page.status}</Alert.Title>
		<Alert.Description>{$page.error?.message}</Alert.Description>
	</Alert.Root>
</div>
