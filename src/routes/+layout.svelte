<script lang="ts">
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'
	import ThemeToggle from '../components/ThemeToggle.svelte'
	import '@fontsource/noto-sans'
	import '@fontsource/noto-sans/700.css'
	import { theme } from '../themes'

	let { children }: { children: any } = $props()
</script>

	<div
		class="layout"
		style:background-color={$theme.colors.base.hex}
		style:color={$theme.colors.text.hex}
	>
		<header
			class="topbar"
			style:background-color={`color-mix(in srgb, ${$theme.colors.base.hex} 82%, transparent)`}
		>
			<Nav />
			<ThemeToggle />
		</header>
		<main>
			{@render children()}
		</main>
		<Footer />
</div>

<svelte:head>
	<meta name="theme-color" content={$theme.colors.base.hex} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html `<style>:root { --hover-color: ${$theme.colors.blue.hex}; } html, body { background-color: ${$theme.colors.base.hex}; }</style>`}
</svelte:head>

<style>
	:global(body) {
		font-family: 'Noto Sans', sans-serif;
		margin: 0;
		padding: 0;
	}
	:global(a) {
		color: inherit;
		text-decoration: underline;
		text-underline-offset: 0.3em;
	}
	.layout {
		min-height: 100vh;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}
	.topbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.75rem 1rem;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(128, 128, 128, 0.12);
	}
	main {
		flex: 1;
		padding: 4rem 20px 20px;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}
	@media (max-width: 600px) {
		main {
			padding: 4rem 10px 10px;
		}
	}
</style>
