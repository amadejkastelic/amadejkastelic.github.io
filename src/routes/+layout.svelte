<script lang="ts">
	import ThemeToggle from '../components/ThemeToggle.svelte';
	import '@fontsource/noto-sans';
	import '@fontsource/noto-sans/700.css';
	import { theme } from '../themes';

	let { children } = $props<{ children: any }>();
</script>

<div
	class="layout"
	style:background-color={$theme.colors.base.hex}
	style:color={$theme.colors.text.hex}
>
	<ThemeToggle />
	<main>
		{@render children()}
	</main>
</div>

<svelte:head>
	{@html `
    <style>
      :root {
        --hover-color: ${$theme.colors.blue.hex};
      }
    </style>
  `}
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
		display: flex;
		flex-direction: column;
	}
	main {
		flex: 1;
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		box-sizing: border-box;
	}
	@media (max-width: 600px) {
		main {
			padding: 10px;
		}
	}
</style>
