<script lang="ts">
	import { browser } from '$app/environment';
	import StartsCounter from '$lib/components/StartsCounter.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleDelete = async () => {
		if (!data.permissions?.deleting) return;
		const isSure = confirm(`Are you sure you want to delete "${data.song.title}"?`);
		if (!isSure) return;
		await fetch(`/song/${data.song.id}/delete`, { method: 'POST' });
		window.location.replace('/');
	};

	const handlePrint = () => {
		if (browser) window.print();
	};
</script>

<header>
	<div class="controls">
		<nav>
			<a href="/">Home</a>
		</nav>
		<div class="cta">
			{#if data.permissions?.updating}
				<a href={`/song/${data.song.id}/edit`}>Edit</a>
			{/if}
			{#if data.permissions?.deleting}
				<button on:click|preventDefault={handleDelete}>Delete</button>
			{/if}
			<button on:click|preventDefault={handlePrint}>Print</button>
			<StartsCounter
				isStared={data.isStared}
				startsCount={data.stars}
				logedIn={!!data.permissions}
				songId={data.song.id}
			/>
		</div>
	</div>

	<h1 class="print inline">
		{data.song.title} -
		<a class="print inline" href={`/author/${data.song.authorId}`}>{data.song.author}</a>
	</h1>
</header>

<main class="print flex">
	<div class="lyrics">
		<p class="print none">Lyrics:</p>
		<pre>{data.song.lyrics}</pre>
	</div>

	<div class="chords">
		<p class="print none">Chords:</p>
		<pre>{data.song.chords}</pre>
	</div>
</main>

<style>
	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1em;
	}

	.cta {
		display: flex;
		gap: 0.25rem;
		align-items: start;
	}

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
