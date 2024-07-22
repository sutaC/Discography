<header>
	<h1>Get your profile!</h1>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>

<form action="?/login" method="post">
	<h2>Log in</h2>

	<div class="field">
		<label for="login-login">Login:</label>
		<input
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
	<div class="foot">
		<button type="reset">Reset</button>
		<button type="submit">Login</button>
	</div>
</form>

<form action="?/register" method="post">
	<h2>Register</h2>

	<div class="field">
		<label for="register-login">Login:</label>
		<input
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
	<div class="foot">
		<button type="reset">Reset</button>
		<button type="submit">Register</button>
	</div>
</form>

<style>
	header {
		text-align: center;
	}

	h2 {
		text-align: center;
	}

	form {
		margin: 1rem auto;
		padding: 1rem;
		border: 1px solid #000;
		width: fit-content;
	}

	.field {
		margin: 1rem 0;
	}

	.foot {
		text-align: center;
	}

	button {
		text-align: center;
	}
</style>
