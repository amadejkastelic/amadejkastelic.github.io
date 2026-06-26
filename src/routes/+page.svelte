<script>
	import Home from '../components/Home.svelte'
	import Seo from '../components/Seo.svelte'
	import { site } from '$lib'
</script>

<Seo
	title={site.name}
	description={`${site.name} - ${site.role} at ${site.company}.`}
/>

<Home />
