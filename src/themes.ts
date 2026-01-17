import { type CatppuccinFlavor, flavors } from '@catppuccin/palette'
import { derived, writable } from 'svelte/store'
import { browser } from '$app/environment'

function getInitialTheme(): 'latte' | 'mocha' {
	if (browser) {
		const savedTheme = localStorage.getItem('theme')
		if (savedTheme) {
			return savedTheme as 'latte' | 'mocha'
		}
		if (window.matchMedia('(prefers-color-scheme: light)').matches) {
			return 'latte'
		}
	}
	return 'mocha'
}

const themeStore = writable<'latte' | 'mocha'>(getInitialTheme())

export const theme = derived<typeof themeStore, CatppuccinFlavor>(
	themeStore,
	($theme) => flavors[$theme]
)

if (browser) {
	themeStore.subscribe((value) => {
		localStorage.setItem('theme', value)
		document.documentElement.classList.toggle('dark', value === 'mocha')
	})
}

export function toggleTheme() {
	themeStore.update((current) => (current === 'latte' ? 'mocha' : 'latte'))
}
