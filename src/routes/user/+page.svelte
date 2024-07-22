<script lang="ts">
	import type { PermissionsObject } from '$lib/types';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

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

<header>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>

<main>
	<h1>Users managment</h1>
	<div class="searchbar">
		<label for="searchbar">Search:</label>
		<input
			type="search"
			name="searchbar"
			id="searchbar"
			bind:value={slug}
			on:input|preventDefault={handleSearch}
		/>
		<button on:click|preventDefault={handleSearch}>Search</button>
	</div>

	<div class="users">
		{#each users as user}
			<div class="user">
				<p>{user.login}</p>
				<form class="permissions" method="post" action="?/update">
					<div class="perm">
						<label for={`perm-add-${user.login}`}>Adding:</label>
						<input
							type="checkbox"
							id={`perm-add-${user.login}`}
							name="adding"
							checked={user.permissions.adding}
							disabled={data.disabledUsers.includes(user.login)}
						/>
					</div>
					<div class="perm">
						<label for={`perm-del-${user.login}`}>Deleting:</label>
						<input
							type="checkbox"
							name="deleting"
							id={`perm-del-${user.login}`}
							checked={user.permissions.deleting}
							disabled={data.disabledUsers.includes(user.login)}
						/>
					</div>
					<div class="perm">
						<label for={`perm-upd-${user.login}`}>Updating:</label>
						<input
							type="checkbox"
							name="updating"
							id={`perm-upd-${user.login}`}
							checked={user.permissions.updating}
							disabled={data.disabledUsers.includes(user.login)}
						/>
					</div>
					<div class="perm">
						<label for={`perm-grt-${user.login}`}>Granting:</label>
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
					<button type="submit" disabled={data.disabledUsers.includes(user.login)}>Update</button>
				</form>
			</div>
		{:else}
			<small>No users to display...</small>
		{/each}
	</div>
</main>

<style>
	main {
		text-align: center;
	}

	.users {
		margin: 1rem 0;
	}

	.user {
		display: flex;
		align-items: center;
		gap: 1rem;
		border: 1px solid #000;
		max-width: 50%;
		margin: 0.5rem auto;
		padding: 0.5rem;
	}

	.user .permissions {
		display: flex;
		gap: 1rem;
	}

	.user p {
		margin: 0;
		font-weight: bold;
	}
</style>
