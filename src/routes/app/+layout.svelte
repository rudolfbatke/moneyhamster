<script>
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<main>
	<slot />
</main>
<Navbar />

<style>
	main {
		padding-bottom: 3.6rem;
	}
</style>
