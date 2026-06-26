<script lang="ts">
	import { page } from '$app/stores'
	import { site } from '$lib'

	let {
		title,
		description,
		image = '/me.jpg',
		type = 'website'
	}: {
		title: string
		description: string
		image?: string
		type?: 'website' | 'article'
	} = $props()

	const fullTitle = $derived(title === site.name ? title : `${title} · ${site.name}`)
	const url = $derived(`${site.url}${$page.url.pathname}`)
	const imageUrl = $derived(image.startsWith('http') ? image : `${site.url}${image}`)
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
</svelte:head>
