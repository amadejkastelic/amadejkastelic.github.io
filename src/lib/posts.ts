import type { Component } from 'svelte'

export type PostMetadata = {
	title: string
	description: string
	date: string
	tags?: string[]
}

export type PostModule = {
	default: Component
	metadata: PostMetadata
}

const modules = import.meta.glob('/src/posts/*.md', {
	eager: true
}) as Record<string, PostModule>

export const posts = Object.entries(modules)
	.map(([path, module]) => ({
		slug: path.slice('/src/posts/'.length, -'.md'.length),
		...module.metadata
	}))
	.sort((a, b) => (a.date < b.date ? 1 : -1))

export function getPost(slug: string): PostModule | undefined {
	return modules[`/src/posts/${slug}.md`]
}
