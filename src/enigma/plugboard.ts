export type PlugboardPairs = Record<string, string>;

export class Plugboard {
    private pairs: PlugboardPairs;

    constructor(pairs: PlugboardPairs = {}) {
        this.pairs = pairs;
    }

    swap(c: string): string {
        const up = c.toUpperCase();
        return this.pairs[up] ?? up;
    }
}