<script lang="ts">
    import Word from "../dict/Word.svelte";
    import { filterDict, sortDict } from "../dict/dictFunctions";
    import type { Suggestion } from "../dictionary";
    import { discordConnected, user } from "../discord";
    import {
        partsOfSpeech,
        type DibiWord,
        LOCAL_STORAGE_CURRENT_SUGGESTION,
        dev,
    } from "../types";

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
    const lscs = window.localStorage.getItem(LOCAL_STORAGE_CURRENT_SUGGESTION);
    if (lscs) {
        suggestion = JSON.parse(lscs) as Suggestion;
    }

    addWord();

    let closeWords: any = [];

    // Saves suggestion in localStorage
    function saveSuggestion(): void {
        setTimeout(() => {
            window.localStorage.setItem(
                LOCAL_STORAGE_CURRENT_SUGGESTION,
                JSON.stringify(suggestion)
            );
        }, 100);
    }

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
            closeWords = [...closeWords, ...closeDibiWords];
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
            closeWords = [...closeWords, ...closeFrenchWords];
        }
    }

    function sendSuggestion(): void {
        setTimeout(() => {
            console.log(suggestion);
            let apiUrl = dev ? "http://localhost:5000/" : window.location.href;
            fetch(apiUrl + "suggest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(suggestion),
            })
                .then((d) => d.json())
                .then((res) => {
                    console.log(res);
                });
        }, 100);
    }
</script>

<div class="content fc">
    {#if $discordConnected}
        <h1>Proposition</h1>
        <div class="suggest fc">
            <h2>Proposer un ou plusieurs mots dibi</h2>
            {#each suggestion.versions[0].words as word, index}
                <div class="word fc">
                    <div class="dibi-partOfSpeech f">
                        <input
                            placeholder="Dibi"
                            type="text"
                            class={word.partOfSpeech}
                            bind:value={word.dibi}
                            on:change={() => {
                                loadCloseWords();
                                saveSuggestion();
                            }}
                        />
                        <select
                            class={word.partOfSpeech}
                            bind:value={word.partOfSpeech}
                            on:change={() => saveSuggestion()}
                        >
                            {#each Object.entries(partsOfSpeech) as [key, val]}
                                <option class={key} value={key}
                                    >{val.french}</option
                                >
                            {/each}
                        </select>
                    </div>
                    <div class="fr-en f">
                        <input
                            placeholder="Français"
                            type="text"
                            bind:value={word.french}
                            on:change={() => {
                                loadCloseWords();
                                saveSuggestion();
                            }}
                        />
                        <input
                            placeholder="Anglais"
                            type="text"
                            bind:value={word.english}
                            on:change={() => saveSuggestion()}
                        />
                    </div>
                    <div class="description f">
                        <textarea
                            placeholder="Description"
                            bind:value={word.description}
                            on:change={() => saveSuggestion()}
                        />
                    </div>
                    {#if suggestion.versions[0].words.length > 1}
                        <button
                            on:click={() => {
                                removeWord(index);
                                saveSuggestion();
                            }}>Remove</button
                        >
                    {/if}
                </div>
            {/each}
            <button
                on:click={() => {
                    addWord();
                    saveSuggestion();
                }}>New word</button
            >
            <div class="close-words fc">
                <div class="separator" />
                {#if closeWords.length > 0}
                    <h2>Mots existants</h2>
                    <div class="close-words-list">
                        {#each closeWords as closeWord}
                            <Word word={closeWord} />
                        {/each}
                    </div>
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

        h2 {
            font-size: 18px;
        }

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

                .close-words-list {
                    width: 100%;
                    max-height: 400px;
                    overflow: auto;
                }
            }
        }
    }

    input,
    button,
    select,
    textarea {
        margin: 0px 6px 6px 0px;
        width: 200px;
        padding: 3px 6px;
        border: none;
        border-radius: 6px;
    }
</style>
