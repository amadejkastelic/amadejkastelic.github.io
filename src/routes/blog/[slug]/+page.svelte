<script lang="ts">
	import Seo from '../../../components/Seo.svelte'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	const formatDate = (date: string) =>
		new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
</script>

<Seo title={data.metadata.title} description={data.metadata.description} type="article" />

<article class="post">
	<h1>{data.metadata.title}</h1>
	<time class="meta" datetime={data.metadata.date}>{formatDate(data.metadata.date)}</time>

	<div class="prose">
		<data.Post />
	</div>

	<a class="back" href="/blog">← Back to all posts</a>
</article>

<style>
	.post {
		max-width: 720px;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
	}
	.post h1 {
		font-weight: 700;
		margin-bottom: 0.5rem;
	}
	.meta {
		display: block;
		font-size: 0.85rem;
		opacity: 0.6;
		margin-bottom: 2rem;
	}
	.back {
		display: inline-block;
		margin-top: 3rem;
		text-decoration: none;
	}
	.back:hover {
		color: var(--hover-color);
	}

	.prose :global(p) {
		line-height: 1.7;
		margin: 0 0 1.25rem;
	}
	.prose :global(h2) {
		font-weight: 700;
		font-size: 1.3rem;
		margin: 2.5rem 0 1rem;
	}
	.prose :global(h3) {
		font-weight: 700;
		font-size: 1.1rem;
		margin: 2rem 0 0.75rem;
	}
	.prose :global(ul),
	.prose :global(ol) {
		padding-left: 1.5rem;
		margin: 0 0 1.25rem;
	}
	.prose :global(li) {
		line-height: 1.7;
		margin-bottom: 0.5rem;
	}
	.prose :global(a) {
		color: var(--hover-color);
	}
	.prose :global(blockquote) {
		margin: 0 0 1.25rem;
		padding: 0.25rem 0 0.25rem 1.25rem;
		border-left: 3px solid var(--hover-color);
		opacity: 0.85;
	}
	.prose :global(img) {
		max-width: 100%;
		height: auto;
		border-radius: 6px;
		border: 1px solid rgba(128, 128, 128, 0.2);
		margin: 0.5rem 0 1.25rem;
	}
	.prose :global(table) {
		border-collapse: collapse;
		margin: 0 0 1.5rem;
		font-size: 0.9rem;
	}
	.prose :global(th),
	.prose :global(td) {
		border: 1px solid rgba(128, 128, 128, 0.2);
		padding: 0.4rem 0.75rem;
		text-align: left;
	}
	.prose :global(th) {
		font-weight: 700;
	}
	.prose :global(code) {
		font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas,
			'DejaVu Sans Mono', monospace;
		font-size: 0.875em;
	}
	.prose :global(:not(pre) > code) {
		background: rgba(128, 128, 128, 0.15);
		border-radius: 4px;
		padding: 0.15em 0.4em;
	}

	.prose :global(pre.shiki) {
		overflow-x: auto;
		padding: 1rem 1.25rem;
		border-radius: 6px;
		border: 1px solid rgba(128, 128, 128, 0.2);
		background: rgba(128, 128, 128, 0.12);
		font-size: 0.85rem;
		line-height: 1.6;
		margin: 0 0 1.5rem;
	}
	.prose :global(pre.shiki span) {
		color: var(--shiki-light);
	}
	:global(.dark) .prose :global(pre.shiki span) {
		color: var(--shiki-dark);
	}
</style>
