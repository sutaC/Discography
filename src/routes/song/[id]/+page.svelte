<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import IconButton from '$lib/components/IconButton.svelte';
	import ScrollingControls from '$lib/components/ScrollingControls.svelte';
	import StartsCounter from '$lib/components/StartsCounter.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let scrollControls: ScrollingControls;
	let isScrolling = false;

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

<main>
	<div class="heading">
		<h1 class="Print">
			{data.song.title}
			<a class="Link Print author" href={`/author/${data.song.authorId}`}>{data.song.author}</a>
		</h1>

		<div class="controls">
			<StartsCounter
				isStared={data.isStared}
				isLogedIn={!!data.permissions}
				startsCount={data.song.stars}
				songId={data.song.id}
			/>
			<div class="buttons">
				{#if data.permissions?.updating}
					<IconButton tooltip="Edit" on:click={() => goto(`/song/${data.song.id}/edit`)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-pen"
							viewBox="0 0 16 16"
						>
							<path
								d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
							/>
						</svg>
					</IconButton>
				{/if}
				{#if data.permissions?.deleting}
					<IconButton tooltip="Delete" on:click={handleDelete}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-trash"
							viewBox="0 0 16 16"
						>
							<path
								d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
							/>
							<path
								d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
							/>
						</svg>
					</IconButton>
				{/if}
				<IconButton tooltip="Scroll" on:click={scrollControls.handleScroll}>
					{#if isScrolling}
						<!-- Pause icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-pause-circle"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path
								d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"
							/>
						</svg>
					{:else}
						<!-- Play icon -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							class="bi bi-play-circle"
							viewBox="0 0 16 16"
						>
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
							<path
								d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"
							/>
						</svg>
					{/if}
				</IconButton>
				<IconButton tooltip="Print" on:click={handlePrint}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="currentColor"
						class="bi bi-printer"
						viewBox="0 0 16 16"
					>
						<path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
						<path
							d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1"
						/>
					</svg>
				</IconButton>
			</div>
		</div>
	</div>

	<div class="Print content">
		<pre class="lyrics">{data.song.lyrics}</pre>
		<pre class="chords">{data.song.chords}</pre>
	</div>

	<ScrollingControls bind:isScrolling bind:this={scrollControls} />
</main>

<style>
	main {
		margin: auto;
		padding: 1rem;
		max-width: 75rem;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
	}

	.author {
		font-size: 1rem;
		font-weight: normal;
	}

	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem 1rem 0.5rem;
		margin: 2rem 0;
		background-color: var(--clr-secondary);
		border-radius: 0.5rem;
		box-shadow: 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
	}

	.buttons {
		display: flex;
		gap: 1rem;
		align-items: start;
	}

	.content {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.content pre {
		text-wrap: wrap;
		margin: 0;
		width: fit-content;
	}

	.chords {
		max-width: 7.5rem;
	}

	@media print {
		:global(:is(header, footer)),
		:is(.controls) {
			display: none !important;
		}

		:global(body) {
			padding: 5rem;
		}

		main {
			margin: 2rem 0;
		}

		h1 {
			margin-bottom: 2rem;
		}
	}
</style>
