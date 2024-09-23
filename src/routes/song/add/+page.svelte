<script lang="ts">
	import SongForm from '$lib/components/SongForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	<h1>Add Song</h1>
	<SongForm method={'POST'} action={'/song/add'} authors={data.authors} />
</main>

<style>
	h1 {
		text-align: center;
		margin: 0;
	}

	main {
		padding: 0 1rem;
	}
</style>
