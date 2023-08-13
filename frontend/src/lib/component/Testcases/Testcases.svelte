<script lang="ts">
	import Card from "../Card/Card.svelte";

    export let testcases: Array<any>;
    export let success: Array<number>;

    $: {
        let diff = testcases.length - success.length;
        if (diff > 0) {
            for (let i = 0; i < diff; i++) {
                success.push(-1);
            }
        }
    }

</script>


<Card style="flex-wrap: wrap; justify-content: left; align-items: start; align-content: start; width: 25%">
    {#each testcases as testcase, i}
        <div style="width: 100%; color: {success[i] == 1 ? 'green' : (success[i] == -1 ? 'white' : 'red')}">
            <div style="display: flex; align-items: center; height: 20px;">
                <h4>Input: </h4>
                <p>{testcase.input}</p>
            </div>
            <div style="display: flex; align-items: center; height: 20px; margin-bottom: 10px;">
                <h4>Expected: </h4>
                <p>{testcase.output}</p>
            </div>
        </div>
    {/each}
</Card>