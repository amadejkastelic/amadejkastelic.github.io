<script lang="ts">
	import { Navbar, NavUl, NavLi } from 'flowbite-svelte';
	import { theme } from '../themes';

	const menuItems = ['Home', 'Projects', 'Experience', 'CV'];
</script>

<Navbar>
	<NavUl>
		{#each menuItems as item}
			<NavLi href={'#' + item.toLowerCase()}>
				{item}
			</NavLi>
		{/each}
	</NavUl>
</Navbar>
