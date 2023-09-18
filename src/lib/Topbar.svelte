<header>
	<h1>
		<slot>Hamster Cash</slot>
	</h1>
	<div>
		<slot name="right" />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0 1rem;
		align-items: center;
	}
	h1 {
		line-height: 1.5rem;
	}
</style>
