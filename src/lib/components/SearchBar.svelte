<script lang="ts">
	import type { SongTag } from '$lib/types';

	export let songs: (SongTag & { stars: number })[] = [];
	let slug: string = '';

	const handleSearch = async () => {
		if (slug.length === 0) {
			songs = [];
			return;
		}
		const res = await fetch(`/search/${slug}`);
		const data = (await res.json()) as (SongTag & { stars: number })[];

		if (!Array.isArray(data)) {
			console.error('Not valid data response from fetch: ', res);
			return;
		}

		songs = data;
	};
</script>

<div class="search">
	<label for="search"></label>
	<input
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
	<button on:click|preventDefault={handleSearch}>Search</button>
</div>
