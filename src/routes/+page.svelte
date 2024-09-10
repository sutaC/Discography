<script lang="ts">
	import Song from '$lib/components/Song.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

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
