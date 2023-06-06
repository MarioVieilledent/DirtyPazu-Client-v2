<script lang="ts">
  import Header from "./Header.svelte";
  import Nav from "./Nav.svelte";
  import DiscordAuth from "./DiscordAuth.svelte";
  import Dict from "./dict/Dict.svelte";

  let currentPage: 'home' | 'dict' | 'discordAuth';

  if (window.location.pathname === '/auth') {
    currentPage = 'discordAuth';
  } else {
    currentPage = 'dict';
  }
</script>

<div class="all fc">
  <div class="top f">
    <Header />
  </div>
  <div class="bottom f">
    <div class="left">
      <Nav />
    </div>
    <div class="right">
      {#if currentPage === "dict"}
        <Dict />
      {:else if currentPage === "discordAuth"}
        <DiscordAuth />
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  $top-height: 50px;
  $left-width: 200px;

  .all {
    width: 100%;
    height: 100%;
    background-color: #353331;

    .top {
      width: 100%;
      height: $top-height;
      background-color: #151311;
    }

    .bottom {
      width: 100%;
      height: calc(100% - $top-height);

      .left {
        width: $left-width;
        height: 100%;
        background-color: #252321;
      }

      .right {
        width: calc(100% - $left-width);
        height: 100%;
      }
    }
  }
</style>
