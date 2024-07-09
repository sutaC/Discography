<script lang="ts">
	export let data;
</script>

<h1>Hello World! :3</h1>

{#each data.songs as song}
	<a href="/song/{song.id}" class="song">
		{song.title} - {song.author}
	</a>
{/each}

<style>
	.song {
		display: block;
		border: 1px solid #000;
		padding: 0.5rem;
		margin: 0.5rem 0;
	}
</style>
