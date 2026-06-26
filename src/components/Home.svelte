<script>
	import { site } from '$lib'

	const photoUrl = '/me.jpg'
</script>

<div class="intro">
	<h1 class="name">{site.name}</h1>
	<img src={photoUrl} alt="pfp" class="photo" />
	<p class="title">{site.role} @ <a href="https://www.servicenow.com/" target="_blank">{site.company}</a></p>
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
</style>
