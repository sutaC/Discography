<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<header>
	<h1>Hello {data.login}!</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/profile/delete">Delete account</a>
	</nav>
	<form action="/logout" method="post"><button type="submit">Logout</button></form>
</header>

<main>
	<h2>Stared songs</h2>

	<div class="songs">
		{#each data.songs as song}
			<div class="tag">
				<a href="/song/{song.id}">{song.title}</a>
				-
				<a href="/author/{song.authorId}">{song.author}</a>
			</div>
		{:else}
			<p>Looks empty... Maybe you should star some songs!</p>
		{/each}
	</div>
</main>

<style>
	header,
	main {
		text-align: center;
	}

	form {
		margin: 1rem 0;
	}

	.tag {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		width: 50%;
		margin: 0.5rem auto;
	}
</style>
