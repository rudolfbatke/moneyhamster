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
		padding: 0 1rem;
		padding-top: 0.9rem;
	}

	div {
		display: block;
		color: var(--text-color);
		font-size: 0.8rem;
	}
</style>
