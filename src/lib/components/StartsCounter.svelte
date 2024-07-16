<script lang="ts">
	export let songId: number;
	export let logedIn: boolean;
	export let startsCount: number = 0;

	let stared = false;

	const handleClick = async () => {
		if (!logedIn) return;
		if (stared) {
			// remove
			await fetch(`/song/${songId}/stars`, { method: 'delete' });
			startsCount--;
		} else {
			// add
			await fetch(`/song/${songId}/stars`, { method: 'put' });
			startsCount++;
		}
		stared = !stared;
	};
</script>

<div class="starsCounter">
	{#if logedIn}
		<button on:click|preventDefault={handleClick}>Stared {stared ? '+' : '-'}</button>
	{/if}
	<span>Stars: {startsCount}</span>
</div>

<style>
	.starsCounter > * {
		margin-bottom: 0.25rem;
		display: block;
		text-align: center;
	}
</style>
