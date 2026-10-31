<script>
	import Home from '../components/Home.svelte'
	import Seo from '../components/Seo.svelte'
	import { site } from '#lib'

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: site.name,
		jobTitle: site.role,
		worksFor: { '@type': 'Organization', name: site.company },
		url: site.url,
		email: `mailto:${site.email}`,
		image: `${site.url}/me.jpg`,
		sameAs: [site.github, site.linkedin]
	}
</script>

<Seo
	title={site.name}
	description={`${site.name} - ${site.role} at ${site.company}.`}
	{jsonLd}
/>

<Home />
