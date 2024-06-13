<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';

	import { page } from '$app/stores';

	import BackIcon from '$icons/back.svelte';
	import CopyIcon from '$icons/copy.svelte';
	import CopiedIcon from '$icons/check.svelte';
	import SaveIcon from '$icons/save.svelte';

	let copied = false;
	let onlyView = false;

	export let data;
	// 语言，代码，保留时间
	let { ulid, language, code, keepTime, expireAt } = data;
	
	// 如果url是/pad/1则开启onlyView
	if ($page.url.pathname == '/pad/1') {
		code = '<div>This is meta</div>';
		language = 'html';
		onlyView = true;
	}

	// 复制url
	const copyUrl = async () => {
		const origin = window.location.origin;
		let url = `${origin}/viewPad/${ulid}`;
		if (ulid == undefined) {
			url = `${origin}/pad/1`;
		}

		try {
			await navigator.clipboard.writeText(url);
			copied = true;
		} catch (err) {
			console.log('unable to copy');
		}
	};
</script>

<div class="sm:flex sm:h-full sm:max-h-full p-2 sm:gap-2">
	<form class="card sm:w-1/2 p-2 w-full" method="POST" action="?/update">
		<a href="/" class="btn btn-sm variant-filled-surface">
			<span><BackIcon /></span>
			返回
		</a>
		<input type="hidden" name="id" value={$page.url.pathname} />
		<div class="flex flex-row gap-4 mt-4">
			<label class="label w-1/2">
				<span>语言</span>
				<select name="language" class="select" bind:value={language}>
					<option value="bash">Bash</option>
					<option value="c">C</option>
					<option value="cpp">C++</option>
					<option value="css">CSS</option>
					<option value="html">HTML</option>
					<option value="golang">Go</option>
					<option value="java">Java</option>
					<option value="javascript">JavaScript</option>
					<option value="markdown">MarkDown</option>
					<option value="tex">LaTeX</option>
					<option value="typescript">TypeScript</option>
					<option value="yml">YAML</option>
					<option value="plaintext">纯文本</option>
				</select>
			</label>
			<label class="label w-1/2">
				<span>保留时间</span>
				<select name="keepTime" class="select" bind:value={keepTime}>
					<option value="0s">阅后即焚</option>
					<option value="5m">5分钟</option>
					<option value="30m">30分钟</option>
					<option value="1h">1小时</option>
					<option value="5h">5小时</option>
					<option value="1d">1天</option>
					<option value="7d">1周</option>
				</select>
			</label>
		</div>
		<label class="label my-4 h-3/4 flex flex-col">
			<span>粘贴代码</span>
			<textarea
				name="code"
				required
				class="w-full h-72 flex-grow dark:bg-slate-600 dark:placeholder-gray-300 font-mono p-2 rounded-md"
				placeholder="粘贴代码至这里..."
				bind:value={code}
			/>
		</label>
		<div class="my-4 flex justify-end items-center gap-2">
			{#if keepTime == 'burnAfterRead'}
				<span>注意本pad为阅后即焚！</span>
			{:else if expireAt != ''}
				<span>有效至: {expireAt}</span>
			{/if}

			{#if !onlyView}
				<button type="submit" class="btn btn-sm variant-filled-primary" disabled={code == ''}>
					<span><SaveIcon /></span>保存
				</button>
			{/if}
			<button type="button" class="btn btn-sm variant-filled-secondary" disabled={ulid == undefined} on:click={() => copyUrl()}>
				{#if copied}
					<span><CopiedIcon /></span>已复制
				{:else}
					<span><CopyIcon /></span>复制地址
				{/if}
			</button>
		</div>
	</form>

	<div class="card w-full sm:w-1/2 h-1/2 sm:h-full p-2">
		<CodeBlock class="w-full h-full" {language} lineNumbers={true} buttonLabel="复制" code={`${code}`} />
	</div>
</div>
