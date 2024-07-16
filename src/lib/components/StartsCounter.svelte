<script lang="ts">
	export let songId: number;
	export let logedIn: boolean;
	export let startsCount: number = 0;
	export let isStared: boolean = false;

	const handleClick = async () => {
		if (!logedIn) return;
		if (isStared) {
			// remove
			await fetch(`/song/${songId}/stars`, { method: 'delete' });
			startsCount--;
		} else {
			// add
			await fetch(`/song/${songId}/stars`, { method: 'put' });
			startsCount++;
		}
		isStared = !isStared;
	};
</script>

<div class="starsCounter">
	{#if logedIn}
		<button on:click|preventDefault={handleClick}>Stared {isStared ? '+' : '-'}</button>
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
