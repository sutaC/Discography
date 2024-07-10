<script lang="ts">
	import type { PageData } from './$types';
	import SongForm from '$lib/components/SongForm.svelte';

	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/song/${data.id}`}>Song</a>

<h1>Edit song</h1>

<SongForm method={'POST'} action={`/song/${data.id}/edit`} bind:song={data} />
