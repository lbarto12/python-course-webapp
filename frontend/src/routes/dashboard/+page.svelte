<!-- Script -->
<script lang="ts">
	import Button from '$lib/component/Button/Button.svelte';
	import Card from '$lib/component/Card/Card.svelte';
	import CircularProgress from '$lib/component/CircularProgress/CircularProgress.svelte';
	import Problem from '$lib/component/Problem/Problem.svelte';

	export let data: any;

	function calcProgress(): number {
		return data.stats.completed / data.stats.total;
	}
</script>

<!-- Component -->
<div>
	<Card>
		<h3>{data.name}'s Python Dashboard</h3>
	</Card>
	<div style="display: flex;">
		<Card style="justify-content: left; gap: 20px; width: 50vw;">
			<div>
				<CircularProgress progress={calcProgress()} />
			</div>
			<h3>{data.stats.completed} / {data.stats.total} Lessons Completed</h3>
		</Card>
		<Card style="justify-content: left; gap: 20px; width: 50vw;">Up Next</Card>
	</div>
	<div class="problems">
		<h3 style="padding-left: 20px;">Units: </h3>
		{#each Object.keys(data.problems) as problem}
			<Problem title={problem} data={data.problems[problem]} />
		{/each}
	</div>
</div>

<style>
</style>
