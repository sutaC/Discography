<script lang="ts">
	import type { SongTag } from '$lib/types';

	export let songs: SongTag[] = [];
	let slug: string = '';

	const handleSearch = async () => {
		if (slug.length === 0) {
			songs = [];
			return;
		}
		const res = await fetch(`/search/${slug}`);
		songs = (await res.json()) as SongTag[];
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
