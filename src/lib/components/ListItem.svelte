<script>
	// TODO: check if this component is still used by many other components

	export let border = false;
	export let sticky = false;
	export let lucent = false;
	export let highlighted = false;
</script>

<li class:highlighted class:border class:sticky class:lucent on:click on:keypress>
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
		padding-top: 0.4rem;
		align-items: center;
		cursor: pointer;
		background-color: var(--background-color);
		height: 2rem;
	}

	li:hover {
		background-color: var(--background-hover);
	}

	div {
		display: block;
		color: var(--text-color);
		font-size: 0.8rem;
	}

	.highlighted {
		background-color: var(--background-highlight);
	}

	.border {
		border-bottom: 1px solid var(--border-color);
	}

	.sticky {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	.lucent {
		opacity: 0.81;
	}
</style>
