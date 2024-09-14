<script lang="ts">
	import SongsDisplay from '$lib/components/SongsDisplay.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<main>
	<div class="hero">
		<h1>Hello <span class="highlight">{data.login}</span>!</h1>
		<nav>
			<a href="/logout" class="Link">Logout</a>
			<a href="/profile/reset" class="Link">Reset Password</a>
			<a href="/profile/delete" class="Link">Delete account</a>
		</nav>
	</div>

	<small>Stared songs ({data.songs.length})</small>

	<SongsDisplay songs={data.songs}>
		<small>Looks empty... Maybe you should star some songs!</small>
	</SongsDisplay>
</main>

<style>
	main {
		text-align: center;
	}

	.hero {
		text-align: left;
		padding: 1rem;
		background-color: var(--clr-secondary);
		translate: 0 -1rem;
		box-shadow: inset 0 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
	}

	h1 {
		margin: 0 0 2rem;
	}

	.hero a {
		margin-right: 1rem;
	}

	.highlight {
		color: var(--clr-accent);
	}

	@media (width >= 800px) {
		.hero {
			text-align: center;
		}

		.hero a {
			margin: 0 1rem;
		}
	}
</style>
