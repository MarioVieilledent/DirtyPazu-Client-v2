import { writable, type Writable } from "svelte/store";

// Local storage
export const LOCAL_STORAGE_DISCORD_USER: string = 'discordUser';

// Dev debug
export const dev: boolean = false;

// Gestion des pages
export let currentPage: Writable<Page> = writable('home')
export type Page = 'home' | 'dict' | 'discordAuth' | 'discordAccount';

// Pour le noms des différentes pages
export type PageName = 'Infos' | 'Flag' | 'Dibi-infos' | 'Dibi-dict' | 'Dibi-grammar-rules' | 'Dibi-add-word' | 'Dibi-mc' | 'Logs';

// Général
export type PartOfSpitch = 'Noun' | 'Pronoun' | 'Verb' | 'Adjective' | 'Adverb' | 'Preposition' | 'Conjonction' | 'Interjection' | 'Particule';

// Pour le dictionnaire
export interface DibiWord {
    _id?: string;
    dibi: string;
    french: string;
    english?: string;
    partOfSpeech: PartOfSpitch;
    author?: string;
    date?: string;
    description?: string;
}

// Pour les logs
export interface Log {
    id_?: string;
    message: string;
    timestamp: Date;
}