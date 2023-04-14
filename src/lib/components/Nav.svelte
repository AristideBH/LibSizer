<script>
	const menu = [
		{ url: '/about', text: 'About' },
		{ url: '/dev', text: 'Dev' }
	];
</script>

<nav>
	<ul class=" flex flex-nowrap gap-3">
		{#each menu as item}
			<li><a href={item.url}>{item.text}</a></li>
		{/each}
	</ul>
</nav>
