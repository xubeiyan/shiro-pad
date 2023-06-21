<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { clipboard } from '@skeletonlabs/skeleton';

	import BackIcon from '../../../assets/icons/back.svelte';
	import CopyIcon from '../../../assets/icons/copy.svelte';
	import CopiedIcon from '../../../assets/icons/check.svelte';
	import SaveIcon from '../../../assets/icons/save.svelte';

	let code = '';
	let copied = false;
	// 语言
	let language = 'html';
	// 保存时间
	let keeptime = '1h';
</script>

<div class="flex h-full max-h-full p-2 gap-2">
	<div class="card w-1/2 p-2">
		<a href="/" class="btn btn-sm variant-filled-surface">
			<span><BackIcon /></span>
			返回
		</a>
		<div class="flex flex-row gap-4 mt-4">
			<label class="label w-1/2">
				<span>语言</span>
				<select class="select" bind:value={language}>
					<option value="javascript">JavaScript</option>
					<option value="html">HTML</option>
					<option value="css">CSS</option>
					<option value="java">Java</option>
					<option value="markdown">MarkDown</option>
					<option value="bash">Bash</option>
				</select>
			</label>
			<label class="label w-1/2">
				<span>保留时间</span>
				<select class="select" bind:value={keeptime}>
					<option value="burn">阅后即焚</option>
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
				class="w-full flex-grow dark:bg-slate-500 font-mono p-2 rounded-md"
				placeholder="粘贴代码至这里..."
				bind:value={code}
			/>
		</label>
		<div class="my-4">
			<button class="btn btn-sm variant-filled-primary">
				<span><SaveIcon /></span>保存
			</button>
			<button
				class="btn btn-sm variant-filled-secondary"
				use:clipboard={window.location.href}
				on:click={() => (copied = true)}
			>
				{#if copied}
					<span><CopiedIcon /></span>已复制
				{:else}
					<span><CopyIcon /></span>复制地址
				{/if}
			</button>
		</div>
	</div>
	<div class="card w-1/2 h-full p-2">
		<CodeBlock class="w-full h-full" {language} buttonLabel="复制" code={`${code}`} />
	</div>
</div>
