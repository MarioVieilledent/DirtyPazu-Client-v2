import { words } from "../dictionary";
import type { DibiWord, FilteringOption } from "../types";

export const filterDict = (filteringOption: FilteringOption, search: string) => {
    if (words) {
        let filteredWords: DibiWord[] = [];
        let lowerCaseSearch: RegExp = new RegExp(search.toLowerCase());
        words.forEach((word) => {
            let fits = false;
            if (
                filteringOption.dibi &&
                lowerCaseSearch.test(word.dibi.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.french &&
                lowerCaseSearch.test(word.french.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.english &&
                lowerCaseSearch.test(word.english.toLowerCase())
            ) {
                fits = true;
            }
            if (
                filteringOption.author &&
                lowerCaseSearch.test(word.author.toLowerCase())
            ) {
                fits = true;
            }
            if (fits) {
                filteredWords.push(word);
            }
        });
        return filteredWords;
    } else {
        return [];
    }
}

export const sortDict = (words: DibiWord[], sortBy: string, sortOrder: string, search: string) => {
    words.sort((a: DibiWord, b: DibiWord) => {
        let diff: number;
        switch (sortBy) {
            case "relevance":
                diff = relevance(search, a, b);
                break;
            case "dibi":
                diff = a.dibi.localeCompare(b.dibi);
                break;
            case "french":
                diff = a.french.localeCompare(b.french);
                break;
            case "date":
                diff = a.date.localeCompare(b.date);
                break;
        }
        if (sortOrder === "asc") {
            return diff;
        } else {
            return -diff;
        }
    });
    return words;
}

// Rework this shitty function
function relevance(search: string, a: DibiWord, b: DibiWord): number {
    let expression = search.toLowerCase();

    if (expression === a.dibi.toLowerCase() ||expression === a.french.toLowerCase() ||expression === a.english.toLowerCase()) {
        return 1000;
    }
    
    if (expression === b.dibi.toLowerCase() ||expression === b.french.toLowerCase() ||expression === b.english.toLowerCase()) {
        return -1000;
    }

    let aScore = 0;
    let bScore = 0;

    for (let length = 1; length <= expression.length; length++) {
        for (let pos = 0; pos < expression.length - length; pos++) {
            if (expression.slice(pos, pos+length) === a.dibi.toLowerCase()) {
                aScore += length * length;
            }
            if (expression.slice(pos, pos+length) === b.dibi.toLowerCase()) {
                bScore += length * length;
            }
            if (expression.slice(pos, pos+length) === a.french.toLowerCase()) {
                aScore += length * length;
            }
            if (expression.slice(pos, pos+length) === b.french.toLowerCase()) {
                bScore += length * length;
            }
            if (expression.slice(pos, pos+length) === a.english.toLowerCase()) {
                aScore += length * length;
            }
            if (expression.slice(pos, pos+length) === b.english.toLowerCase()) {
                bScore += length * length;
            }
        }
    }

    return bScore- aScore;
}