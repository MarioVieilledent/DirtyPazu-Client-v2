<script lang="ts">
    import { onMount } from "svelte";
    import Word from "./Word.svelte";
    import { type DibiWord, type FilteringOption } from "../types";
    import { fetchingWords } from "../dictionary";
    import { filterDict, sortDict } from "./dictFunctions";

    // Filtered words with searching tools
    let filteredWords: DibiWord[] = [];
    let filteringOption: FilteringOption = {
        dibi: true,
        french: true,
        english: true,
        author: false,
    };

    // Number of words displayed at once
    let wordToDisplay: DibiWord[] = [];
    let nbWordsDisplayed: number = 100;

    // Filtering options
    let search: string = "";

    // Sorting options
    let sortBy: "dibi" | "french" | "date" | "relevance" = "relevance";
    let sortOrder: "asc" | "desc" = "desc";

    // Simple or detailed search
    let detailedSearch: boolean = false;

    onMount(() => {
        // Auto focus on search bar
        setTimeout(() => {
            document.getElementById("inputSimpleSearch").focus();
        }, 200);
    });

    // Start filtering only when words are gathered
    $: $fetchingWords === "ok" ? filter() : {};

    // Filter words taking in account filtering options
    const filter = () => {
        filteredWords = filterDict(filteringOption, search);
        sort();
        getWordsToDisplay();
    };

    // Sort filtered words
    function sort(): void {
        if (search) {
            sortBy = "relevance";
        } else {
            sortBy = "date";
        }
        filteredWords = sortDict(filteredWords, sortBy, sortOrder, search);
    }

    // Once words filtered and sorted, take a bunch of them to display
    function getWordsToDisplay(): void {
        wordToDisplay = filteredWords.slice(0, nbWordsDisplayed);
    }

    // Helper function for search
    function setSearch(event: any): void {
        search = event.target.value;
    }

    // Debounce function for not triggering filter function each new char typed in search bar
    const debounce = (fn: () => void, ms = 150) => {
        let timeoutId: ReturnType<typeof setTimeout>;
        return function (this: any, ...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
    };
</script>

<div class="container fc">
    <div class="search f">
        {#if detailedSearch}
            <div class="detailed-search" />
        {:else}
            <div class="simple-search f">
                <div class="simple-search-bar">
                    <input
                        id="inputSimpleSearch"
                        class="input-simple-search"
                        type="text"
                        placeholder="Rechercher"
                        bind:value={search}
                        on:input={(event) => {
                            setSearch(event);
                            debounce(filter)();
                        }}
                    />
                    <div class="cross" />
                </div>
                <div class="more f">
                    <img
                        src="/chevron-down-solid.svg"
                        alt="Bouton plus de paramètres de recherche"
                    />
                </div>
            </div>
        {/if}
    </div>
    {#if $fetchingWords === "fetching"}
        <span>Chargement des mots...</span>
    {:else if $fetchingWords === "ok"}
        <div class="list">
            {#each wordToDisplay as word}
                <Word {word} />
            {/each}
        </div>
    {:else}
        <span>Erreur lors de la récupération des mots.</span>
    {/if}
</div>

<style lang="scss">
    $simple-search-height: 42px;
    .container {
        width: 100%;
        height: 100%;
        padding: 6px;

        .search {
            width: 100%;
            height: $simple-search-height;

            .detailed-search {
                width: 100%;
                height: $simple-search-height;
            }

            .simple-search {
                width: 100%;
                height: 100%;
                justify-content: space-between;

                .simple-search-bar {
                    width: calc(100% - 36px - 6px);
                    height: 36px;
                    background-color: #494847;
                    border-radius: 18px;

                    .input-simple-search {
                        width: 100%;
                        height: 100%;
                        background-color: transparent;
                        border: none;
                        padding: 6px 6px 6px 14px;
                        border-radius: 18px;
                    }
                }

                .more {
                    width: 36px;
                    height: 36px;
                    background-color: #494847;
                    border-radius: 18px;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
        }

        .list {
            width: 100%;
            height: calc(100% - $simple-search-height);
            overflow: auto;
        }
    }
</style>
