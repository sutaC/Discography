<script lang="ts">
	import AuthorForm from '$lib/components/AuthorForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	<h1>Edit author</h1>
	<div class="linkContainer">
		<a class="Link" href={`/author/${data.id}`}>Return</a>
	</div>
	<AuthorForm action={`/author/${data.id}/edit`} method={'post'} authorInit={data} />
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
