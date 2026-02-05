import { charToIndex } from "./utils";

export class Reflector {
    private wiring: string;

    constructor(wiring: string) {
        this.wiring = wiring;
    }

    reflect(c: string): string {
        const idx = charToIndex(c);
        return this.wiring[idx]!;
    }
}