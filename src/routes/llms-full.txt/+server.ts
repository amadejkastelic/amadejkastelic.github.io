import { site } from '#lib'
import { posts } from '#lib/posts'
import { getRawPost } from '#lib/raw-posts'

export const prerender = true

export function GET() {
	const sections = posts.map((post) => {
		const body = getRawPost(post.slug) ?? ''
		const meta = [
			`- URL: ${site.url}/blog/${post.slug}`,
			`- Markdown: ${site.url}/blog/${post.slug}.md`,
			`- Date: ${post.date}`,
			...(post.tags ? [`- Tags: ${post.tags.join(', ')}`] : [])
		]
		return `# ${post.title}\n\n${meta.join('\n')}\n\n${body}`
	})

	const body = [
		`# ${site.name} — complete blog contents`,
		'',
		`Full text of every blog post on ${site.url}, in Markdown, newest first.`,
		'',
		'---',
		'',
		sections.join('\n\n---\n\n'),
		''
	].join('\n')

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	})
}
