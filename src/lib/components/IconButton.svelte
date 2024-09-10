<script lang="ts">
	export let tooltip = '';
</script>

<button on:click>
	<abbr title={tooltip}>
		<slot />
	</abbr>
</button>

<style>
	button {
		all: unset;
		display: block;
		border-radius: 100%;
		padding: 0.25rem;
		cursor: pointer;
		text-align: center;
		transition: all 150ms ease-out;
	}

	button:hover {
		filter: drop-shadow(0 0.125rem 0.125rem rgba(0, 0, 0, 0.5));
		translate: 0 -0.125rem;
		opacity: 0.8;
	}

	button:active {
		translate: 0;
		opacity: 1;
		filter: drop-shadow(
			0 0 0.5rem color-mix(in hsl, var(--clr-accent) 100%, var(--clr-background) 50%)
		);
	}
</style>
