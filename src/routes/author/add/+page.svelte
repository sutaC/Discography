<script lang="ts">
	import AuthorForm from '$lib/components/AuthorForm.svelte';
</script>

<h1>Add Author</h1>

<a href="/">Home</a>

<AuthorForm method={'POST'} action={'/author/add'} />
