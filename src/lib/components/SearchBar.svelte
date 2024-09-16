<script lang="ts">
	import type { SongTag } from '$lib/types';
	import IconButton from './IconButton.svelte';

	export let open = false;

	let searchResults: (SongTag & { stars: number })[] = [];
	let slug: string = '';

	const handleSearch = async () => {
		if (slug.length === 0) {
			searchResults = [];
			return;
		}
		const res = await fetch(`/search/${encodeURI(slug)}`);
		const data = (await res.json()) as (SongTag & { stars: number })[];

		if (!Array.isArray(data)) {
			console.error('Not valid data response from fetch: ', res);
			return;
		}

		searchResults = data;
	};

	const handleClose = () => {
		searchResults = [];
		slug = '';
		open = !open;
	};
</script>

<div class="searchBar" class:open>
	<div class="bar">
		<IconButton tooltip="Close" on:click={handleClose}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="bi bi-arrow-left-short"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
				/>
			</svg>
		</IconButton>
		<input
			class="Input"
			type="search"
			name="search"
			id="search"
			placeholder="Song name..."
			autocapitalize="off"
			autocomplete="off"
			bind:value={slug}
			on:change|preventDefault={handleSearch}
			on:input|preventDefault={handleSearch}
		/>
		<IconButton tooltip="Search" on:click={handleSearch}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="bi bi-search"
				viewBox="0 0 16 16"
			>
				<path
					d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
				/>
			</svg>
		</IconButton>
	</div>
	<div class="results">
		{#each searchResults as song}
			<div class="result">
				<a href="/song/{song.id}" on:click={handleClose}><abbr title="Song">{song.title}</abbr></a>
				-
				<a href="/author/{song.authorId}" on:click={handleClose}
					><abbr title="Author">{song.author}</abbr></a
				>
				-
				<small>stars: {song.stars}</small>
			</div>
		{/each}
	</div>
</div>

<style>
	.searchBar {
		display: none;
	}

	.searchBar.open {
		display: block;
		position: fixed;
		width: 100vw;
		left: 0;
		top: 0;
		isolation: isolate;
		z-index: 100;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
	}

	.bar {
		background-color: var(--clr-primary);
		padding: 1.33rem 1rem;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	input {
		margin: unset;
		max-width: 30rem;
	}

	.results {
		background-color: var(--clr-secondary);
	}

	.result {
		text-align: center;
		padding: 1rem;
		border-top: 1px solid var(--clr-text);
		transition: all 150ms ease-out;
	}

	.result a {
		all: unset;
		font-weight: bold;
		cursor: pointer;
	}

	.result:has(a:hover) {
		translate: 0 -2px;
	}

	abbr {
		text-decoration: none;
	}
</style>
