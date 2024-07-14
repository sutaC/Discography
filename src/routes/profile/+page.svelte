<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const handleDelete = async () => {
		const isSure = confirm('Are you sure you want do delete your account permamently?');
		if (!isSure) return;
		await fetch('/profile', { method: 'DELETE' });
	};
</script>

<header>
	<h1>Hello {data.username}!</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/profile/delete">Delete account</a>
	</nav>
	<form action="/logout" method="post"><button type="submit">Logout</button></form>
	<button on:click|preventDefault={handleDelete}>Delete account</button>
</header>

<style>
	form {
		margin: 1rem 0;
	}
</style>
