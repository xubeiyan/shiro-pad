<script>
	import { SlideToggle } from '@skeletonlabs/skeleton';
	let dark = true;

	$: if (dark) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
</script>

<SlideToggle name="color-switch" size="sm" bind:checked={dark}>{dark ? '🌙' : '☀️'}</SlideToggle>
