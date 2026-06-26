<script lang="ts">
	import { page } from '$app/stores'

	const links = [
		{ href: '/', label: 'Home' },
		{ href: '/about', label: 'About' },
		{ href: '/cv', label: 'CV' }
	]

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/'
		return pathname === href || pathname.startsWith(`${href}/`)
	}
</script>

<nav>
	{#each links as link (link.href)}
		<a
			href={link.href}
			class:active={isActive(link.href, $page.url.pathname)}>{link.label}</a>
	{/each}
</nav>

<style>
	nav {
		display: flex;
		gap: 1.25rem;
	}
	a {
		color: inherit;
		text-decoration: none;
		opacity: 0.6;
	}
	a:hover,
	a.active {
		opacity: 1;
		color: var(--hover-color);
	}
</style>
