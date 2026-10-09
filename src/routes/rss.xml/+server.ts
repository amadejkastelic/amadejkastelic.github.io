import { site } from '#lib'
import { posts } from '#lib/posts'

export const prerender = true

function escapeXml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;')
}

export async function GET() {
	const items = posts
		.map((post) => {
			const url = `${site.url}/blog/${post.slug}`
			return [
				'\t\t<item>',
				`\t\t\t<title>${escapeXml(post.title)}</title>`,
				`\t\t\t<link>${url}</link>`,
				`\t\t\t<guid isPermaLink="true">${url}</guid>`,
				`\t\t\t<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
				`\t\t\t<description>${escapeXml(post.description)}</description>`,
				'\t\t</item>'
			].join('\n')
		})
		.join('\n')

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(site.name)}</title>
		<link>${site.url}</link>
		<description>${escapeXml(`Writing by ${site.name} about Nix, NixOS, homelab infrastructure, and software engineering.`)}</description>
		<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
${items}
	</channel>
</rss>
`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8'
		}
	})
}
