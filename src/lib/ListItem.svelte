<li>
	<span>
		<slot />
	</span>
	<slot name="end" />
</li>

<style>
	li {
		display: flex;
		justify-content: space-between;
		line-height: 3rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--border-color);
	}
</style>
