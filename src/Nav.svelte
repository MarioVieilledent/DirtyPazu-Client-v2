<script lang="ts">
    import { discordConnected } from "./discord";
    import { currentPage, type Page } from "./types";

    export let display: string;

    function setPageTo(page: Page): void {
        $currentPage = page;
    }
</script>

<div class={"nav " + display}>
    <button
        class={$currentPage === "home" ? "block-selected" : "block"}
        on:click={() => setPageTo("home")}
    >
        <span>Menu</span>
    </button>
    <button
        class={$currentPage === "dict" ? "block-selected" : "block"}
        on:click={() => setPageTo("dict")}
    >
        <span>Dictionnaire</span>
    </button>
    <!-- <button class={$currentPage === 'translate' ? 'block-selected' : 'block'} on:click={() => setPageTo("translate")}>
        <span>Translate</span>
    </button> -->
    {#if $discordConnected}
        <button
            class={$currentPage === "suggest" ? "block-selected" : "block"}
            on:click={() => setPageTo("suggest")}
        >
            <span>Proposer</span>
        </button>
        <button
            class={$currentPage === "vote" ? "block-selected" : "block"}
            on:click={() => setPageTo("vote")}
        >
            <span>Voter</span>
        </button>
    {/if}
</div>

<style lang="scss">
    .nav {

        .block {
            span {
                color: #949ba4;
            }
        }

        .block-selected {
            background-color: #404249;
            span {
                color: #dbdee1;
            }
        }

        .block:hover {
            background-color: #36373d;
            span {
                color: #dbdee1;
            }
        }
    }

    .horizontal {
        width: 100%;
        display: flex;
        justify-content: center;

        button {
            padding: 3px 6px;
        }
    }

    .vertical {
        display: flex;
        flex-direction: column;
        
        button {
            margin: 6px 6px 0px 6px;
            padding: 6px;
        }
    }
</style>
