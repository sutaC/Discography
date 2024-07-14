<header>
	<h1>Get your profile!</h1>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>

<form action="?/login" method="post">
	<h2>Log in</h2>

	<div class="field">
		<label for="login">Login:</label>
		<input
			type="text"
			name="login"
			id="login"
			placeholder="Login..."
			autocomplete="username"
			required
			minlength="1"
			maxlength="32"
		/>
	</div>
	<div class="field">
		<label for="password">Password:</label>
		<input
			type="password"
			name="password"
			id="password"
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
		<label for="login">Login:</label>
		<input
			type="text"
			name="login"
			id="login"
			placeholder="Login..."
			autocomplete="username"
			required
			minlength="1"
			maxlength="32"
		/>
	</div>
	<div class="field">
		<label for="password">Password:</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password..."
			autocomplete="new-password"
			required
			minlength="8"
			max="32"
		/>
	</div>
	<div class="field">
		<label for="repeatPassword">Repeat password:</label>
		<input
			type="password"
			name="repeatPassword"
			id="repeatPassword"
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
