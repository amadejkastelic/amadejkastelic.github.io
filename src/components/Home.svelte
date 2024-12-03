<script>
	import { LinkedInIcon } from '@indaco/svelte-iconoir/linkedin';
	import { GitHubIcon } from '@indaco/svelte-iconoir/github';
	import { MailIcon } from '@indaco/svelte-iconoir/mail';

	const name = 'Amadej Kastelic';
	const title = 'Senior Software Engineer';
	const company = 'Veza';
	const photoUrl = '/me.jpg';
	const githubUrl = 'https://github.com/amadejkastelic';
	const linkedinUrl = 'https://linkedin.com/in/amadej-kastelic-9931a1169/';
	const email = 'amadejkastelic7@gmail.com';
</script>

<div class="intro">
	<h1 class="name">{name}</h1>
	<img src={photoUrl} alt="pfp" class="photo" />
	<p class="title">{title} @ <a href="https://veza.com/" target="_blank">{company}</a></p>
	<div class="social-links">
		<a href={githubUrl} target="_blank">
			<GitHubIcon size="xl" />
		</a>
		<a href={linkedinUrl} target="_blank">
			<LinkedInIcon size="xl" />
		</a>
		<a href="mailto:{email}" aria-label="Email">
			<MailIcon size="xl" />
		</a>
	</div>
</div>

<style>
	.intro {
		text-align: center;
		padding: 20px;
	}
	.photo {
		width: 150px;
		height: 150px;
		border-radius: 50%;
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
</style>
