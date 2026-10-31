const raws = import.meta.glob('/src/posts/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
}) as Record<string, string>

export function stripFrontmatter(markdown: string): string {
	return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').trimStart()
}

export function getRawPost(slug: string): string | undefined {
	const raw = raws[`/src/posts/${slug}.md`]
	return raw ? stripFrontmatter(raw) : undefined
}
