<header>
	<div>
		<slot />
	</div>
	<div>
		<slot name="right" />
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		height: 2rem;
		background-color: #1f1f1f;
	}
</style>
