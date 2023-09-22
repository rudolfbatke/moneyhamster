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
		align-items: center;
		background-color: var(--background-color);
		border-bottom: 1px solid var(--border-color);
	}

	h1 {
		position: sticky;
		left: 0;
		margin: 0.9rem 0 0.3rem 0;
		padding: 0 1rem;
	}
</style>
