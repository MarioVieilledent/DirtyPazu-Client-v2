import type { PartOfSpeech } from "./types";

export function frenchPartOfSpeech(partOfSpeech: PartOfSpeech): string {
    switch (partOfSpeech) {
        case 'Noun': return 'Nom';
        case 'Pronoun': return 'Pronom';
        case 'Verb': return 'Verbe';
        case 'Adjective': return 'Adjectif';
        case 'Adverb': return 'Adverbe';
        case 'Preposition': return 'Préposition';
        case 'Conjonction': return 'Conjonction';
        case 'Interjection': return 'Interjection';
        case 'SpiritWord': return 'Mot d\'esprit';
        case 'FunctionParticule': return 'Particule de fonction';
        case 'TransformationParticule': return 'Particule de transformation';
        default: return partOfSpeech;
    }
}