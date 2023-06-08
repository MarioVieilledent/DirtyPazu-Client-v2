<script lang="ts">
  import {
    discordConnected,
    discordUser,
    getDiscordAvatarUrl,
  } from "./discord";
    import { currentPage } from "./types";

    const urlProd = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=https%3A%2F%2Fdibi-dictionary.onrender.com%2Fauth&response_type=code&scope=identify%20email'; 
    const urlNodejs = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth&response_type=code&scope=identify%20email'; 
    const ulrSvelte = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&response_type=code&scope=identify%20email'; 

  function login() {
    window.location.href = urlProd;
  }
</script>

<div class="header f">
  <div class="left f">
    <span>Site en construction, je cherche des devs !</span>
  </div>
  <div class="center f">
    <h1>Dibi v2</h1>
  </div>
  <div class="right f">
    {#if $discordConnected}
      <img
        class="avatar"
        title="Connexion Discord"
        src={getDiscordAvatarUrl($discordUser)}
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
