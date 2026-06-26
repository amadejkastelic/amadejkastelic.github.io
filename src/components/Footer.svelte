<script lang="ts">
	import { site } from '$lib'
	import { GitHubIcon } from '@indaco/svelte-iconoir/github'
	import { LinkedInIcon } from '@indaco/svelte-iconoir/linkedin'
	import { MailIcon } from '@indaco/svelte-iconoir/mail'
	import { PasteClipboardIcon } from '@indaco/svelte-iconoir/paste-clipboard'

	const year = new Date().getFullYear()
</script>

<footer>
	<div class="social-links">
		<a href={site.github} title="Github" target="_blank" aria-label="GitHub">
			<GitHubIcon size="xl" />
		</a>
		<a href={site.linkedin} title="Linkedin" target="_blank" aria-label="LinkedIn">
			<LinkedInIcon size="xl" />
		</a>
		<a href={site.resume} title="View Resume" target="_blank" aria-label="Resume">
			<PasteClipboardIcon size="xl" />
		</a>
		<a href="mailto:{site.email}" title="Send Email" aria-label="Email">
			<MailIcon size="xl" />
		</a>
	</div>
	<p class="copyright">© {year} {site.name}</p>
</footer>

<style>
	footer {
		text-align: center;
		padding: 2rem 1rem;
	}
	.social-links a {
		margin: 0 10px;
		display: inline-flex;
		align-items: center;
		color: inherit;
		text-decoration: none;
	}
	.social-links a:hover {
		color: var(--hover-color);
	}
	.copyright {
		margin: 1rem 0 0;
		font-size: 0.85rem;
		opacity: 0.6;
	}
</style>
