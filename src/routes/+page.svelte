<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import Song from '$lib/components/Song.svelte';
	import type { SongTag } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	let search: (SongTag & { stars: number })[] = [];
</script>

<!-- <header>
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
</header> -->

<!-- <nav>
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
	{#if data.permissions?.granting}
		<a href="/user">Manage users</a>
	{/if}
</nav> -->

<main>
	<h1>Trending Songs</h1>

	<div class="songs">
		{#each data.songs as song}
			<Song {song} />
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
	}

	h1 {
		font-size: 1.7rem;
	}

	.songs {
		padding: 0 1rem;
	}

	@media (width >= 1000px) {
		.songs {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
		}

		.songs :global(> .song) {
			flex: 30rem;
		}
	}
</style>
