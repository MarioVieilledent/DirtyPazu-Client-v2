<script lang="ts">
    import { onMount } from "svelte";
    import Word from "./Word.svelte";
    import { type DibiWord } from "../types";
    import { words, fetchingWords } from "../dictionary";

    // Filtered words with searching tools
    let filteredWords: DibiWord[] = [];
    let filteringOption = {
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

    // Fetching dictionary
    $: {
        if ($fetchingWords === "ok") {
            filter();
        }
    }

    // Filter words taking in account filtering options
    const filter = () => {
        let lowerCaseSearch: RegExp = new RegExp(search.toLowerCase());
        filteredWords = [];
        words.forEach((word) => {
            let fits = false;
            if (
                filteringOption.dibi &&
                lowerCaseSearch.test(word.dibi.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.french &&
                lowerCaseSearch.test(word.french.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.english &&
                lowerCaseSearch.test(word.english.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.author &&
                lowerCaseSearch.test(word.author.toLowerCase())
            ) {
                fits = true;
            }
            if (fits) {
                filteredWords.push(word);
            }
        });
        sort();
        getWordsToDisplay();
    };

    // Sort filtered words
    function sort(): void {
        if (search) {
            sortBy = 'relevance';
        } else {
            sortBy = 'date';
        }
        filteredWords.sort((a: DibiWord, b: DibiWord) => {
            let diff: number;
            switch (sortBy) {
                case "relevance":
                    diff = relevance(a, b);
                    break;
                case "dibi":
                    diff = a.dibi.localeCompare(b.dibi);
                    break;
                case "french":
                    diff = a.french.localeCompare(b.french);
                    break;
                case "date":
                    diff = a.date.localeCompare(b.date);
                    break;
            }
            if (sortOrder === "asc") {
                return diff;
            } else {
                return -diff;
            }
        });
    }

    // Rework this shitty function
    function relevance(a: DibiWord, b: DibiWord): number {
        let expression = search.toLowerCase();

        if (expression === a.dibi.toLowerCase() ||expression === a.french.toLowerCase() ||expression === a.english.toLowerCase()) {
            return 1000;
        }
        
        if (expression === b.dibi.toLowerCase() ||expression === b.french.toLowerCase() ||expression === b.english.toLowerCase()) {
            return -1000;
        }

        let aScore = 0;
        let bScore = 0;

        for (let length = 1; length <= expression.length; length++) {
            for (let pos = 0; pos < expression.length - length; pos++) {
                if (expression.slice(pos, pos+length) === a.dibi.toLowerCase()) {
                    aScore += length * length;
                }
                if (expression.slice(pos, pos+length) === b.dibi.toLowerCase()) {
                    bScore += length * length;
                }
                if (expression.slice(pos, pos+length) === a.french.toLowerCase()) {
                    aScore += length * length;
                }
                if (expression.slice(pos, pos+length) === b.french.toLowerCase()) {
                    bScore += length * length;
                }
                if (expression.slice(pos, pos+length) === a.english.toLowerCase()) {
                    aScore += length * length;
                }
                if (expression.slice(pos, pos+length) === b.english.toLowerCase()) {
                    bScore += length * length;
                }
            }
        }

        return bScore- aScore;
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
                        src="/public/chevron-down-solid.svg"
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
            overflow-y: auto;
        }
    }
</style>
