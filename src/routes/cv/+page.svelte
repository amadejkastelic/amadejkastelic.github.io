<script lang="ts">
	import Seo from '../../components/Seo.svelte'
	import { site } from '$lib'
	import { NavArrowLeftIcon } from '@indaco/svelte-iconoir/nav-arrow-left'
	import { NavArrowRightIcon } from '@indaco/svelte-iconoir/nav-arrow-right'

	const modules = import.meta.glob('/src/cv-pages/*.svg', {
		eager: true,
		query: '?url',
		import: 'default'
	}) as Record<string, string>

	const pages = Object.entries(modules)
		.map(([path, url]) => ({
			n: Number.parseInt(path.match(/resume-(\d+)\.svg$/)?.[1] ?? '0', 10),
			url
		}))
		.sort((a, b) => a.n - b.n)
		.map((p) => p.url)

	let current = $state(0)

	const prev = () => (current = Math.max(0, current - 1))
	const next = () => (current = Math.min(pages.length - 1, current + 1))

	function onKey(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') prev()
		else if (event.key === 'ArrowRight') next()
	}
</script>

<svelte:window onkeydown={onKey} />

<Seo title="CV" description={`CV of ${site.name} — ${site.role} at ${site.company}.`} />

<section class="cv">
	{#if pages.length > 0}
		<div class="cv-head">
			<div class="cv-nav">
				<button onclick={prev} disabled={current === 0} aria-label="Previous page">
					<NavArrowLeftIcon size="sm" />
				</button>
				<span class="cv-count">{current + 1} / {pages.length}</span>
				<button
					onclick={next}
					disabled={current === pages.length - 1}
					aria-label="Next page"
				>
					<NavArrowRightIcon size="sm" />
				</button>
			</div>
			<a href="/cv.pdf" target="_blank" rel="noopener">Download PDF</a>
		</div>

		<div class="cv-page-wrap">
			<img src={pages[current]} alt="CV page {current + 1} of {pages.length}" class="cv-page" />
		</div>
	{:else}
		<p class="cv-empty">
			The CV isn't available in this build. See <a href={site.github} target="_blank"
				rel="noopener">my GitHub</a
			> or reach me by <a href="mailto:{site.email}">email</a>.
		</p>
	{/if}
</section>

<style>
	.cv {
		max-width: 820px;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
	}
	.cv-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 1.25rem;
	}
	.cv-nav {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.cv-nav button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		background: none;
		border: 1px solid rgba(128, 128, 128, 0.35);
		border-radius: 6px;
		color: inherit;
		cursor: pointer;
	}
	.cv-nav button:hover:not(:disabled) {
		color: var(--hover-color);
		border-color: var(--hover-color);
	}
	.cv-nav button:disabled {
		opacity: 0.3;
		cursor: default;
	}
	.cv-count {
		font-variant-numeric: tabular-nums;
		min-width: 3.5rem;
		text-align: center;
	}
	.cv-head > a {
		font-size: 0.9rem;
	}
	.cv-page-wrap {
		display: flex;
		justify-content: center;
	}
	.cv-page {
		max-width: 100%;
		height: auto;
		display: block;
		border: 1px solid rgba(128, 128, 128, 0.25);
	}
	.cv-empty {
		line-height: 1.7;
		opacity: 0.8;
	}
</style>
