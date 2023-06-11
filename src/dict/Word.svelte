<script lang="ts">
    import { frenchPartOfSpeech } from "../services";
    import type { DibiWord } from "../types";

    // Word to display
    export let word: DibiWord;

    // More information
    let moreInfo: boolean = false;

    function formatDate(date: string): string {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }
</script>

<div class="all fc">
    <div
        class="word f"
        on:click={() => (moreInfo = !moreInfo)}
        on:keypress={() => {}}
    >
        <div class="left f">
            <span class={"dibi " + word.partOfSpeech}
                >{word.dibi.toLowerCase()}</span
            >
            <span class="french">{word.french}</span>
        </div>
        <div class="right">
            <span class="date">{formatDate(word.date)}</span>
        </div>
    </div>
    {#if moreInfo}
        <div class="more-info fc">
            {#if word.partOfSpeech}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Nature</span>
                    </div>
                    <div class="value-div">
                        <span class={"value " + word.partOfSpeech}
                            >{frenchPartOfSpeech(word.partOfSpeech)}</span
                        >
                    </div>
                </div>
            {/if}
            {#if word.french}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Français</span>
                    </div>
                    <div class="value-div">
                        <span class="value">{word.french}</span>
                    </div>
                </div>
            {/if}
            {#if word.english}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Anglais</span>
                    </div>
                    <div class="value-div">
                        <span class="value">{word.english}</span>
                    </div>
                </div>
            {/if}
            {#if word.author}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Créateur</span>
                    </div>
                    <div class="value-div">
                        <span class="value">{word.author}</span>
                    </div>
                </div>
            {/if}
            {#if word.description}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Description</span>
                    </div>
                    <div class="value-div">
                        <span class="value">{word.description}</span>
                    </div>
                </div>
            {/if}
            {#if word.date}
                <div class="block f">
                    <div class="label-div">
                        <span class="label">Date d'ajout</span>
                    </div>
                    <div class="value-div">
                        <span class="value">{word.date}</span>
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</div>

<style lang="scss">
    .all {
        .word {
            align-items: center;
            justify-content: space-between;
            height: 30px;
            cursor: pointer;

            .left {
                align-items: center;

                .dibi {
                    font-size: 18px;
                    margin: 0px 12px 0px 6px;
                    font-weight: 600;
                }

                .french {
                    color: #eee;
                    font-size: 14px;
                }
            }

            .right {
                align-items: center;

                .date {
                    color: #888;
                    font-size: 11px;
                    margin-right: 6px;
                }
            }
        }

        .word:hover {
            background-color: #302f2e;
        }

        .more-info {
            padding: 0px 12px 0px 24px;

            .block {
                width: 100%;
                height: 26px;

                .label-div {
                    width: 100px;

                    .label {
                        font-size: 14px;
                        color: #aaa;
                    }
                }

                .value-div {
                    color: #ccc;

                    .value {
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>
