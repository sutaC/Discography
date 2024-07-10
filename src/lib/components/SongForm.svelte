<script lang="ts">
	import type { Song } from '$lib/types';
	import ResizableTextarea from './ResizableTextarea.svelte';

	export let method: string = '';
	export let action: string = '';
	export let song: Song = {
		title: '',
		author: '',
		chords: '',
		id: '',
		lyrics: ''
	};
</script>

<form {method} {action}>
	<div class="field">
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" bind:value={song.title} required maxlength="256" />
	</div>

	<div class="field">
		<label for="author">Author:</label>
		<input
			type="text"
			name="author"
			id="author"
			bind:value={song.author}
			required
			maxlength="256"
		/>
	</div>

	<div class="main">
		<div class="txField">
			<label for="lyrics">Lyrics:</label>
			<ResizableTextarea
				name={'lyrics'}
				id={'lyrics'}
				cols={60}
				rows={20}
				required={true}
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
				bind:value={song.chords}
			/>
		</div>
	</div>

	<button type="reset">Reset</button>
	<button type="submit">Add</button>
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

	.main {
		display: flex;
		align-items: start;
		gap: 0.5rem;
	}

	.txField {
		display: flex;
		flex-direction: column;
	}

	button {
		margin: 0.5rem 0;
	}
</style>
