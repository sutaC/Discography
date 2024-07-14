<header>
	<h1>Delete account</h1>
	<p>Are you sure you want delete your account forever? It's a really long time!</p>

	<nav>
		<a href="/">Home</a>
		<a href="/profile">Profile</a>
	</nav>
</header>

<main>
	<form action="/profile/delete" method="post">
		<div class="field">
			<label for="password">Password:</label>
			<input type="password" name="password" id="password" />
		</div>
		<div class="foot">
			<button type="submit">Delete</button>
		</div>
	</form>
</main>

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
