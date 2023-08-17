<!-- Script -->
<script lang="ts">
	import Card from '$lib/component/Card/Card.svelte';
	import CodeMirror from 'svelte-codemirror-editor';
	import { python } from '@codemirror/lang-python';
	import { oneDark } from '@codemirror/theme-one-dark';
	import Button from '$lib/component/Button/Button.svelte';
	import { goto } from '$app/navigation';
	import 'iconify-icon';
	import { Python } from '$lib/services/python-service';
	import { Stats } from '$lib/services/stats-service';
	import Testcases from '$lib/component/Testcases/Testcases.svelte';
	import { description_format } from '$lib/util/formats';
	import styles from './Problem.module.css';

	export let data: any;

	let value: string = data.page.initial;
	let desc: HTMLParagraphElement;
	let output: HTMLParagraphElement;
	$: success = Array.from({ length: data.page.expected.length }, () => -1);

	$: {
		if (desc) {
			desc.innerHTML = description_format(data.page.description);
		}
	}

	function has_testcases(): boolean {
		return typeof data.page.expected == 'object';
	}

	async function paginate(by: number) {
		let page = data.current_page;
		let num_pages = data.num_pages;
		console.log(page, num_pages);

		if (page + by < 0) {
			return;
		}

		if (page + by > num_pages - 1) {
			return;
		}
		await goto(`/problem/${data.id.split(' ').join('_')}/${page + by}`);
		value = data.page.initial;

	}


	async function run() {
		let result = await Python.submit(data.id, data.current_page,value);
		let response: string = '';
		if (result.results) {
			for (let i = 0; i < result.results.length; i++) {
				let res = result.results[i];
				response += `Testcase ${i + 1}: `;
				if (res) {
					response += 'Correct!\n';
				} else {
					response += 'Incorrect!\n';
					response += 'Last Output: ' + result.out + '\n';
				}
			}
		}
		output.innerText = response || result.out;
	}

	async function submit() {
		let result = await Python.submit(data.id, data.current_page, value);
		let response: string = '';

		if (result.results) {
			success = result.results;
		}

		if (result.success) {
			response += result.out + '\nCorrect!';
			Stats.setComplete(data.id, data.current_page);
            data.page.completed = true;
		} else {
			response += 'Incorrect!\n';
			if (result.in){
				response = `Testcase: ${result.testcase + 1}\n` + response
				response += 'Input: ' + result.in + '\n';
			} 
			response += 'Output: ' + result.out + '\n'
			response += 'Expected: ' + result.expected + '\n';
		}

		output.innerText = response;
	}
</script>

<!-- Component -->
<div class="{styles.navbar}">
	<button
		on:click={() => goto('/dashboard')}
		class="{styles.backbutton}"
	>
		<iconify-icon icon="mdi:arrow-left"/>
	</button>
</div>

<div class="{styles.page}">
	<Card class="{styles.left_panel_card}">
        {#if data.page.completed}
            <iconify-icon
                icon="mdi:check-circle"
                style="font-size: 30px; margin-right: 10px; color: green;"
            />
            Completed
        {/if}
        <Card class="{styles.problem_header}">
			<h2>{data.id}</h2>
		</Card>
		<Card class="{styles.description_panel}">
			<h3 style="margin: 0;">{data.page.title}</h3>
			<hr style="width: 100%"/>
			<p bind:this={desc} style="font-size: 14px;" />
		</Card>
		<Card class="{styles.pagination_panel}">
			<Button onClick={async () => await paginate(-1)}>{'<'}</Button>
			{data.current_page + 1} / {data.num_pages}
			<Button onClick={async () => await paginate(1)}>{'>'}</Button>
		</Card>
	</Card>
	<Card class="{styles.editor_container}">
		<CodeMirror
			lang={python()}
			theme={oneDark}
			bind:value
			styles={{
				'&': {
					minHeight: '450px',
					height: 'fit-content',
					width: '50vw'
				}
			}}
		/>
		<div class="{styles.submission_panel}">
			<p style="position: absolute; left 0;">Output</p>
			<Button onClick={submit} style="position: absolute; right: 0;">Submit</Button>
			<Button onClick={run} style="position: absolute; right: 100px;">Run</Button>
		</div>
		<div class="{styles.output_panel}">
			{#if has_testcases()}
				<Testcases bind:success="{success}" testcases={data.page.expected}/>
			{/if}	
			<Card
				class="{styles.output}"
				style="width: {has_testcases() ? '70%' : '95%'};">
				<p style="white-space: pre-wrap;" bind:this={output} />
			</Card>
		</div>
	</Card>
</div>