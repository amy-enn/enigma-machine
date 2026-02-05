import { useState, useRef } from 'react';
import './App.css';

import { Keyboard } from './components/Keyboard';
import { Lampboard } from './components/Lampboard';

import { EnigmaMachine } from './enigma/machine';
import { Rotor } from './enigma/rotor';
import { Reflector } from './enigma/reflector';
import { Plugboard } from './enigma/plugboard';
import { ROTOR_I, ROTOR_II, ROTOR_III, REFLECTOR_B } from './enigma/constants';


export default function App() {
  const [lit, setLit] = useState<string | null>(null);
  const [ciphertext, setCiphertext] = useState("");
  const [positions, setPositions] = useState<[number, number, number]>([0, 0, 0]);

  const machineRef = useRef(
    new EnigmaMachine(
      [new Rotor(ROTOR_III), new Rotor(ROTOR_II), new Rotor(ROTOR_I)],
      new Reflector(REFLECTOR_B),
      new Plugboard()
    )
  );

  function handlePress(letter: string) {
    const out = machineRef.current.pressKey(letter);
    setLit(out);
    setCiphertext((prev) => prev + out);

    // update render state from the ref AFTER the press
    const [r, m, l] = machineRef.current.getRotorPositions() as [number, number, number];
    setPositions([r, m, l]);
  }

  function handleReset() {
    setLit(null);
    setCiphertext("");
    machineRef.current.setRotorPositions([0, 0, 0]);

    // keep UI in sync
    setPositions([0, 0, 0]);
  }

  const [r, m, l] = positions;


  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1>Enigma with Typescript</h1>

      <div style={{ marginBottom: 12, opacity: 0.8 }}>
        Rotor positions (R, M, L): {r} {m} {l}
      </div>

      <Lampboard lit={lit} />

      <Keyboard onPress={handlePress} />

      <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={handleReset}>Reset</button>
        <div style={{ fontFamily: "monospace", overflowWrap: "anywhere" }}>
          {ciphertext}
        </div>
      </div>
    </div>
  );
}
