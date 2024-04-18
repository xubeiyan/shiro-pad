<script>
	export let data;
	let { type, padId } = data;
	$: headings =
		type == 'notFound'
			? '错误：未找到指定id的Pad'
			: type == 'expired'
			? '错误：对应id的Pad已超过其查看时间'
			: type == 'normalPad'
			? ''
			: '是否要访问对应id的Pad？';
	$: hintContent = type == 'usablePad' ? '点击“查看Pad”按钮查看对应Pad，注意此Pad是阅后即焚的' : '';
</script>

<div class="card m-8 p-12">
	<h1 class="h1">{headings}</h1>
	<p class="py-12">PadId 为 {padId} {hintContent}</p>
	<div class="flex gap-4">
		<a href="/" class="btn variant-filled-surface">返回首页</a>
		{#if type == 'usablePad'}
			<a href="/pad/{padId}" class="btn variant-filled">查看Pad</a>
		{/if}
	</div>
</div>
