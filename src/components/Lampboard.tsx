const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Lampboard(props: { lit: string | null }) {
    return (
        <div className="lamps">
            {ALPHABET.map((l) => {
                const isLit = props.lit === l;
                return (
                    <div key={l} className={isLit ? "lamp lamp--lit" : "lamp"}>
                        {l}
                    </div>
                );
            })}
        </div>
    );
}
