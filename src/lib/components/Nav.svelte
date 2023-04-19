<script lang="ts">
	import Icon, { type IconifyIcon } from '@iconify/svelte';

	interface NavItem {
		url: string;
		text: string;
		newTab: boolean;
		icon?: IconifyIcon;
	}

	const menu: NavItem[] = [
		{
			url: '/about',
			text: 'About',
			newTab: false,
			icon: 'solar:info-circle-linear' as unknown as IconifyIcon
		},
		{
			url: '/datatable',
			text: 'Datatable',
			newTab: false,
			icon: 'solar:database-linear' as unknown as IconifyIcon
		},
		{
			url: 'https://github.com/AristideBH/LibSizer',
			text: 'Github project',
			newTab: true,
			icon: 'ph:github-logo' as unknown as IconifyIcon
		}
	];

	const target = (item: NavItem) => (item?.newTab == true ? '_blank' : '');
</script>

<nav>
	<ul class=" flex flex-nowrap gap-4">
		{#each menu as item}
			<li>
				<a href={item.url} target={target(item)} class="inline-flex items-center gap-1">
					{#if item.icon}
						<span><Icon icon={item.icon} /></span>
					{/if}
					{item.text}
				</a>
			</li>
		{/each}
	</ul>
</nav>
