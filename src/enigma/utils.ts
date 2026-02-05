import { ALPHABET } from "./constants";

export function charToIndex(c: string): number {
    return ALPHABET.indexOf(c.toUpperCase());
}

export function indexToChar(i: number): string {
    return ALPHABET[(i + 26) % 26]!;
}

export function isLetterAZ(c: string): boolean {
    return c.length === 1 && ALPHABET.includes(c.toUpperCase());
}