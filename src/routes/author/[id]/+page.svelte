<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte';
	import SongsDisplay from '$lib/components/SongsDisplay.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	const handleEdit = () => {
		window.location.replace(`/author/${data.author.id}/edit`);
	};

	const handleDelete = async () => {
		if (!data.permissions?.deleting) return;
		const isSure = confirm(
			`Are you sure you want to delete "${data.author.name}"? It will also remove all songs related to him!`
		);
		if (!isSure) return;
		await fetch(`/author/${data.author.id}/delete`, { method: 'POST' });
		window.location.replace('/');
	};
</script>

<main>
	<div class="heading">
		<div class="meta">
			<h1>{data.author.name}</h1>
			<div class="controls">
				{#if data.permissions?.updating}
					<IconButton tooltip="Edit" on:click={handleEdit}>
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
			</div>
		</div>

		<!-- TODO: Add stats to db -->
		<div class="stats">
			<div class="option">Songs: 69</div>
			<div class="option">Stars: 2137</div>
		</div>

		<!-- TODO: Add description to db -->
		<p class="description">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Id animi neque nihil. Dolores
			ratione, id voluptatem debitis voluptatum, consequatur ea tempora vero explicabo nobis ipsam!
		</p>
	</div>

	<SongsDisplay songs={data.songs}></SongsDisplay>
</main>

<style>
	.heading {
		background-color: var(--clr-secondary);
		padding: 1rem;
		translate: 0 -1rem;
		box-shadow: inset 0 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
	}

	h1 {
		font-size: 2rem;
	}

	.meta,
	.controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
	}

	.stats {
		display: flex;
		gap: 0.5rem;
	}

	.description {
		font-size: 0.833rem;
		max-width: 50ch;
	}
</style>
