<header>
	<a class="logoContainer" href="/">
		<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="48" height="48" rx="24" fill="#090E1D" />
			<rect x="15" y="15" width="18" height="18" rx="9" fill="#6B5BE6" />
			<circle cx="24" cy="24" r="1" fill="#090E1D" />
		</svg>
		<span class="heading">Discography</span>
	</a>

	<div class="controls">
		<button>
			<abbr title="Search">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-search"
					viewBox="0 0 16 16"
				>
					<path
						d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
					/>
				</svg>
			</abbr>
		</button>
		<button>
			<abbr title="Menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-list"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			</abbr>
		</button>
	</div>
</header>

<slot />

<footer>
	<small>
		Made by <a href="https://github.com/sutaC" target="_blank" rel="noopener noreferrer">sutaC</a>
	</small>
</footer>

<style>
	header {
		padding: 1rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--clr-primary);
		box-shadow: 0 0 0.5rem black;
	}

	.logoContainer {
		all: unset;
		cursor: pointer;
	}

	.logoContainer,
	.controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	.heading {
		font-family: 'Nova Square', sans-serif;
		font-size: 2rem;
		font-weight: bold;
	}

	.controls button {
		all: unset;
		display: block;
		border-radius: 100%;
		padding: 0.25rem;
		cursor: pointer;
		text-align: center;
		transition: all 150ms ease-out;
	}

	.controls button:hover {
		translate: 0 -0.125rem;
		opacity: 0.8;
	}

	.controls button:active {
		translate: 0;
		opacity: 1;
		background: var(--grd-rad-accent);
		box-shadow: 0 0 1rem var(--clr-accent);
	}

	footer {
		margin-top: 1rem;
		padding: 1rem;
		position: sticky;
		top: 100vh;
		text-align: center;
		background-color: var(--clr-primary);
	}

	footer a {
		color: inherit;
	}
</style>
