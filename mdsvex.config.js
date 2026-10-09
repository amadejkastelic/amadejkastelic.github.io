import { codeToHtml } from 'shiki'

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],
	highlight: {
		highlighter: async (code, lang) => {
			const themes = { light: 'catppuccin-latte', dark: 'catppuccin-mocha' }
			let html
			try {
				html = await codeToHtml(code, { lang: lang ?? 'text', themes, defaultColor: false })
			} catch {
				html = await codeToHtml(code, { lang: 'text', themes, defaultColor: false })
			}
			const escaped = html.replaceAll('\\', '\\\\').replaceAll('`', '\\`').replaceAll('${', '\\${')
			return `{@html \`${escaped}\`}`
		}
	}
}

export default config
