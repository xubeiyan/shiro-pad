<script>
  let darkMode = false;

  $: if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
</script>

<label class="color-switch">
  <input type="checkbox" bind:checked={darkMode}/>
</label>

<style>
  :root {
    --width: 3.5em;
    --height: 1.5em;
    --transition-time: 300ms;
  }

  .color-switch {
    position: relative;
    width: var(--width);
    height: var(--height);
    display: flex;
  }

  .color-switch > input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .color-switch::before {
    position: absolute;
    inset: 0;
    background: #eee;
    border-radius: var(--height);
    padding: 1px;
    content: "";
    transition: all var(--transition-time) ease-in-out;
  }

  .color-switch:has(input:checked)::before {
    background: #999;
  }

  .color-switch:has(input)::after {
    position: absolute;
    left: 2px;
    top: 2px;
    width: calc(var(--height) - 4px);
    height: calc(var(--height) - 4px);
    content: "";
    background: black;
    border-radius: var(--height);
    transition: all var(--transition-time) ease-in-out;
  }

  .color-switch:has(input:checked)::after {
    transform: translateX(calc(var(--width) - var(--height)));
    background: white;
  }
</style>
