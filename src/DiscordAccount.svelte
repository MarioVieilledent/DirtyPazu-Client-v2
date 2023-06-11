<script lang="ts">
    import { discordConnected, user, getDiscordAvatarUrl } from "./discord";
    import { LOCAL_STORAGE_DISCORD_USER } from "./types";

    function disconnect(): void {
        $discordConnected = false;
        $user = undefined;
        window.localStorage.removeItem(LOCAL_STORAGE_DISCORD_USER);
    }
</script>

<div class="all">
    <h1>Gestion du compte</h1>

    {#if $discordConnected}
        <div class="discord">
            <img
                style="width: 42px; height: 42px; border-radius: 42px;"
                src={getDiscordAvatarUrl($user)}
                alt=""
            />
            <span>Connecté en tant que {$user.discord.username}</span>
            <button on:click={() => disconnect()}>Déconnexion</button>
            <p>{$user.xp} XP</p>
            <p>{$user.money} thunes</p>
        </div>
    {:else}
        <span>Non connecté.</span>
    {/if}
</div>

<style lang="scss">
    .all {
        width: 100%;
        height: 100%;
        padding: 6px;
    }
</style>
