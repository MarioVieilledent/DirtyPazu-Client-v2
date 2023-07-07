<script lang="ts">
  import Header from "./Header.svelte";
  import Nav from "./Nav.svelte";
  import DiscordAuth from "./DiscordAuth.svelte";
  import DiscordAccount from "./DiscordAccount.svelte";
  import Home from "./home/Home.svelte";
  import Dict from "./dict/Dict.svelte";
  import Suggest from "./suggest/Suggest.svelte";
  import Vote from "./suggest/Vote.svelte";

  import { currentPage } from "./types";
  import { onMount } from "svelte";
  import { loadDictionary, loadSuggestions } from "./dictionary";

  let discordAuthCode: string;

  if (window.location.pathname.includes("/auth")) {
    discordAuthCode = window.location.search.split("code=")[1];
    $currentPage = "discordAuth";
  } else {
    $currentPage = "dict";
  }

  // When web app is loading
  onMount(() => {
    loadDictionary();
    loadSuggestions();
  });
</script>

<div class="all fc">
  <div class="top f">
    <Header />
  </div>
  <div class="middle f">
    <div class="left">
      <Nav display="vertical" />
    </div>
    <div class="right">
      {#if $currentPage === "home"}
        <Home />
      {:else if $currentPage === "dict"}
        <Dict />
      {:else if $currentPage === "suggest"}
        <Suggest />
      {:else if $currentPage === "vote"}
        <Vote />
      {:else if $currentPage === "discordAuth"}
        <DiscordAuth code={discordAuthCode} />
      {:else if $currentPage === "discordAccount"}
        <DiscordAccount />
      {/if}
    </div>
  </div>
  <div class="bottom">
    <Nav display="horizontal" />
  </div>
</div>

<style lang="scss">
  $top-height: 50px;
  $bottom-height: 44px;
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

    .middle {
      width: 100%;
      height: calc(100% - $top-height);

      .left {
        width: $left-width;
        height: 100%;
        background-color: #2b2d31;
        overflow: auto;
      }

      .right {
        width: calc(100% - $left-width);
        height: 100%;
      }
    }

    .bottom {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    .all {
      .top {
        display: none;
      }

      .middle {
        height: calc(100% - $bottom-height);

        .left {
          display: none;
        }

        .right {
          width: 100%;
        }
      }

      .bottom {
        display: flex;
        height: $top-height;
      }
    }
  }
</style>
