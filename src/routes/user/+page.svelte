<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header>
	<h1>Hello {data.username ?? '?'}!</h1>
	<nav>
		<a href="/">Home</a>
	</nav>
</header>
