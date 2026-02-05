const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Keyboard(props: { onPress: (letter: string) => void }) {
    return (
        <div className="kbd">
            {ALPHABET.map((l) => (
                <button key={l} onClick={() => props.onPress(l)}>
                    {l}
                </button>
            ))}
        </div>
    );
}
