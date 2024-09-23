<script lang="ts">
	import type { SongTag } from '$lib/types';
	import Song from './Song.svelte';

	export let songs: (SongTag & { stars: number })[] = [];
</script>

<div class="songs">
	{#each songs as song}
		<Song {song} />
	{:else}
		<slot />
	{/each}
</div>

<style>
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
