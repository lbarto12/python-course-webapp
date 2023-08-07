<script lang="ts">
</script>

<slot />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Roboto', sans-serif;
		background-color: #333;
		color: white;
		font-size: 16px;
		line-height: 1.5;
		overflow-x: hidden;
	}

	:global(:root) {
		--bg: #333;
		--a1: #4b4b4b;
        --a2: #5b5b5b;
        --color: #ccc;
        --border: #5a5a5a;
        --shadow: rgba(0,0,0,0.2);
		--interactive: #4CAF50;
		--interactive-hover: #46a049;
		--text: #fff;
	}
</style>
