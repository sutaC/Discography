<script lang="ts">
	import SongForm from '$lib/components/SongForm.svelte';
</script>

<h1>Add Song</h1>

<a href="/">Home</a>

<SongForm method={'POST'} action={'/song/add'} />
