<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<header>
	<h1>Hello {data.username}!</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/profile/delete">Delete account</a>
	</nav>
	<form action="/logout" method="post"><button type="submit">Logout</button></form>
</header>

<style>
	form {
		margin: 1rem 0;
	}
</style>
