<script lang="ts">
    let rawInput: string = "";
    let result: string = "";

    function translate(event: any): void {
        const raw: string = event.target.value as string;

    }
</script>

<div class="container fc">
    <input
        type="text"
        bind:value={rawInput}
        on:input={(event) => translate(event)}
    />
    <span>{result}</span>
</div>

<style lang="scss">
    .container {
        padding: 6px;
    }
</style>
