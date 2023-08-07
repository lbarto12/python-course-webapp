
<!-- Script -->
<script lang="ts">
    import styles from './Input.module.css';

    export let value: string = "";

</script>

<!-- Component -->
<input {...$$restProps} bind:value="{value}" class="{$$restProps.class} {styles.input}">


<!-- Style -->
<style>

</style>