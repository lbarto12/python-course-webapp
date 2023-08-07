<!-- Script -->
<script lang="ts">
    import styles from './Card.module.css';

    export let onClick: any = null;
</script>

<!-- Component -->
<div {...$$restProps} on:click={onClick} class="{styles.card} {$$restProps.class}">
    <slot/>
</div>


