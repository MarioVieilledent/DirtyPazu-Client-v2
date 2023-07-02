<script lang="ts">
    import { frenchPartOfSpeech } from "../services";
    import type { DibiWord } from "../types";

    // Word to display
    export let word: DibiWord;

    // More information
    let moreInfo: boolean = false;

    function formatShortDate(date: string): string {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = String(d.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
    }

    function formatDate(dateString: string): string {
        const date = new Date(dateString);
        const now = new Date();

        if (isSameDay(date, now)) {
            if (isSameDay(date, now, -1)) {
                return "hier";
            }
            return `aujourd'hui à ${formatTime(date)}`;
        }

        const day = ("0" + date.getDate()).slice(-2);
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const time = formatTime(date);

        return `${day}/${month}/${year} à ${time}`;
    }

    function isSameDay(date1: Date, date2: Date, offset = 0): boolean {
        return (
            date1.getDate() === date2.getDate() + offset &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    }

    function formatTime(date: Date): string {
        const hours = ("0" + date.getHours()).slice(-2);
        const minutes = ("0" + date.getMinutes()).slice(-2);
        return `${hours}h${minutes}`;
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
            <span class="date">{formatShortDate(word.date)}</span>
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
                        <span class="value">{formatDate(word.date)}</span>
                    </div>
                </div>
            {/if}
            <div class="block f">
                <div class="label-div">
                    <a href="/wordId?id={word._id}" target="_blank">JSON</a>
                </div>
                <div class="value-div">
                    <span class="value">{word._id}</span>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    $label-width: 100px;

    .all {
        .word {
            align-items: center;
            justify-content: space-between;
            min-height: 30px;
            cursor: pointer;

            .left {
                align-items: center;

                .dibi {
                    font-size: 18px;
                    margin: 0px 12px 0px 6px;
                    font-weight: 600;
                    white-space: nowrap;
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
                    margin-left: 12px;
                    white-space: nowrap;
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
                min-height: 26px;

                .label-div {
                    width: $label-width;

                    .label {
                        font-size: 14px;
                        color: #aaa;
                    }
                }

                .value-div {
                    color: #ccc;
                    width: calc(100% - $label-width);

                    .value {
                        font-size: 13px;
                    }
                }
            }
        }
    }
</style>
