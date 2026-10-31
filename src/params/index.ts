import { defineParams } from '@sveltejs/kit/params'

export const params = defineParams({
	// Matches blog post slugs without an extension, e.g. `oblak-nixos-nas`
	post: (param) => (/^[a-z0-9-]+$/.test(param) ? param : undefined),
	// Matches blog post slugs with a `.md` suffix, e.g. `oblak-nixos-nas.md`
	markdown: (param) => (/^[a-z0-9-]+\.md$/.test(param) ? param : undefined)
})
