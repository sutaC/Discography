<script lang="ts">
	export let type: 'reset' | 'submit' | 'button' | null | undefined = undefined;
	export let disabled = false;
</script>

<button on:click {type} {disabled}><slot /></button>

<style>
	button {
		all: unset;
		display: block;
		cursor: pointer;
		background: var(--grd-lin-primary-secondary);
		border-radius: 1rem;
		padding: 0.5rem 2rem;
		box-shadow: 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
		transition: all 150ms ease-out;
	}

	button:not(:disabled):hover {
		translate: 0 -2px;
		box-shadow: 0 0.25rem 0.25rem hsla(0, 0%, 0%, 0.18);
	}

	button:active {
		translate: 0;
		box-shadow: 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}
</style>
