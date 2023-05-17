<script>
  import ColorSwitch from "./ColorSwitch.svelte";
</script>

<footer>
  <div class="container">
    <span>2022 - 2023 Shiro Pad</span>
    <span>
      <ColorSwitch />
    </span>
  </div>
</footer>

<style>
  footer {
    position: absolute;
    bottom: 0;
  }

  .container {
    display: flex;
    gap: 5em;
    height: 2em;
  }
</style>
