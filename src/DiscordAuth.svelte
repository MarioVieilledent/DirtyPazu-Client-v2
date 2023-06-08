<script lang="ts">
    import { onMount } from "svelte";
    import { LOCAL_STORAGE_DISCORD_USER, dev } from "./types";
    import { discordUser, getDiscordAvatarUrl } from "./discord";

    export let code: string;

    onMount(() => {
        let apiUrl = dev ? "http://localhost:5000/" : window.location.origin+'/';
        fetch(apiUrl + "exchange-code?code=" + code)
            .then((d) => d.json())
            .then((res) => {
                localStorage.setItem(LOCAL_STORAGE_DISCORD_USER, JSON.stringify(res))
                $discordUser = res;
            })
            .catch((err) => {
                console.error(err);
            });
    });
</script>

{#if $discordUser}
    <img
        style="width: 42px; height: 42px; border-radius: 42px;"
        src={getDiscordAvatarUrl($discordUser)}
        alt=""
    />
    <span>Connecté en tant que {$discordUser.username}</span>
{/if}
