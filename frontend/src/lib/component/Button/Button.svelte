<!-- Script -->
<script lang="ts">
	import styles from './Button.module.css';

	export let onClick: () => void = () => {};
</script>

<!-- Component -->

<button on:click={onClick} {...$$restProps} class="{styles.button} {$$restProps.class}">
	<slot />
</button>
