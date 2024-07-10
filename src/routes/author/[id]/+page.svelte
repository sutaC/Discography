<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/author/${data.author.id}/edit`}>Edit</a>

<h1>{data.author.name}</h1>

<h2>Songs made by:</h2>

{#each data.songs as song}
	<a href={`/song/${song.id}`} class="song">{song.title}</a>
{/each}

<style>
	.song {
		display: block;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border: 1px solid #000;
	}
</style>
