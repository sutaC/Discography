<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/song/${data.id}/edit`}>Edit</a>

<h1>{data.title} - {data.author}</h1>

<main>
	<div class="lyrics">
		<p>Lyrisc</p>
		<pre>{data.lyrics}</pre>
	</div>

	<div class="chords">
		<p>Chords:</p>
		<pre>{data.chords}</pre>
	</div>
</main>

<style>
	main {
		display: flex;
		padding: 1rem;
		gap: 1rem;
	}

	main p {
		font-weight: bold;
	}

	main pre {
		text-wrap: wrap;
	}

	.lyrics {
		flex: 4;
	}

	.chords {
		flex: 1;
	}
</style>
