<script lang="ts">
	import AuthorForm from '$lib/components/AuthorForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/author/${data.id}`}>Author</a>

<h1>Edit author</h1>

<AuthorForm action={`/author/${data.id}/edit`} method={'post'} authorInit={data} />
