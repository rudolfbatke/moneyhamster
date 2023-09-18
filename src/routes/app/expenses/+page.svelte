<script>
	import Button from '$lib/Button.svelte';
	import Topbar from '$lib/Topbar.svelte';
</script>

<Topbar>
	Expenses
	<Button slot="right" on:click={() => console.log('new')}>New +</Button>
</Topbar>
