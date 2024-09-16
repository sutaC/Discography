<script>
	import CustomButton from '$lib/components/CustomButton.svelte';

	// TODO: Validation
</script>

<main>
	<h1>Delete account</h1>
	<p>Are you sure you want delete your account forever? It's a really long time!</p>

	<form action="/profile/delete" method="post">
		<div class="field">
			<label for="password">Password:</label>
			<input class="Input" type="password" name="password" id="password" />
		</div>
		<CustomButton type="submit">Delete</CustomButton>
	</form>
</main>

<style>
	main {
		margin: auto;
		padding: 1rem;
		max-width: 50ch;
	}

	h1 {
		text-align: center;
	}

	p {
		display: block;
		margin: auto;
	}

	.field {
		margin: 2rem 0;
		display: flex;
	}

	input {
		border: 1px solid var(--clr-text);
	}

	form :global(button) {
		margin: auto;
	}
</style>
