<script lang="ts">
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleDelete = async () => {
		const isSure = confirm(`Are you sure you want to delete "${data.title}"?`);
		if (!isSure) return;
		await fetch(`/song/${data.id}/delete`, { method: 'POST' });
		window.location.replace('/');
	};

	const handlePrint = () => {
		if (browser) window.print();
	};
</script>

<a href="/">Home</a>
<a href={`/song/${data.id}/edit`}>Edit</a>
<button on:click|preventDefault={handleDelete}>Delete</button>
<button on:click|preventDefault={handlePrint}>Print</button>

<h1 class="print inline">
	{data.title} - <a class="print inline" href={`/author/${data.authorId}`}>{data.author}</a>
</h1>

<main class="print flex">
	<div class="lyrics">
		<p class="print none">Lyrics:</p>
		<pre>{data.lyrics}</pre>
	</div>

	<div class="chords">
		<p class="print none">Chords:</p>
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

	@media print {
		/* Disabling non printable elements */
		:global(body) * {
			display: none;
		}
		.print,
		.print * {
			display: block;
		}
		.print.flex {
			display: flex;
		}
		.print.inline {
			display: inline;
		}
		.print.none {
			display: none;
		}
		/* /---/ */
		:global(body) {
			padding: 5rem;
		}

		main {
			margin: 2rem 0;
		}
	}
</style>
