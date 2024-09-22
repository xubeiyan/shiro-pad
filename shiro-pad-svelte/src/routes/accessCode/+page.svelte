<script>
	let accessCode = '';
	const toAcessCodePage = () => {
		if (accessCode == '') return;
		window.location.href = `/accessCode/${accessCode}`;
	};
	const params = new URLSearchParams(window.location.search);
	$: invalidCode = params.has('invalidCode');
</script>

<div class="container h-full mx-auto flex flex-col gap-4 justify-center items-center">
	<div class="text-center flex gap-2 items-center">
		<input class="input px-3 py-1" placeholder="输入四位的神秘代码" bind:value={accessCode} />
		<button class="btn btn-sm variant-outline-primary" on:click={toAcessCodePage}>确认</button>
	</div>
	{#if invalidCode}
		<div class="alert variant-ghost-error">
      <h2>错误</h2>
			<p class="alert-message">没有找到代码对应的Pad</p>
		</div>
	{/if}
</div>
