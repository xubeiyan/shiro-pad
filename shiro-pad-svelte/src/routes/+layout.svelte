<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import ColorSwitch from '../components/ColorSwitch.svelte';

	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);

	let appName = 'Shiro Pad';
</script>

<svelte:head>
	<title>{appName}</title>
</svelte:head>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">{appName}</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ColorSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
