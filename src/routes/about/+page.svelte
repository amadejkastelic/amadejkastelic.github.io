<script lang="ts">
	import Seo from '../../components/Seo.svelte'
	import { site } from '$lib'
</script>

<Seo title="About" description={`About ${site.name} - ${site.role} at ${site.company}.`} />

<article class="about">
	<h1>About</h1>
	<p>
		Hi, I'm Amadej - a {site.role} at <a href="https://www.servicenow.com/" target="_blank"
			>{site.company}</a
		>. I build software for a living and tinker with tooling, reproducible builds, and side
		projects for fun.
	</p>
	<p>
		I care about clean, maintainable code, sensible defaults, and good developer experience.
		Lately I've been spending time with Nix, Go, and Rust.
	</p>

	<section class="consulting">
		<h2>Consulting</h2>
	<p>
		I help tech teams adopt Nix and NixOS — building reproducible environments, managing
		infrastructure as code, and designing systems that are easier to run and maintain. Less
		manual work, more reliable delivery.
	</p>
		<p>
			If that sounds useful, <a href="mailto:{site.email}">get in touch</a>.
		</p>
	</section>

	<p>This site is a small home on the web for my writing and work.</p>
</article>

<style>
	.about {
		max-width: 640px;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
	}
	.about h1 {
		font-weight: 700;
		margin-bottom: 1.5rem;
	}
	.about h2 {
		font-weight: 700;
		font-size: 1.15rem;
		margin: 2.5rem 0 0.75rem;
	}
	.about p {
		line-height: 1.7;
		margin-bottom: 1.25rem;
	}
</style>
