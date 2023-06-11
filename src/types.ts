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
export type PartOfSpeech = 'Noun' | 'Pronoun' | 'Verb' | 'Adjective' | 'Adverb' | 'Preposition' | 'Conjonction' | 'Interjection' | 'SpiritWord' | 'FunctionParticule' | 'TransformationParticule';

// Pour le dictionnaire
export interface DibiWord {
    _id?: string;
    dibi: string;
    french: string;
    english?: string;
    partOfSpeech: PartOfSpeech;
    author?: string;
    date?: string;
    description?: string;
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