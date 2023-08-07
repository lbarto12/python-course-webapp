
<!-- SETUP PAGE -->

<!-- Script -->
<script lang="ts">
	import { fetchAsync } from "$lib/services/fetch-service";
	import { onMount } from "svelte";
    import styles from "./Home.module.css";
	import Card from "$lib/component/Card/Card.svelte";
	import Button from "$lib/component/Button/Button.svelte";
	import Input from "$lib/component/Input/Input.svelte";
	import { goto } from "$app/navigation";

    export let data: any;

    let name: string = "";


    onMount(async() => {
        if (data.redirect) {
            await goto(data.redirect);
        }
    });

    async function onStart() {
        let res: string = await fetchAsync("POST", "/user/name", {
            name
        });

        if (res) {
            await goto("/dashboard");
        }
    }

</script>

<!-- Component -->
<div class="page">
    <Card>
        <form on:submit|preventDefault={onStart} style="height: 80vh; width: 80vw;">
            <img src="/images/general/python.png" alt="">
            <h1>Hey There!</h1>
            <p>What's your name?</p>
            <div><Input bind:value="{name}" required type="text" name="name" id="name"/></div>            
            <Button>
                Start!
            </Button>
        </form>
    </Card>
</div>


<!-- Style -->
<style>
    .page {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 100px;
        height: 100px;
    }
</style>