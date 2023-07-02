import { writable, type Writable } from "svelte/store";
import { dev, partsOfSpeech, type DibiWord } from "./types";


export let words: DibiWord[] = [] // All Dibi words of the dictionary
export let wordStats: any = []; // Statistics on words
export let suggestions: Suggestion[] = []; // All suggestions

// App is fetcvhing, has fetched or has failed to fetch the dictionary
type Fetching = "fetching" | "ok" | "error";
// State of application about loading the dictionary
export let fetchingWords: Writable<Fetching> = writable("fetching");
// State of application about loading suggestions 
export let fetchingSuggestions: Writable<Fetching> = writable("fetching");

// Load raw dictionary
export function loadDictionary(): void {
    let apiUrl = dev ? "http://localhost:5000/" : window.location.href;
    fetch(apiUrl + "dict")
        .then((d) => d.json())
        .then((res) => {
            words = res;
            buildStats();
            fetchingWords.set("ok");
        })
        .catch((err) => {
            console.error(err);
            fetchingWords.set("error");
        });
}

// Build a structured array of dictionary once charged (to display stats)
function buildStats(): void {
    words.forEach(word => {
        partsOfSpeech[word.partOfSpeech] ? partsOfSpeech[word.partOfSpeech].nbWords++ : console.log(word);
    });
}

// Load raw suggestions
export function loadSuggestions(): void {
    let apiUrl = dev ? "http://localhost:5000/" : window.location.href;
    fetch(apiUrl + "suggestions")
        .then((d) => d.json())
        .then((res) => {
            suggestions = res;
            fetchingSuggestions.set("ok");
        })
        .catch((err) => {
            console.error(err);
            fetchingSuggestions.set("error");
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