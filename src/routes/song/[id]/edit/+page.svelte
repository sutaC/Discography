<script lang="ts">
	import type { PageData } from './$types';
	import SongForm from '$lib/components/SongForm.svelte';

	export let data: PageData;
</script>

<main>
	<h1>Edit song</h1>

	<div class="linkContainer">
		<a class="Link" href={`/song/${data.song.id}`}>Return</a>
	</div>

	<SongForm
		method={'POST'}
		action={`/song/${data.song.id}/edit`}
		songInit={data.song}
		authors={data.authors}
	/>
</main>

<style>
	h1 {
		text-align: center;
		margin: 0;
	}

	.linkContainer {
		display: flex;
		justify-content: center;
		align-self: start;
	}

	main {
		padding: 0 1rem;
	}
</style>
