const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Lampboard(props: { lit: string | null }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 8, marginBottom: 16 }}>
            {ALPHABET.map((l) => {
                const isLit = props.lit === l;
                return (
                    <div
                        key={l}
                        style={{
                            padding: "10px 0",
                            textAlign: "center",
                            borderRadius: 8,
                            border: "1px solid #333",
                            background: isLit ? "#fff" : "transparent",
                            color: isLit ? "#000" : "#bbb",
                            fontWeight: 700,
                        }}
                    >
                        {l}
                    </div>
                );
            })}
        </div>
    );
}
