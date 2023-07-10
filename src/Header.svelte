<script lang="ts">
  import {
    discordConnected,
    user,
    getDiscordAvatarUrl,
  } from "./discord";
    import { currentPage, urlRedirect } from "./types";


  function login() {
    window.location.href = urlRedirect;
  }
</script>

<div class="header f">
  <div class="left f">
  </div>
  <div class="center f">
    <h1>Dibi v2</h1>
  </div>
  <div class="right f">
    {#if $discordConnected}
      <img
        class="avatar"
        title="Connexion Discord"
        src={getDiscordAvatarUrl($user)}
        alt="Discord avatar"
        on:keypress={() => {}}
        on:click={() => $currentPage = 'discordAccount'}
      />
    {:else}
      <button on:click={() => login()}>Login</button>
    {/if}
  </div>
</div>

<style lang="scss">
  $left-width: 200px;
  $right-width: 200px;

  .header {
    width: 100%;
    height: 100%;

    .left {
      width: $left-width;
      height: 100%;
      align-items: center;
    }
    .center {
      width: calc(100% - $left-width - $right-width);
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    .right {
      width: $right-width;
      height: 100%;
      align-items: center;
      justify-content: flex-end;
      padding-right: 6px;

      .avatar {
        width: 38px;
        height: 38px;
        border-radius: 38px;
        cursor: pointer;
      }
    }
  }
</style>
