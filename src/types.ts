import { writable, type Writable } from "svelte/store";

// Local storage
export const LOCAL_STORAGE_DISCORD_USER: string = 'discordUser';
export const LOCAL_STORAGE_CURRENT_SUGGESTION: string = 'currentSuggestion';

// Dev debug
export const dev: boolean = false;
const urlProd = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=https%3A%2F%2Fdibi.onrender.com%2Fauth&response_type=code&scope=identify%20email'; 
const urlNodejs = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fauth&response_type=code&scope=identify%20email'; 
const ulrSvelte = 'https://discord.com/api/oauth2/authorize?client_id=1115564047048392754&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth&response_type=code&scope=identify%20email'; 
export const urlRedirect = urlProd;

// Gestion des pages
export type Page = 'home' | 'dict' | 'suggest' | 'vote' | 'discordAuth' | 'discordAccount';
export let currentPage: Writable<Page> = writable('home');

// Pour le noms des différentes pages
export type PageName = 'Infos' | 'Flag' | 'Dibi-infos' | 'Dibi-dict' | 'Dibi-grammar-rules' | 'Dibi-add-word' | 'Dibi-mc' | 'Logs';

// Général
export type PartOfSpeech = 'Noun' | 'Pronoun' | 'Verb' | 'Adjective' | 'Adverb' | 'Preposition' | 'Conjonction' | 'Interjection' | 'SpiritWord' | 'FunctionParticule' | 'TransformationParticule';

// For stats and naming
export let partsOfSpeech: {[key: string]: {french: string, nbWords: number}} = {
    Noun: { french: 'Nom', nbWords: 0 },
    Pronoun: { french: 'Pronom', nbWords: 0 },
    Verb: { french: 'Verbe', nbWords: 0 },
    Adjective: { french: 'Adjectif', nbWords: 0 },
    Adverb: { french: 'Adverbe', nbWords: 0 },
    Preposition: { french: 'Préposition', nbWords: 0 },
    Conjonction: { french: 'Conjonction', nbWords: 0 },
    Interjection: { french: 'Interjection', nbWords: 0 },
    SpiritWord: { french: 'Mot d\'esprit', nbWords: 0 },
    FunctionParticule: { french: 'Particule de fonction', nbWords: 0 },
    TransformationParticule: { french: 'Particule de transformation', nbWords: 0 }
};

// Pour le dictionnaire
export type DibiWord = {
    _id?: string;
    dibi: string;
    french: string;
    english?: string;
    partOfSpeech: PartOfSpeech;
    author?: string;
    date?: string;
    description?: string;
}

export type FilteringOption = {
    dibi: boolean;
    french: boolean;
    english: boolean;
    author: boolean;
}

export const DetailedPartOfSpeech: any = {
    'Nom': 'n.',
    'Adjectif': 'adj.',
    'Adjectif qualificatif': 'adj. qual.',
    'Verbe': 'vb.',
    'Verbe résultatif': 'vb. rés.',
    'Verbe directionnel': 'vb. dir.',
    'Verbe d\'existence': 'vb. ex.',
    'Verbe auxiliaire': 'vb. aux.',
    'Adverbe': 'adv.',
    'Mot d\'esprit': 'm. esp.',
    'Particule': 'part.',
    'Particule de transformation': 'part. transf.',
    'Particule de fonction': 'part. fonct.',
    'Particule de conjugaison': 'part. conj.',
    'Particule de conjugaison de fonctionnalité': 'part. conj. fonct.',
    'Particule de conjugaison de temps': 'part. conj. tps.',
    'Particule de conjugaison de temporalité': 'part. conj. tpr.',
    'Particule de conjugaison de mode': 'part. conj. md.',
    'Préfixe': 'préf.',
    'Suffixe': 'suff.',
    'Ambifixe': 'ambif.',
    'Pronom': 'pr.',
    'Pronom conjugal': 'pr. conj.',
    'Pronom démonstratif': 'pr. dém.',
    'Pronom possessif': 'pr. poss.',
    'Conjonction': 'conjct.',
    'Interjection': 'interj. ',
    'Présent': 'prés.',
    'Présent général': 'prés. gén.',
    'Passé': 'pas.',
    'Futur': 'fut.',
    'Continuité': 'cont.',
    'Capacité': 'cap.',
    'Passif': 'psf.',
    'Impératif': 'imprt.',
    'Transitif': 'trans.',
    'Pronominal': 'pron.',
    'Argot': 'arg.',
    'Qualificatif': 'qual.',
    'Habituel': 'hab.',
    'Inhabituel': 'inhab.',
    'Répétitif': 'rep. ',
    'Système': 'syst.',
    'Académicien': 'acad.',
    'Professeur': 'prof.',
    'Linguiste': 'ling.',
    'Membre': 'memb.',
    'Lexique': 'lex.',
    'Expression': 'exp.',
    'Exception': 'exc.',
    'Vocabulaire': 'voc.',
    'Grammaire': 'gram.',
    'Conjugaison': 'conj.',
    'Syntaxe': 'synt.',
    'Dictionnaire': 'dict.',
    'Prononciation': 'pron',
    'Alphabet Phonétique International': 'API',
    'Dénomination de langue': 'IETF',
    'Dibi': 'DB',
    'Dibi moderne': 'DBM',
    'Ancien dibi': 'ADB',
    'Dibi archaïque': 'DBA',
    'Sunilof': 'SUL',
    'Français': 'FR',
    'Mutation orthographique': 'mut. orth.',
    'Abréviation': 'abv.'
}