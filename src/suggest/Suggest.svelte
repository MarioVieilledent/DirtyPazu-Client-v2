<script lang="ts">
    import Word from "../dict/Word.svelte";
    import { filterDict, sortDict } from "../dict/dictFunctions";
    import type { Suggestion } from "../dictionary";
    import { discordConnected, user } from "../discord";
    import { partsOfSpeech, type DibiWord } from "../types";

    let suggestion: Suggestion = {
        state: "suggested",
        versions: [
            {
                versionNumber: 1,
                words: [],
                upVote: [],
                downVote: [],
                thread: [],
            },
        ],
        author: $user.discord.email,
    };
    addWord();

    let closeWords: any = [];

    function addWord(): void {
        suggestion.versions[0].words.push({
            author: $user.discord.username,
            dibi: "",
            partOfSpeech: "Noun",
            french: "",
            english: "",
            description: "",
            date: Date.now().toString(),
        });
        suggestion.versions[0].words = suggestion.versions[0].words;
    }

    function removeWord(index: number): void {
        if (suggestion.versions[0].words.length > 1) {
            suggestion.versions[0].words.splice(index, 1);
            suggestion.versions[0].words = suggestion.versions[0].words;
        }
    }

    function loadCloseWords(): void {
        closeWords = [];
        setTimeout(() => {
            suggestion.versions[0].words.forEach((word) => {
                loadCloseDibiWords(word.dibi);
                loadCloseFrenchWords(word.french);
            });
        }, 100);
    }

    function loadCloseDibiWords(expr: any): void {
        if (expr) {
            const dibiWordWanted: string = `^${expr}$`;
            let closeDibiWords: DibiWord[] = [];
            closeDibiWords = filterDict(
                { dibi: true, author: false, french: false, english: false },
                dibiWordWanted
            );
            closeDibiWords = sortDict(
                closeDibiWords,
                "relevance",
                "asc",
                dibiWordWanted
            );
            closeWords = [...closeWords, ...closeDibiWords.slice(0, 10)];
        }
    }

    function loadCloseFrenchWords(expr: any): void {
        if (expr) {
            const dibiWordWanted: string = `${expr}`;
            let closeFrenchWords: DibiWord[] = [];
            closeFrenchWords = filterDict(
                { dibi: false, author: false, french: true, english: false },
                dibiWordWanted
            );
            closeFrenchWords = sortDict(
                closeFrenchWords,
                "relevance",
                "asc",
                dibiWordWanted
            );
            closeWords = [...closeWords, ...closeFrenchWords.slice(0, 10)];
        }
    }

    function sendSuggestion(): void {}
</script>

<div class="content fc">
    {#if $discordConnected}
        <h1>Proposition</h1>
        <span>Proposer un ou plusieurs mots dibi</span>
        <div class="suggest fc">
            {#each suggestion.versions[0].words as word, index}
                <div class="word fc">
                    <div class="dibi-partOfSpeech f">
                        <input
                            placeholder="Dibi"
                            type="text"
                            class={word.partOfSpeech}
                            bind:value={word.dibi}
                            on:change={() => loadCloseWords()}
                        />
                        <select
                            class={word.partOfSpeech}
                            bind:value={word.partOfSpeech}
                        >
                            {#each partsOfSpeech as pos}
                                <option class={pos.english} value={pos.english}
                                    >{pos.french}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <div class="fr-en f">
                        <input
                            placeholder="Français"
                            type="text"
                            bind:value={word.french}
                            on:change={() => loadCloseWords()}
                        />
                        <input
                            placeholder="Anglais"
                            type="text"
                            bind:value={word.english}
                        />
                    </div>
                    <div class="description f">
                        <textarea
                            placeholder="Description"
                            bind:value={word.description}
                        />
                    </div>
                    {#if suggestion.versions[0].words.length > 1}
                        <button on:click={() => removeWord(index)}
                            >Remove</button
                        >
                    {/if}
                </div>
            {/each}
            <button on:click={() => addWord()}>New word</button>
            <div class="close-words fc">
                <div class="separator" />
                {#if closeWords.length > 0}
                    {#each closeWords as closeWord}
                        <Word word={closeWord} />
                    {/each}
                    <div class="separator" />
                {/if}
            </div>
            <button on:click={() => sendSuggestion()}>Proposer</button>
        </div>
    {:else}
        <span>Authentification Discord nécessaire</span>
    {/if}
</div>

<style lang="scss">
    .content {
        width: 100%;
        height: 100%;
        padding: 6px;
        overflow: auto;

        .suggest {
            align-items: flex-start;
            width: 100%;

            .word {
                align-items: center;

                .dibi-partOfSpeech {
                    width: 100%;
                }

                .fr-en {
                    width: 100%;
                }

                .description {
                    width: 100%;

                    textarea {
                        width: 406px;
                        height: 48px;
                    }
                }
            }

            .close-words {
                width: 100%;
            }
        }
    }

    input,
    button,
    select,
    textarea {
        margin: 0px 6px 6px 0px;
        width: 200px;
    }
</style>
