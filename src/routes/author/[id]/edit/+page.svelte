<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/author/${data.id}`}>Author</a>

<h1>Edit author</h1>

<form action={`/author/${data.id}/edit`} method="post">
	<div class="field">
		<label for="name">Name</label>
		<input type="text" name="name" id="name" bind:value={data.name} />
	</div>
	<button type="reset">Reset</button>
	<button type="submit">Submit</button>
</form>

<style>
	form {
		padding: 0.5rem;
		margin: 0.5rem;
		border: 1px solid #000;
	}

	.field {
		margin: 0.5rem 0;
	}

	button {
		margin: 0.5rem 0;
	}
</style>
