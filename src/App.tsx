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
    <div className="enigma-wrap">
      <div className="enigma-panel">
        <h1 className="enigma-title">Enigma with Typescript</h1>

        <p className="sub">
          Rotor positions (R, M, L): {r} {m} {l}
        </p>
        <div className="brass-rule" />

        <div className="grid">
          <Lampboard lit={lit} />

          <Keyboard onPress={handlePress} />

          <div className="output-row">
            <button className="reset-btn" onClick={handleReset}>Reset</button>
            <div className="cipher">
              {ciphertext}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
