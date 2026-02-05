import { charToIndex, indexToChar } from "./utils";

export class Rotor {
    public position: number;
    private wiring: string;

    constructor(wiring: string, position = 0) {
        this.wiring = wiring;
        this.position = ((position % 26) + 26) % 26;
    }

    step(): void {
        this.position = (this.position + 1) % 26;
    }

    encodeForward(c: string): string {
        const inputIndex = charToIndex(c);
        const shiftedIndex = (inputIndex + this.position) % 26;
        const wiredChar = this.wiring[shiftedIndex]!;
        const outputIndex = (charToIndex(wiredChar) - this.position + 26) % 26;
        return indexToChar(outputIndex);
    }

    encodeBackward(c: string): string {
        const inputIndex = charToIndex(c);
        const shiftedIndex = (inputIndex + this.position) % 26;
        const targetChar = indexToChar(shiftedIndex);
        const wiredIndex = this.wiring.indexOf(targetChar);
        const outputIndex = (wiredIndex - this.position + 26) % 26;
        return indexToChar(outputIndex);
    }

}