<script lang="ts">
import { theme, toggleTheme } from '../themes'
import { SunLightIcon } from '@indaco/svelte-iconoir/sun-light'
import { MoonSatIcon } from '@indaco/svelte-iconoir/moon-sat'
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	{#if $theme.dark}
		<SunLightIcon size="xl" />
	{:else}
		<MoonSatIcon size="xl" />
	{/if}
</button>

<style>
	.theme-toggle {
		background: none;
		border: none;
		cursor: pointer;
		color: inherit;
	}
	.theme-toggle:hover {
		color: var(--hover-color);
	}
</style>
