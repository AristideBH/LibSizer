<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container col-span-full">
	<h1>{$page.status}</h1>
	<div class="lead">{$page.error?.message}</div>
</div>
