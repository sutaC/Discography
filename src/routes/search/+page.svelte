<script lang="ts">
	import type { SongTag } from '$lib/types';

	let slug: string = '';

	let songs: SongTag[] = [];

	const handleSearch = async () => {
		if (slug.length === 0) {
			songs = [];
			return;
		}
		const res = await fetch(`/search/${slug}`);
		songs = (await res.json()) as SongTag[];
	};
</script>

<nav>
	<a href="/">Home</a>
</nav>

<header>
	<h1>Search</h1>

	<div class="search">
		<label for="search"></label>
		<input
			type="search"
			name="search"
			id="search"
			placeholder="Song name..."
			bind:value={slug}
			on:change|preventDefault={handleSearch}
			on:input|preventDefault={handleSearch}
		/>
		<button on:click|preventDefault={handleSearch}>Search</button>
	</div>
</header>

<main>
	<h2>Results</h2>
	{#each songs as song}
		<div class="tag">
			<a href="/song/{song.id}">{song.title}</a>
			-
			<a href="/author/{song.authorId}">{song.author}</a>
		</div>
	{/each}
</main>

<style>
	.tag {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
</style>
