<script lang="ts">
	import type { SongTag } from '$lib/types';

	export let song: SongTag & { stars: number };
</script>

<div class="song">
	<span class="top">
		<a href="/song/{song.id}"><abbr title="Song">{song.title}</abbr></a>
		-

		<a href="/author/{song.authorId}"><abbr title="Author">{song.author}</abbr></a>
	</span>
	<small class="bottom">
		Stars: {song.stars}
	</small>
</div>

<style>
	.song {
		text-align: center;
		background: var(--grd-rad-secondary);
		max-width: 30rem;
		margin: 2rem auto;
		border-radius: 0.5rem;
		box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.2);
		padding: 0.5rem;
	}

	.song > * {
		display: block;
	}

	abbr {
		text-decoration: none;
	}

	a {
		all: unset;
		cursor: pointer;
		font-weight: bold;
		transition: all 150ms ease-out;
	}

	a:hover {
		translate: 0 -1px;
	}

	a:active {
		translate: 0;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.top > * {
		flex: 1;
	}
</style>
