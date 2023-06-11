import { dev, type DibiWord } from "./types";

// All Dibi words of the dictionary
export let words: DibiWord[] = []

// State of application about loading all the dictionary
export let fetchingWords: "fetching" | "ok" | "error" = "fetching";

export function loadDictionary(): void {
    let apiUrl = dev ? "http://localhost:5000/" : window.location.href;
    fetch(apiUrl + "dict")
        .then((d) => d.json())
        .then((res) => {
            words = res;
            fetchingWords = "ok";
        })
        .catch((err) => {
            console.error(err);
            fetchingWords = "error";
        });
}