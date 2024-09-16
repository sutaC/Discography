<script>
	import CustomButton from '$lib/components/CustomButton.svelte';

	// TODO: implement password reset
</script>

<main>
	<h1>Reset password</h1>

	<form action="/profile/reset" method="post">
		<div class="field">
			<label for="password">Password:</label>
			<input class="Input" type="password" name="password" id="password" />
		</div>
		<div class="field">
			<label for="reset-password">Reset password:</label>
			<input class="Input" type="password" name="reset-password" id="reset-password" />
		</div>
		<CustomButton type="submit">Reset</CustomButton>
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
