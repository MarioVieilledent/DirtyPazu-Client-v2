<script lang="ts">
    import { discordConnected } from "../discord";

</script>

<div class="content">
    {#if $discordConnected}
    
    {:else}
        <span>Authentification Discord nécessaire</span>
    {/if}
</div>

<style lang="scss">
</style>
