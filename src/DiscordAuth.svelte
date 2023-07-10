<script lang="ts">
    import { onMount } from "svelte";
    import { LOCAL_STORAGE_DISCORD_USER, currentPage, dev } from "./types";
    import { discordConnected, user } from "./discord";

    export let code: string;

    onMount(() => {
        let apiUrl = dev
            ? "http://localhost:5000/"
            : window.location.origin + "/";

        fetch(apiUrl + "exchange-code?code=" + code)
            .then((d) => d.json())
            .then((res) => {
                if (res.err) {
                    console.log(res.err);
                } else {
                    localStorage.setItem(
                        LOCAL_STORAGE_DISCORD_USER,
                        JSON.stringify(res)
                    );
                    $user = res;
                    console.log(res);
                    $discordConnected = true;

                    // Remove the /auth?code=...
                    const urlWithoutParamsAndPath =
                        window.location.protocol + "//" + window.location.host;
                    window.history.replaceState(
                        {},
                        document.title,
                        urlWithoutParamsAndPath
                    );

                    // Change page
                    $currentPage = "discordAccount";
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });
</script>
