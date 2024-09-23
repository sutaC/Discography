<script lang="ts">
	import type { Author } from '$lib/types';
	import CustomButton from './CustomButton.svelte';
	import ResizableTextarea from './ResizableTextarea.svelte';

	// TODO: Add author description

	export let authorInit: Author = {
		id: 0,
		name: ''
	};

	export let action: string = '';
	export let method: string = '';

	let author: Author = { ...authorInit };

	const handleReset = (event: Event) => {
		event.preventDefault();
		author = { ...authorInit };
	};
</script>

<form {action} {method}>
	<div class="field">
		<label for="name">Name:</label>
		<input
			type="text"
			name="name"
			id="name"
			placeholder="Name..."
			class="Input"
			bind:value={author.name}
			required
			minlength="2"
			maxlength="256"
		/>
	</div>

	<div class="field long">
		<label for="desciprion">Desciprion:</label>
		<ResizableTextarea
			id="desciprion"
			name="desciprion"
			required={true}
			value={''}
			placeholder="Description..."
		/>
	</div>

	<div class="controls">
		<CustomButton type="reset" on:click={handleReset}>Reset</CustomButton>
		<CustomButton type="submit">Submit</CustomButton>
	</div>
</form>

<style>
	form {
		padding: 2rem 0;
		max-width: 30rem;
		margin: auto;
	}

	form > div {
		margin-bottom: 2rem;
	}

	.field {
		display: flex;
	}

	.field input {
		width: 100%;
		border: 1px solid var(--clr-text);
	}

	.field.long {
		flex-direction: column;
	}

	.controls {
		text-align: right;
	}

	.controls :global(button) {
		display: inline-block;
		margin: 0 0.5rem;
	}
</style>
