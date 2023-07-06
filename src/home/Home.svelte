<script lang="ts">
    import { onMount } from "svelte";
    import Word from "../dict/Word.svelte";
    import { fetchingWords, words } from "../dictionary";
    import { partsOfSpeech } from "../types";

    let randomWordIndex: number;

    onMount(() => {
        getRandomWordIndex();
    });

    function getRandomWordIndex(): void {
        randomWordIndex = Math.floor(Math.random() * words.length);
    }
</script>

<div class="container">
    <h1>V2 du dictionnaire</h1>
    <ul style="margin-left: 36px;">
        <li>Recodé en Svelte pour de meilleures perfomances navigateur et un code plus simple</li>
        <li>Ajout de la proposition de mots</li>
        <li>Authentification Discord</li>
    </ul>

    <h2>Open source</h2>
    <a href="/dict" target="_blank">Liste de tous les mots JSON</a>
    <br>
    <span>Ce dictionnaire est constitué d'un <a href="https://github.com/MarioVieilledent/DirtyPazu-Server-v2" target="_blank">serveur</a> proposant une api simple et d'une <a href="https://github.com/MarioVieilledent/DirtyPazu-Client-v2" target="_blank">web app</a> pour l'interfacage. La base de données est enregistré sur MongoDB Cloud et est privée.</span>

    {#if $fetchingWords}
        {@const dictSize = words.length}

        <h2>Mot random</h2>
        {#if randomWordIndex > 0}
            <div class="random-word">
                <button on:click={() => getRandomWordIndex()}>Random</button
                >
                <Word word={words[randomWordIndex]} />
            </div>
        {/if}

        <h2>Stats</h2>
        <div class="stats fc">
            <div class="block f">
                <span class="val">{dictSize}</span>
                <span class="lab">Mots</span>
            </div>
            {#each Object.entries(partsOfSpeech).sort((a, b) => b[1].nbWords - a[1].nbWords) as [key, val]}
                <div class="block f">
                    <span class={key + " val"}>{val.nbWords}</span>
                    <span class={key + " lab"}>{val.french}</span>
                    <span class={key + " percent"}
                        >({((val.nbWords * 100) / dictSize).toFixed(2)} %)</span
                    >
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        padding: 12px;
        overflow: auto;

        h2 {
            margin-top: 12px;
        }

        .stats {
            .block {
                .lab {
                    font-size: 16px;
                    margin-right: 12px;
                }

                .val {
                    font-size: 16px;
                    font-weight: 600;
                    margin-right: 12px;
                }

                .percent {
                    font-size: 14px;
                    margin-right: 12px;
                }
            }
        }
    }
</style>
