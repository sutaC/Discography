<header>
	<h1>Login</h1>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>

<form action="/login" method="post">
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

<style>
	header {
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
