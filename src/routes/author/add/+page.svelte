<script lang="ts">
	import AuthorForm from '$lib/components/AuthorForm.svelte';
</script>

<main>
	<h1>Add Author</h1>
	<AuthorForm method={'POST'} action={'/author/add'} />
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
