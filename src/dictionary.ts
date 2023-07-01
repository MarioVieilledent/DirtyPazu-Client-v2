import { writable, type Writable } from "svelte/store";
import { dev, type DibiWord } from "./types";

// All Dibi words of the dictionary
export let words: DibiWord[] = []

type Fetching = "fetching" | "ok" | "error";

// State of application about loading all the dictionary
export let fetchingWords: Writable<Fetching> = writable("fetching");

export function loadDictionary(): void {
    let apiUrl = dev ? "http://localhost:5000/" : window.location.href;
    fetch(apiUrl + "dict")
        .then((d) => d.json())
        .then((res) => {
            words = res;
            fetchingWords.set("ok");
        })
        .catch((err) => {
            console.error(err);
            fetchingWords.set("error");
        });
}

type SuggestionState = 'suggested' | 'refused' | 'archived' | 'added';

export type Suggestion = {
    state: SuggestionState;
    versions: SuggestVersion[];
    author: string; // email of Discord user
}

export type SuggestVersion = {
    versionNumber: number;
    words: DibiWord[];
    upVote: string[]; // emails of Discord users
    downVote: string[]; // emails of Discord users
    thread: Message[];
}

export type Message = {
    author: string; // email of Discord user
    message: string;
    date: Date;
}