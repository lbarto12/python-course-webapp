<!-- Script -->
<script lang="ts">
	import { goto } from "$app/navigation";
    import Card from "../Card/Card.svelte";

    import 'iconify-icon';

    export let title: string;
    export let data: any;

    function getColor() {
        switch (data.difficulty) {
            case "Easy":
                return "green";
            case "Medium":
                return "orange";
            case "Hard":
                return "red";
            default:
                return "white";
        }
    } 

</script>

<!-- Component -->
<div>
    <Card
        onClick="{async() => {
            await goto(`/problem/${title.split(" ").join("_")}/0`);
        }}" 
        style="height: 30px; cursor: pointer;">
        <div style="width: 50%; display: flex; justify-content: left;">
            {#if data.completed}
                <iconify-icon 
                    icon="fluent-mdl2:completed" 
                    style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                    padding-right: 10px;
                    color: green;"
                />
            {:else}
                <iconify-icon 
                    icon="iconoir:info-empty"
                    style="
                    display: flex; 
                    justify-content: center; 
                    align-items: center;
                    padding-right: 10px;
                    color: blue;"
                />
            {/if}
            <h4>{title}</h4>
        </div>
        <div style="width: 50%; display: flex; justify-content: right; gap: 20px">
            <h4>{data.num_completed} / {data.pages.length}</h4>
            <h4 style="color: {getColor()};">{data.difficulty}</h4>
        </div>
    </Card>
</div>
