<li>
	<span>
		<slot />
		<div>
			<slot name="sub" />
		</div>
	</span>
	<slot name="end" />
</li>

<style>
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 2.1rem;
		padding: 0 1rem;
		border-bottom: 1px solid var(--border-color);
	}

	div {
		display: block;
		color: var(--text-color);
		font-size: 0.8rem;
	}
</style>
