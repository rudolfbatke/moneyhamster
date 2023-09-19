<header>
	<h1>
		<slot>Hamster Cash</slot>
	</h1>
	<slot name="end" />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0 1rem;
		align-items: center;
		position: sticky;
		background-color: var(--background-color);
		top: 0;
		border-bottom: 1px solid var(--border-color);
		min-height: 3rem;
	}
	h1 {
		margin: 0.9rem 0 0 0;
	}
</style>
