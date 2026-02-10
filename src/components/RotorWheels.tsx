import { posToLetter } from "../enigma/alpha";

type Positions = [number, number, number]; // [r, m, l]

export function RotorWheels(props: {
    positions: Positions;
    onChange: (next: Positions) => void;
}) {
    const [r, m, l] = props.positions;

    function inc(i: 0 | 1 | 2) {
        const next: Positions = [r, m, l];
        next[i] = (next[i] + 1) % 26;
        props.onChange(next);
    }

    function dec(i: 0 | 1 | 2) {
        const next: Positions = [r, m, l];
        next[i] = (next[i] + 25) % 26;
        props.onChange(next);
    }

    return (
        <div className="wheels">
            <RotorWheel label="L" value={l} onUp={() => inc(2)} onDown={() => dec(2)} />
            <RotorWheel label="M" value={m} onUp={() => inc(1)} onDown={() => dec(1)} />
            <RotorWheel label="R" value={r} onUp={() => inc(0)} onDown={() => dec(0)} />
        </div>
    );
}

function RotorWheel(props: {
    label: "L" | "M" | "R";
    value: number;
    onUp: () => void;
    onDown: () => void;
}) {
    const letter = posToLetter(props.value);

    return (
        <div className="wheel">
            <div className="wheel-label">{props.label}</div>

            <button className="wheel-btn" onClick={props.onUp} aria-label={`${props.label} up`}>
                ▲
            </button>

            <div className="wheel-window">
                <div className="wheel-letter">{letter}</div>
            </div>

            <button className="wheel-btn" onClick={props.onDown} aria-label={`${props.label} down`}>
                ▼
            </button>
        </div>
    );
}