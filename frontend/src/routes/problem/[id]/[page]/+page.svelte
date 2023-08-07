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

	export let data: any;

	let value: string = data.page.initial;
	let desc: HTMLParagraphElement;
	let output: HTMLParagraphElement;


	$: {
		if (desc) {
			desc.innerHTML = description_format(data.page.description);
		}
	}



	function description_format(desc: string): string {
		return desc.replaceAll(
			/<code>((.|\n)*?)<\/code>/g,
			'<div style="padding: 5px; border-radius: 4px; background-color: grey;"><code style="white-space: pre-wrap;">$1</code></div>'
		);
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
		let result = await Python.run(value);
		output.innerText = result.out;
	}

	async function submit() {
		let result = await Python.submit(data.id, data.current_page, value);

		let response: string = '';

		if (result.success) {
			response += result.out + '\nCorrect!';
			Stats.setComplete(data.id, data.current_page);
            data.page.completed = true;
		} else {
			response += result.out + '\nIncorrect!\n';
			response += 'Expected: ' + result.expected + '\n';
		}

		output.innerText = response;
	}
</script>

<!-- Component -->
<div
	style="
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--a2);
"
>
	<button
		on:click={() => goto('/dashboard')}
		style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: var(--a2);
        border: none;
        outline: none;
        cursor: pointer;
        color: white;
    "
	>
		<iconify-icon
			icon="mdi:arrow-left"
			style="font-size: 30px; margin-left: 20px; cursor: pointer;"
		/>
	</button>
</div>
<div class="page">
	<Card style="width: 50%; flex-wrap: wrap; align-content: start; flex-flow: column; padding: 20px">
        {#if data.page.completed}
            <iconify-icon
                icon="mdi:check-circle"
                style="font-size: 30px; margin-right: 10px; color: green;"
            />
            Completed
        {/if}
        <Card style="width: 100%;">
			<h2>{data.id}</h2>
		</Card>
		<Card style="width: 100%; flex: 1 1 auto; flex-wrap: wrap; display: flex; align-items: start;">
			<p bind:this={desc} style="font-size: 14px;" />
		</Card>
		<Card style="gap: 30px;">
			<Button onClick={async () => await paginate(-1)}>{'<'}</Button>
			{data.current_page + 1} / {data.num_pages}
			<Button onClick={async () => await paginate(1)}>{'>'}</Button>
		</Card>
	</Card>
	<Card style="flex-wrap: wrap; align-items: start; align-content: start;">
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
		<div style="width: 100%; height: 40px; position: relative;">
			<p style="position: absolute; left 0;">Output</p>
			<Button onClick={submit} style="position: absolute; right: 0;">Submit</Button>
			<Button onClick={run} style="position: absolute; right: 100px;">Run</Button>
		</div>
		<Card
			style="
            width: 95%; 
            display: block; 
            background-color: var(--a2); 
            min-height: 100px;"><p style="white-space: pre-wrap;" bind:this={output} /></Card
		>
	</Card>
</div>

<!-- Style -->
<style>
	.page {
		display: flex;
		padding: 20px;
		min-height: 90vh;
	}
</style>
