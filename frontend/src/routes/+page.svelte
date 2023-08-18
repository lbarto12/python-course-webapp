
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
	import { Profile } from "$lib/services/profile-service";

    export let data: any;

    let name: string = "";


    onMount(async() => {
        if (data.redirect) {
            await goto(data.redirect);
        }
    });

    async function onStart() {
        if (await Profile.setUserName(data.fetch, name)) {
            await goto("/dashboard");
        }
    }

</script>

<!-- Component -->
<div class="{styles.page}">
    <Card>
        <form on:submit|preventDefault={onStart} class="{styles.intro_form}">
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
