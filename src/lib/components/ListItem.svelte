<script>
	export let border = false;
	export let sticky = false;
	export let lucent = false;
</script>

<li class:border class:sticky class:lucent on:click on:keypress>
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
		min-height: 1.6rem;
		cursor: pointer;
		background-color: var(--background-color);
	}

	li:hover {
		background-color: var(--background-hover);
	}

	div {
		display: block;
		color: var(--text-color);
		font-size: 0.8rem;
	}

	li.border {
		border-bottom: 1px solid var(--border-color);
	}

	li.sticky {
		position: sticky;
		top: 0;
	}

	li.lucent {
		opacity: 0.81;
	}
</style>
