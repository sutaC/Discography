<script lang="ts">
	export let data;
</script>

<header>
	<h1>Hello World! :3</h1>
</header>

<nav>
	<h2>Menu</h2>
	<a href="/song/add">Add Song</a>
</nav>

<main>
	<h2>Songs</h2>

	{#each data.songs as song}
		<a href="/song/{song.id}" class="song">
			{song.title} - {song.author}
		</a>
	{/each}
</main>

<style>
	.song {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
</style>
