<script lang="ts">
	import type { Author } from '$lib/types';

	export let author: Author = {
		id: 0,
		name: ''
	};

	export let action: string = '';
	export let method: string = '';
</script>

<form {action} {method}>
	<div class="field">
		<label for="name">Name</label>
		<input type="text" name="name" id="name" bind:value={author.name} />
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
