import { ALPHABET } from "./constants";

export function posToLetter(pos: number): string {
    const i = ((pos % 26) + 26) % 26;
    return ALPHABET[i]!;
}

export function letterToPos(letter: string): number {
    const idx = ALPHABET.indexOf(letter.toUpperCase());
    return idx < 0 ? 0 : idx;
}