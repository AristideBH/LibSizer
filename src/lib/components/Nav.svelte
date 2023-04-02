<script>
	const menu = [
		{
			url: '/',
			text: 'Home'
		},
		{
			url: '/editor',
			text: 'Editor'
		},
		{
			url: '/croppr',
			text: 'Croppr'
		}
	];
</script>

<nav>
	<ul class=" flex flex-nowrap gap-4">
		{#each menu as item}
			<li><a href={item.url}>{item.text}</a></li>
		{/each}
	</ul>
</nav>
