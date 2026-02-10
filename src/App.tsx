import { useState, useRef } from 'react';
import './App.css';

import { Keyboard } from './components/Keyboard';
import { Lampboard } from './components/Lampboard';

import { EnigmaMachine } from './enigma/machine';
import { Rotor } from './enigma/rotor';
import { Reflector } from './enigma/reflector';
import { Plugboard } from './enigma/plugboard';
import { RotorWheels } from './components/RotorWheels';
import { ROTOR_I, ROTOR_II, ROTOR_III, REFLECTOR_B } from './enigma/constants';


export default function App() {
  const [lit, setLit] = useState<string | null>(null);
  const [ciphertext, setCiphertext] = useState("");
  const [positions, setPositions] = useState<[number, number, number]>([0, 0, 0]);
  const [plaintext, setPlaintext] = useState("");

  const machineRef = useRef(
    new EnigmaMachine(
      [new Rotor(ROTOR_III), new Rotor(ROTOR_II), new Rotor(ROTOR_I)],
      new Reflector(REFLECTOR_B),
      new Plugboard()
    )
  );

  function applyPositions(next: [number, number, number]) {
    setPositions(next);
    machineRef.current.setRotorPositions(next); // [r, m, l]
  }

  function handlePress(letter: string) {
    setPlaintext((prev) => prev + letter);

    const out = machineRef.current.pressKey(letter);
    setLit(out);
    setCiphertext((prev) => prev + out);

    // update render state from the ref AFTER the press
    const [r, m, l] = machineRef.current.getRotorPositions() as [number, number, number];
    setPositions([r, m, l]);
  }

  function handleReset() {
    setLit(null);
    setPlaintext("");
    setCiphertext("");
    // machineRef.current.setRotorPositions([0, 0, 0]);
    applyPositions([0, 0, 0]);

    // keep UI in sync
    setPositions([0, 0, 0]);
  }

  const [r, m, l] = positions;


  return (
    <div className="enigma-wrap">
      <div className="enigma-panel">
        <h1 className="enigma-title">• • • Enigma • • •</h1>

        <p className="sub">
          Rotor positions (R, M, L): {r} {m} {l}
        </p>
        <div className="brass-rule" />

        <RotorWheels positions={positions} onChange={applyPositions} />

        <div className="grid">
          <Lampboard lit={lit} />

          <Keyboard onPress={handlePress} />

          <div className="output-row">
            <button className="reset-btn" onClick={handleReset}>Reset</button>

            <div className="io">
              <div className="io-line">
                <span className="io-label">PLAIN</span>
                <span className="io-text">{plaintext}</span>
              </div>

              <div className="io-line">
                <span className="io-label">CIPHER</span>
                <span className="io-text">{ciphertext}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
