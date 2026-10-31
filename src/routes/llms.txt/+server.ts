import { site } from '#lib'
import { posts } from '#lib/posts'

export const prerender = true

export function GET() {
	const example = posts.at(-1)?.slug ?? 'example-post'
	const body = [
		`# ${site.name}`,
		'',
		`> Personal website and blog of ${site.name}, ${site.role} at ${site.company}.`,
		'> Writing about Nix, NixOS, homelab infrastructure, and software engineering.',
		'',
		'Notes for agents: this site is fully static and readable without JavaScript.',
		`Every blog post is also served as raw Markdown by appending ".md" to its URL, e.g. ${site.url}/blog/${example}.md.`,
		'',
		'## Pages',
		'',
		`- [Home](${site.url}/): introduction and photo`,
		`- [Blog](${site.url}/blog): index of all posts`,
		`- [About](${site.url}/about): about me, including Nix/NixOS consulting`,
		`- [CV](${site.url}/cv): curriculum vitae, also downloadable as [PDF](${site.url}/cv.pdf)`,
		'',
		'## Files',
		'',
		`- [llms-full.txt](${site.url}/llms-full.txt): all blog posts in full, as Markdown`,
		`- [rss.xml](${site.url}/rss.xml): full-text RSS feed`,
		`- [sitemap.xml](${site.url}/sitemap.xml): XML sitemap`,
		'',
		'## Blog posts',
		'',
		...posts.map(
			(post) =>
				`- [${post.title}](${site.url}/blog/${post.slug}) (${post.date}${post.tags ? `; ${post.tags.join(', ')}` : ''}): ${post.description}`
		)
	].join('\n')

	return new Response(`${body}\n`, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
