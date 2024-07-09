<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>

<h1>{data.title} - {data.author}</h1>

<small>{data.id}</small>

<div>
	<p>Lyrisc</p>
	<pre>{data.lyrics}</pre>
</div>

<div>
	<p>Chords:</p>
	<pre>{data.chords}</pre>
</div>
