<script lang="ts">
	import SongsDisplay from '$lib/components/SongsDisplay.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>Trending Songs</h1>
	<SongsDisplay songs={data.songs}></SongsDisplay>
</main>

<style>
	main {
		text-align: center;
	}

	h1 {
		font-size: 1.7rem;
	}
</style>
