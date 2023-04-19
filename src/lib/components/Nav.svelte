<script lang="ts">
	interface NavItem {
		url: string;
		text: string;
		newTab: boolean;
	}

	const menu: NavItem[] = [
		{ url: '/about', text: 'About', newTab: false },
		{ url: '/datatable', text: 'Datatable', newTab: false },
		{ url: 'https://github.com/AristideBH/LibSizer', text: 'Github project', newTab: true }
	];

	const target = (item: NavItem) => (item?.newTab == true ? '_blank' : '');
</script>

<nav>
	<ul class=" flex flex-nowrap gap-3">
		{#each menu as item}
			<li><a href={item.url} target={target(item)}>{item.text}</a></li>
		{/each}
	</ul>
</nav>
