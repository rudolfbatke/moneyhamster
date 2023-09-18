<header>
	<h1><slot /></h1>
	<div>
		<slot name="right" />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		padding: 0 1rem;
		min-height: 2rem;
	}
</style>
