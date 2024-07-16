<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { SongTag } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let search: (SongTag & { stars: number })[] = [];
</script>

<header>
	<h1>Discography</h1>

	<SearchBar bind:songs={search} />
	<div class="searchRes">
		{#each search as song}
			<div class="search">
				<a href="/song/{song.id}">{song.title}</a>
				-
				<a href="/author/{song.authorId}">{song.author}</a>
				- stars: {song.stars}
			</div>
		{/each}
	</div>
</header>

<nav>
	<h2>Menu</h2>
	{#if !!data.permissions}
		<a href="/profile">Profile</a>
	{:else}
		<a href="/login">Login</a>
	{/if}
	{#if data.permissions?.adding}
		<a href="/song/add">Add Song</a>
		<a href="/author/add">Add Author</a>
	{/if}
</nav>

<main>
	<h2>Content</h2>

	<section>
		<h3>Songs</h3>
		{#each data.songs as song}
			<div class="tag">
				<a href="/song/{song.id}">{song.title}</a>
				-
				<a href="/author/{song.authorId}">{song.author}</a>
				- stars: {song.stars}
			</div>
		{/each}
	</section>

	<section>
		<h3>Authors</h3>
		{#each data.authors as author}
			<a href="/author/{author.id}" class="tag">
				{author.name}
			</a>
		{/each}
	</section>
</main>

<style>
	header,
	nav,
	main {
		text-align: center;
	}

	.searchRes {
		margin: 1rem auto;
		border: 1px solid #000;
		width: 50%;
		background-color: whitesmoke;
		position: absolute;
		left: 50%;
		translate: -50%;
	}

	.search {
		border-bottom: 1px solid #000;
		padding: 0.25rem;
	}

	.search:last-child {
		border: none;
	}

	.searchRes:empty {
		display: none;
	}

	.tag {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
</style>
