<script lang="ts">
	import ResizableTextarea from '$lib/components/ResizableTextarea.svelte';
</script>

<h1>Add Song</h1>

<a href="/">Home</a>

<form action="post">
	<div class="field">
		<label for="title">Title:</label>
		<input type="text" name="title" id="title" />
	</div>

	<div class="field">
		<label for="author">Author:</label>
		<input type="text" name="author" id="author" />
	</div>

	<div class="main">
		<div class="txField">
			<label for="lirycs">Lirycs:</label>
			<ResizableTextarea name={'lirycs'} id={'lirycs'} cols={60} rows={20} />
		</div>
		<div class="txField">
			<label for="chords">Chords:</label>
			<ResizableTextarea name={'chords'} id={'chords'} cols={20} rows={20} />
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
