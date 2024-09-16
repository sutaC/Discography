<script lang="ts">
	import CustomButton from '$lib/components/CustomButton.svelte';

	let tab: 'login' | 'register' = 'login';

	// TODO: Validation
</script>

<main>
	<h1>Welcome!</h1>

	<div class="formContainer">
		<div class="tabs">
			<input
				type="radio"
				id="radLogin"
				name="formTab"
				on:input|preventDefault={() => (tab = 'login')}
				checked
			/>
			<label for="radLogin">Login</label>

			<input
				type="radio"
				name="formTab"
				id="radRegister"
				on:input|preventDefault={() => (tab = 'register')}
			/>
			<label for="radRegister">Register</label>
		</div>

		{#if tab === 'login'}
			<form action="?/login" method="post">
				<div class="field">
					<label for="login-login">Login:</label>
					<input
						class="Input"
						type="text"
						name="login"
						id="login-login"
						placeholder="Login..."
						autocomplete="username"
						required
						minlength="2"
						maxlength="32"
					/>
				</div>
				<div class="field">
					<label for="login-password">Password:</label>
					<input
						class="Input"
						type="password"
						name="password"
						id="login-password"
						placeholder="Password..."
						autocomplete="current-password"
						required
						minlength="8"
						max="32"
					/>
				</div>
				<CustomButton type="submit">Login</CustomButton>
			</form>
		{:else if tab === 'register'}
			<form action="?/register" method="post">
				<div class="field">
					<label for="register-login">Login:</label>
					<input
						class="Input"
						type="text"
						name="login"
						id="register-login"
						placeholder="Login..."
						autocomplete="username"
						required
						minlength="2"
						maxlength="32"
					/>
				</div>
				<div class="field">
					<label for="register-password">Password:</label>
					<input
						class="Input"
						type="password"
						name="password"
						id="register-password"
						placeholder="Password..."
						autocomplete="new-password"
						required
						minlength="8"
						max="32"
					/>
				</div>
				<div class="field">
					<label for="register-repeatPassword">Repeat password:</label>
					<input
						class="Input"
						type="password"
						name="repeatPassword"
						id="register-repeatPassword"
						placeholder="Repeat password..."
						autocomplete="new-password"
						required
						minlength="8"
						max="32"
					/>
				</div>
				<CustomButton type="submit">Register</CustomButton>
			</form>
		{/if}
	</div>
</main>

<style>
	main {
		padding: 0 1rem;
	}

	h1 {
		text-align: center;
	}

	.formContainer {
		margin: auto;
		max-width: 30rem;
	}

	.tabs {
		display: flex;
		justify-content: space-between;
		translate: 0 1px;
	}

	.tabs input {
		display: none;
	}

	.tabs label {
		background-color: var(--clr-primary);
		border-bottom: 1px solid var(--clr-text);
		flex: 1;
		text-align: center;
		padding: 0.5rem;
		border-radius: 1rem 1rem 0 0;
		transition: all 150ms ease-out;
	}

	.tabs input:not(:checked) + label:hover {
		opacity: 0.9;
		cursor: pointer;
	}

	.tabs input:checked + label {
		border: none;
		background-color: var(--clr-secondary);
	}

	form {
		background-color: var(--clr-secondary);
		padding: 2rem;
		border-radius: 0 0 1rem 1rem;
	}

	.field {
		display: flex;
		justify-content: space-between;
		gap: 0.5rem;
		margin: 1rem 0;
	}

	form :global(button) {
		margin-left: auto;
	}
</style>
