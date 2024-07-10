<script lang="ts">
	import ResizableTextarea from '$lib/components/ResizableTextarea.svelte';
	import SongForm from '$lib/components/SongForm.svelte';
</script>

<h1>Add Song</h1>

<a href="/">Home</a>

<SongForm method={'POST'} action={'/song/add'} />
