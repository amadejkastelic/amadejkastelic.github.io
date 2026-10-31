<script lang="ts">
	import { page } from '$app/state'
	import { site } from '#lib'

	let {
		title,
		description,
		image = '/me.jpg',
		type = 'website',
		jsonLd
	}: {
		title: string
		description: string
		image?: string
		type?: 'website' | 'article'
		jsonLd?: Record<string, unknown> | Record<string, unknown>[]
	} = $props()

	const fullTitle = $derived(title === site.name ? title : `${title} · ${site.name}`)
	const url = $derived(`${site.url}${page.url.pathname}`)
	const imageUrl = $derived(image.startsWith('http') ? image : `${site.url}${image}`)
	// Escaping "<" keeps embedded JSON from breaking out of the script tag.
	const json = $derived(jsonLd === undefined ? undefined : JSON.stringify(jsonLd).replaceAll('<', '\\u003c'))
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	{#if json !== undefined}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html `<script type="application/ld+json">${json}</script>`}
	{/if}
</svelte:head>
