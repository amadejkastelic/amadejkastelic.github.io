<script lang="ts">
	import Seo from '../../components/Seo.svelte'
	import { posts } from '#lib/posts'
	import { site } from '#lib'

	const formatDate = (date: string) =>
		new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Blog',
		name: `${site.name} · Blog`,
		url: `${site.url}/blog`,
		description: `Writing by ${site.name} about Nix, NixOS, homelab infrastructure, and software engineering.`,
		publisher: { '@type': 'Person', name: site.name, url: site.url },
		blogPost: posts.map((post) => ({
			'@type': 'BlogPosting',
			headline: post.title,
			description: post.description,
			url: `${site.url}/blog/${post.slug}`,
			datePublished: post.date
		}))
	}
</script>

<Seo
	title="Blog"
	description={`Writing by ${site.name} about Nix, NixOS, homelab infrastructure, and software engineering.`}
	{jsonLd}
/>

<section class="blog">
	<h1>Blog</h1>
	<ul class="posts">
		{#each posts as post (post.slug)}
			<li>
				<a href={`/blog/${post.slug}`}>{post.title}</a>
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<p>{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.blog {
		max-width: 640px;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
	}
	.blog h1 {
		font-weight: 700;
		margin-bottom: 1.5rem;
	}
	.posts {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.posts li {
		padding: 1.25rem 0;
		border-bottom: 1px solid rgba(128, 128, 128, 0.2);
	}
	.posts li:first-child {
		padding-top: 0;
	}
	.posts a {
		font-weight: 700;
		text-decoration: none;
	}
	.posts a:hover {
		color: var(--hover-color);
	}
	.posts time {
		display: block;
		margin-top: 0.25rem;
		font-size: 0.85rem;
		opacity: 0.6;
	}
	.posts p {
		margin: 0.5rem 0 0;
		line-height: 1.6;
	}
</style>
