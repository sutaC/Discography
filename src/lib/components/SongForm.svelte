<script lang="ts">
	import type { Author, Song } from '$lib/types';
	import CustomButton from './CustomButton.svelte';
	import ResizableTextarea from './ResizableTextarea.svelte';

	export let authors: Author[];

	export let method: string = '';
	export let action: string = '';
	export let songInit: Song = {
		id: 0,
		title: '',
		author: '',
		chords: '',
		authorId: 0,
		lyrics: ''
	};

	let song: Song = { ...songInit };

	const handleReset = () => {
		song = { ...songInit };
	};

	let txSize = 0;
</script>

<form {method} {action}>
	<div class="field">
		<label for="title">Title:</label>
		<input
			class="Input"
			type="text"
			name="title"
			id="title"
			bind:value={song.title}
			required
			minlength="2"
			maxlength="256"
			placeholder="Title..."
		/>
	</div>

	<div class="field">
		<label for="author">Author:</label>
		<!-- TODO: ADD author selection by typing -->
		<input
			class="Input"
			type="text"
			name="author"
			id="author"
			placeholder="Author..."
			required
			minlength="2"
			maxlength="256"
		/>
		<!-- <select name="author" id="author" placeholder="Name..." value={song.authorId} required>
			{#each authors as author}
				<option value={author.id}>{author.name}</option>
			{/each}
		</select> -->
	</div>

	<div class="contents">
		<div class="txField">
			<label for="lyrics">Lyrics:</label>
			<ResizableTextarea
				name={'lyrics'}
				id={'lyrics'}
				cols={60}
				rows={20}
				required={true}
				bind:connectValue={txSize}
				bind:value={song.lyrics}
			/>
		</div>
		<div class="txField">
			<label for="chords">Chords:</label>
			<ResizableTextarea
				name={'chords'}
				id={'chords'}
				cols={20}
				rows={20}
				required={true}
				bind:connectValue={txSize}
				bind:value={song.chords}
			/>
		</div>
	</div>

	<div class="controls">
		<CustomButton type="reset" on:click={handleReset}>Reset</CustomButton>
		<CustomButton type="submit" on:click={handleReset}>Submit</CustomButton>
	</div>
</form>

<style>
	form {
		padding: 2rem 0;
		max-width: 40rem;
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

	.contents {
		display: flex;
		align-items: start;
		gap: 0.5rem;
	}

	.txField {
		display: flex;
		flex-direction: column;
	}

	.txField :global(textarea) {
		width: 100%;
	}

	.controls {
		text-align: right;
	}

	.controls :global(button) {
		display: inline-block;
		margin: 0 0.5rem;
	}
</style>
