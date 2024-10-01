<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import IconButton from './IconButton.svelte';

	export let isScrolling = false;
	$: isScrolling = scrollId !== null;

	let scrollId: number | null = null;
	let speed = 5;

	onMount(() => {
		speed = Number(localStorage.getItem('scroll-speed') ?? 5);
		if (speed < 1 || speed > 10) {
			console.error(`Saved speed was out of range <1, 10> - given ${speed} - now set to 5`);
			speed = 5;
		}
	});

	$: ((speed) => {
		if (!browser) return;
		if (speed < 1 || speed > 10) {
			console.error(`Saved speed was out of range <1, 10> - given ${speed} - now set to 5`);
			speed = 5;
		}
		localStorage.setItem('scroll-speed', String(speed));
	})(speed);

	const isAtBottom = () =>
		document.documentElement.clientHeight + window.scrollY >=
		(document.documentElement.scrollHeight || document.documentElement.clientHeight);

	export const handleScroll = () => {
		if (!browser) return;
		if (scrollId === null) {
			if (isAtBottom()) return;
			scrollId = setInterval(() => {
				window.scrollBy({ top: speed, left: 0, behavior: 'smooth' });
				if (isAtBottom()) handleScroll();
			}, 250);
		} else {
			clearInterval(scrollId);
			scrollId = null;
		}
	};
</script>

<div class="scrollControls" class:scrolling={scrollId !== null}>
	<input type="range" aria-label="Speed" min="1" max="10" step="1" bind:value={speed} />

	<IconButton tooltip="Scroll" on:click={handleScroll}>
		{#if isScrolling}
			<!-- Pause icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="bi bi-pause-circle"
				viewBox="0 0 16 16"
			>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
				<path
					d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"
				/>
			</svg>
		{:else}
			<!-- Play icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				class="bi bi-play-circle"
				viewBox="0 0 16 16"
			>
				<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
				<path
					d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"
				/>
			</svg>
		{/if}
	</IconButton>
</div>

<style>
	.scrollControls {
		display: none;
	}

	.scrollControls.scrolling {
		position: fixed;
		left: 0;
		bottom: -1px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 50;
		padding: 0.75rem 1rem 0.5rem;
		background-color: var(--clr-secondary);
	}
</style>
