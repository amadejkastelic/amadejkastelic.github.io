import { site } from '#lib'
import { posts } from '#lib/posts'

export const prerender = true

export function GET() {
	const staticRoutes = ['', '/blog', '/about', '/cv']
	const urls = [
		...staticRoutes.map((path) => ({ path, lastmod: undefined as string | undefined })),
		...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.date }))
	]

	const entries = urls.map(({ path, lastmod }) =>
		[
			'\t\t<url>',
			`\t\t\t<loc>${site.url}${path}</loc>`,
			lastmod ? `\t\t\t<lastmod>${lastmod}</lastmod>` : '',
			'\t\t</url>'
		]
			.filter(Boolean)
			.join('\n')
	)

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	})
}
