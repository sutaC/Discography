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
	<section>
		<h2>Songs</h2>
		{#each data.songs as song}
			<div class="tag">
				<a href="/song/{song.id}">{song.title}</a>
				-
				<a href="/author/{song.authorId}">{song.author}</a>
			</div>
		{/each}
	</section>

	<section>
		<h2>Authors</h2>
		{#each data.authors as author}
			<a href="/author/{author.id}" class="tag">
				{author.name}
			</a>
		{/each}
	</section>
</main>

<style>
	.tag {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
</style>
