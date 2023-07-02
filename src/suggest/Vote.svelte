<script lang="ts">
    import { onMount } from "svelte";
    import Word from "../dict/Word.svelte";
    import { type DibiWord, type FilteringOption } from "../types";
    import { fetchingSuggestions, fetchingWords, suggestions } from "../dictionary";
    import type { Suggestion, words } from "../dictionary";
    import { component_subscribe } from "svelte/internal";

    console.log(suggestions);
</script>

<div class="container fc">
    <div class="suggestion-list">
        {#each suggestions as suggestion}
            <div class="suggestion">
                <span>Suggéré par {suggestion.author}</span>
                <span>{suggestion.state}</span>
                <div class="versions">
                    {#each suggestion.versions as version}
                    <div class="version">
                        <span>Version {version.versionNumber}</span>
                        <div class="words">
                            {#each version.words as word}
                                <Word word={word} />
                            {/each}
                        </div>
                    </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .container {
        width: 100%;
        height: 100%;
        padding: 6px;
    }
</style>
