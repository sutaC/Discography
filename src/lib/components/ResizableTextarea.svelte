<script lang="ts">
	export let id: string = '';
	export let name: string = '';
	export let value: string = '';
	export let cols: number = 5;
	export let rows: number = 5;
	export let required: boolean = false;
	let textarea: HTMLTextAreaElement | undefined;

	// Auto resize
	$: if (textarea && value) {
		const count = value.split('\n').length;
		textarea.style.height = `${(count + 1) * 16}px`;
	}
</script>

<textarea {name} {id} {cols} {rows} {required} bind:value bind:this={textarea}></textarea>

<style>
	textarea {
		resize: none;
		min-height: calc(16px * 20);
	}
</style>
