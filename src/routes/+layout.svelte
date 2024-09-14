<script lang="ts">
	import IconButton from '$lib/components/IconButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	export let data;

	let menuOpen = false;
	let searchBarOpen = false;

	const handleToggleMenu = () => (menuOpen = !menuOpen);
</script>

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
		<IconButton tooltip="Search" on:click={() => (searchBarOpen = !searchBarOpen)}>
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
		</IconButton>
		<IconButton tooltip="Menu" on:click={handleToggleMenu}>
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
		</IconButton>
	</div>
</header>

<SearchBar bind:open={searchBarOpen} />

<aside class:open={menuOpen}>
	<nav>
		<div class="option">
			<IconButton tooltip="Close" on:click={handleToggleMenu}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					class="bi bi-arrow-left-short"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
					/>
				</svg>
			</IconButton>
		</div>
		<a href="/" class="option" on:click={handleToggleMenu}>Home</a>
		<a href="/about" class="option" on:click={handleToggleMenu}>About</a>
		{#if !!data.permissions}
			<a href="/profile" class="option" on:click={handleToggleMenu}>Profile</a>
		{:else}
			<a href="/login" class="option" on:click={handleToggleMenu}>Login</a>
		{/if}
		{#if data.permissions?.adding}
			<a href="/song/add" class="option" on:click={handleToggleMenu}>Add Song</a>
			<a href="/author/add" class="option" on:click={handleToggleMenu}>Add Author</a>
		{/if}
		{#if data.permissions?.granting}
			<a href="/user" class="option" on:click={handleToggleMenu}>Manage users</a>
		{/if}
	</nav>
</aside>

<div class="backdrop" class:open={menuOpen || searchBarOpen}></div>

<slot />

<footer>
	<small>
		Made by <a
			href="https://github.com/sutaC"
			target="_blank"
			rel="noopener noreferrer"
			class="Link">sutaC</a
		>
	</small>
</footer>

<style>
	header {
		position: sticky;
		top: 0;
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

	footer {
		margin-top: 1rem;
		padding: 1rem;
		position: sticky;
		top: 100vh;
		text-align: center;
		background-color: var(--clr-primary);
	}

	aside {
		display: none;
	}

	@keyframes slideIn {
		from {
			translate: 100%;
		}
		to {
			translate: 0;
		}
	}

	aside.open {
		height: 100vh;
		width: clamp(10rem, 50vw, 20rem);
		background-color: var(--clr-secondary);
		display: block;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 100;
		isolation: isolate;
		animation: slideIn 150ms ease-out;
	}

	.backdrop.open {
		display: block;
		position: fixed;
		inset: 0;
		height: 100vh;
		width: 100vw;
		background-color: hsla(0, 0%, 0%, 0.2);
		z-index: 99;
	}

	nav .option {
		display: block;
		text-align: center;
		border-bottom: 1px solid var(--clr-text);
		padding: 0.5rem;
	}

	nav .option:first-child {
		padding: 0.25rem 0.5rem 0;
		background-color: var(--clr-primary);
	}

	nav a {
		all: unset;
		cursor: pointer;
		transition: all 150ms ease-out;
	}

	nav a:hover {
		translate: 0 2px;
	}

	nav a:active {
		translate: 0;
	}
</style>
