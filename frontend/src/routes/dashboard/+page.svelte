<!-- Script -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/component/Button/Button.svelte';
	import Card from '$lib/component/Card/Card.svelte';
	import CircularProgress from '$lib/component/CircularProgress/CircularProgress.svelte';
	import Problem from '$lib/component/Problem/Problem.svelte';
	import styles from './Dashboard.module.css';

	export let data: any;

	function calcProgress(): number {
		return data.completion.completed / data.completion.total;
	}
	const keys = Object.keys(data.completion.units);
	keys.sort((a: any, b: any) => {
		return data.completion.units[a].id - data.completion.units[b].id;
	});

	let next_unit: string = data.next.unit;
	let next_page: number = data.next.page;

	async function gotoNext() {
		await goto(`/problem/${next_unit.replaceAll(' ', '_')}/${next_page}`);
	}
</script>

<!-- Component -->
<div>
	<Card>
		<h3>{data.name}'s Python Dashboard</h3>
	</Card>
	<div class="{styles.quickview_container}">
		<Card class="{styles.progress_card}">
			<div>
				<CircularProgress progress={calcProgress()} />
			</div>
			<h3>{data.completion.completed} / {data.completion.total} Lessons Completed</h3>
		</Card>
		<Card class="{styles.next_lesson_card}">
			<h3>Up Next:</h3>
			<Button
				onClick={gotoNext}
			>
				<iconify-icon icon="ph:play-fill" style="font-size: 20px; color: white; padding: 10px" />
				<h3>{next_unit}: {data.next.page_name}</h3>
			</Button>
		</Card>
	</div>
	<div class="{styles.problems_list}">
		<h3 class="{styles.unit_title}">Units:</h3>
		{#each keys as problem}
			<Problem title={problem} data={data.completion.units[problem]} />
		{/each}
	</div>
</div>
