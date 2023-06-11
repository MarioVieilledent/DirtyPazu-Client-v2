<script lang="ts">
    import { discordConnected } from "./discord";
    import { currentPage, type Page } from "./types";


    function setPageTo(page: Page): void {
        $currentPage = page;
    }
</script>

<div class="nav">
    <button class="block" on:click={() => setPageTo('home')}>
        <span>Menu</span>
    </button>
    <button class="block" on:click={() => setPageTo('dict')}>
        <span>Dictionnaire</span>
    </button>
    {#if $discordConnected}
    <button class="block" on:click={() => setPageTo('suggest')}>
        <span>Proposer</span>
    </button>
    {/if}
</div>

<style lang="scss">

</style>