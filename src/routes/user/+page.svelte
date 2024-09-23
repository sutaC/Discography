<script lang="ts">
	import type { PermissionsObject } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';
	import IconButton from '$lib/components/IconButton.svelte';
	import CustomButton from '$lib/components/CustomButton.svelte';

	export let data: PageServerData;

	let slug = '';
	let users: { login: string; permissions: PermissionsObject }[] = [];

	onMount(() => {
		const url = new URL(location.href);
		const query = url.searchParams.get('q');
		slug = query ?? '';
		if (query) handleSearch();
	});

	const handleSearch = async () => {
		if (slug.length === 0) users = [];
		try {
			const res = await fetch(`user/${encodeURI(slug)}`);
			if (!res.ok) return;
			if (res.headers.get('Content-Type') !== 'text/json') return;

			const data = (await res.json()) as
				| { login: string; permissions: PermissionsObject }[]
				| undefined
				| null;
			users = data ?? [];
		} catch (error) {
			console.error(error);
		}
	};
</script>

<main>
	<h1>Manage users</h1>

	<div class="searchBar">
		<input
			class="Input"
			type="search"
			placeholder="Search..."
			bind:value={slug}
			on:input={handleSearch}
		/>
		<IconButton on:click={handleSearch} tooltip="Search">
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
	</div>

	<div class="users">
		{#each users as user}
			<div class="user">
				<span class="login">{user.login}</span>
				<!-- TODO: add stars -->
				<small class="stars">2137 stars</small>
				<form method="post" action="?/update">
					<div class="permissions">
						<div class="perm">
							<label for={`perm-add-${user.login}`}>ADD:</label>
							<input
								type="checkbox"
								id={`perm-add-${user.login}`}
								name="adding"
								checked={user.permissions.adding}
								disabled={data.disabledUsers.includes(user.login)}
							/>
						</div>
						<div class="perm">
							<label for={`perm-del-${user.login}`}>DEL:</label>
							<input
								type="checkbox"
								name="deleting"
								id={`perm-del-${user.login}`}
								checked={user.permissions.deleting}
								disabled={data.disabledUsers.includes(user.login)}
							/>
						</div>
						<div class="perm">
							<label for={`perm-upd-${user.login}`}>UPD:</label>
							<input
								type="checkbox"
								name="updating"
								id={`perm-upd-${user.login}`}
								checked={user.permissions.updating}
								disabled={data.disabledUsers.includes(user.login)}
							/>
						</div>
						<div class="perm">
							<label for={`perm-grt-${user.login}`}>GRT:</label>
							<input
								type="checkbox"
								name="granting"
								id={`perm-grt-${user.login}`}
								checked={user.permissions.granting}
								disabled={data.disabledUsers.includes(user.login)}
							/>
						</div>
						<input
							type="hidden"
							name="login"
							value={user.login}
							disabled={data.disabledUsers.includes(user.login)}
						/>
					</div>
					<CustomButton disabled={data.disabledUsers.includes(user.login)}>Update</CustomButton>
				</form>
			</div>
		{:else}
			<small>No users to display...</small>
		{/each}
	</div>
</main>

<style>
	main {
		padding: 0 1rem;
		text-align: center;
	}

	.searchBar {
		max-width: 50ch;
		display: flex;
		gap: 1rem;
		margin: 2rem auto;
	}

	.searchBar input {
		margin: unset;
		text-align: left;
		border: 1px solid var(--clr-text);
	}

	.user {
		padding: 1rem;
		background: var(--grd-rad-secondary);
		border-radius: 1rem;
		box-shadow: 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
		max-width: 30rem;
		margin: auto;
	}

	.login {
		font-weight: bold;
	}

	:is(.login, .stars) {
		display: block;
		text-align: left;
		margin: 0.25rem 0;
	}

	.permissions {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		gap: 1rem;
		border-radius: 1rem;
		margin: 0.5rem 0;
		padding: 0.75rem 0.25rem;
		border: 1px solid var(--clr-text);
	}

	.perm {
		flex: 1;
	}

	.perm input {
		position: relative;
		cursor: pointer;
	}

	.perm input::after {
		content: ' ';
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset: 50%;
		translate: -50% -50%;
		aspect-ratio: 1;
		width: 1.25rem;
		border-radius: 0.25rem;
		border: 1px solid var(--clr-text);
		background-color: var(--clr-background);
		box-shadow: inset 0 0.2rem 0.2rem rgba(0, 0, 0, 0.2);
		transition: all 150ms ease-out;
	}

	.perm input:checked::after {
		content: 'x';
	}

	.perm input:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	.user form :global(button) {
		margin-left: auto;
	}

	@media (width > 800px) {
		.users {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 1rem;
		}

		.user {
			margin: 0;
			flex: 1;
		}
	}
</style>
