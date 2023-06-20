<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { clipboard } from '@skeletonlabs/skeleton';

	import BackIcon from '../../../assets/icons/back.svelte';
	import CopyIcon from '../../../assets/icons/copy.svelte';
	import CopiedIcon from '../../../assets/icons/check.svelte';

	let code = '<div>This is meta</div>';
	let copied = false;
</script>

<div class="flex h-full">
	<div class="card w-1/2 p-2 m-2">
		<a href="/" class="btn btn-sm variant-filled-surface">
			<span><BackIcon /></span>
			返回
		</a>
		<label class="label my-4 h-3/4 flex flex-col">
			<span>粘贴代码</span>
			<textarea
				class="w-full flex-grow dark:bg-slate-500 font-mono p-2 rounded-md"
				placeholder="粘贴代码至这里..."
				bind:value={code}
			/>
		</label>
		<label class="label">
			<span>语言</span>
			<select class="select">
				<option value="1">JavaScript</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
				<option value="4">Option 4</option>
				<option value="5">Option 5</option>
			</select>
		</label>
		<div>
			<button
				class="btn btn-sm variant-filled"
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
	<div class="card w-1/2 p-2 m-2">
		<CodeBlock class="w-full h-full" language="html" buttonLabel="复制" code={`${code}`} />
	</div>
</div>
