import { error } from '@sveltejs/kit'
import { posts } from '#lib/posts'
import { getRawPost } from '#lib/raw-posts'
import type { EntryGenerator, RequestHandler } from './$types'

export const prerender = true

export const entries: EntryGenerator = () => posts.map((post) => ({ file: `${post.slug}.md` }))

export const GET: RequestHandler = ({ params }) => {
	const slug = params.file.replace(/\.md$/, '')
	const markdown = getRawPost(slug)
	if (!markdown) error(404, 'Post not found')

	return new Response(markdown, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	})
}
