<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	const handleDelete = async () => {
		const isSure = confirm(
			`Are you sure you want to delete "${data.author.name}"? It will also remove all songs related to him!`
		);
		if (!isSure) return;
		await fetch(`/author/${data.author.id}/delete`, { method: 'POST' });
		window.location.replace('/');
	};
</script>

<a href="/">Home</a>
<a href={`/author/${data.author.id}/edit`}>Edit</a>
<button on:click|preventDefault={handleDelete}>Delete</button>

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
