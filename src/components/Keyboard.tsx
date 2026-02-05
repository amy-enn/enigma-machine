const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Keyboard(props: { onPress: (letter: string) => void }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 8 }}>
            {ALPHABET.map((l) => (
                <button key={l} onClick={() => props.onPress(l)} style={{ padding: "10px 0" }}>
                    {l}
                </button>
            ))}
        </div>
    );
}
