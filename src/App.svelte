<script lang="ts">
  import Header from "./Header.svelte";
  import Nav from "./Nav.svelte";
  import DiscordAuth from "./DiscordAuth.svelte";
  import DiscordAccount from "./DiscordAccount.svelte";
  import Home from "./home/Home.svelte";
  import Dict from "./dict/Dict.svelte";
  import Suggest from "./suggest/Suggest.svelte";

  import { currentPage } from "./types";
  import { onMount } from "svelte";
  import { loadDictionary } from "./dictionary";

  let discordAuthCode: string;

  if (window.location.pathname.includes("/auth")) {
    discordAuthCode = window.location.search.split("code=")[1];
    $currentPage = "discordAuth";
  } else {
    $currentPage = "dict";
  }

  onMount(() => {
    loadDictionary();
  });
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
      {#if $currentPage === "home"}
        <Home />
      {:else if $currentPage === "dict"}
        <Dict />
      {:else if $currentPage === "suggest"}
        <Suggest />
      {:else if $currentPage === "discordAuth"}
        <DiscordAuth code={discordAuthCode} />
      {:else if $currentPage === "discordAccount"}
        <DiscordAccount />
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
        overflow: auto;
      }

      .right {
        width: calc(100% - $left-width);
        height: 100%;
      }
    }
  }
</style>
