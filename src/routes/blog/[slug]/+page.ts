import { error } from '@sveltejs/kit'
import { getPost, posts } from '#lib/posts'
import type { EntryGenerator, PageLoad } from './$types'

export const prerender = true

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }))

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug)
	if (!post) error(404, 'Post not found')
	const { default: Post, metadata } = post
	return { Post, metadata }
}
