<script lang="ts">
	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let cols: number = 5;
	export let rows: number = 5;
	export let required: boolean = false;
	export let placeholder: undefined | string | null = undefined;
	export let connectValue: number = 0;
	let textarea: HTMLTextAreaElement | undefined;

	// Auto resize
	$: if (value) {
		connectValue = Math.max(value.split('\n').length, connectValue);
	}

	$: if (textarea) {
		textarea.style.height = `${connectValue + 1}em`;
	}
</script>

<textarea {name} {id} {cols} {rows} {required} {placeholder} bind:value bind:this={textarea}
></textarea>

<style>
	textarea {
		all: unset;
		box-sizing: border-box;
		resize: none;
		overflow: hidden;
		margin-top: 0.25rem;
		border: 1px solid var(--clr-text);
		min-height: calc(16px * 10);
		background-color: var(--clr-background);
		padding: 0.25rem 0.5rem;
		border-radius: 1rem;
		box-shadow: inset 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
		font-size: 0.833rem;
		transition: all 150ms ease-out;
	}

	textarea:hover {
		translate: 0 -2px;
		box-shadow:
			inset 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2),
			0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
	}

	textarea:active {
		translate: 0;
		box-shadow: inset 0 0.2rem 0.2rem hsla(0, 0%, 0%, 0.2);
	}
</style>
