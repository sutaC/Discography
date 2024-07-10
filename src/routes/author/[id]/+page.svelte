<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<a href="/">Home</a>
<a href={`/song/${data.id}/edit`}>Edit</a>

<h1>{data.name}</h1>
