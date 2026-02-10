import { Rotor } from "./rotor";
import { Reflector } from "./reflector";
import { Plugboard } from "./plugboard";
import { isLetterAZ } from "./utils";

export class EnigmaMachine {
    private rotors: Rotor[]; // [right, middle, left]
    private reflector: Reflector;
    private plugboard: Plugboard;

    constructor(rotors: Rotor[], reflector: Reflector, plugboard = new Plugboard()) {
        this.rotors = rotors;
        this.reflector = reflector;
        this.plugboard = plugboard;
    }

    // do the simplest stepping rule to start...
    private stepRotors(): void {
        this.rotors[0]?.step();
    }

    pressKey(c: string): string {
        if (!isLetterAZ(c)) {
            return c;
        }
        this.stepRotors();

        let signal = this.plugboard.swap(c);

        // forward: right -> left
        for (let i = 0; i < this.rotors.length; i++) {
            signal = this.rotors[i]!.encodeForward(signal);
        }

        signal = this.reflector.reflect(signal);

        // backward: left -> right
        for (let i = this.rotors.length - 1; i >= 0; i--) {
            signal = this.rotors[i]!.encodeBackward(signal);
        }

        signal = this.plugboard.swap(signal);

        return signal;
    }

    getRotorPositions(): number[] {
        return this.rotors.map(r => r.position);
    }

    setRotorPositions(positions: number[]): void {
        positions.forEach((p, i) => {
            if (this.rotors[i]) this.rotors[i]!.position = ((p % 26) + 26) % 26;
        });
    }
}