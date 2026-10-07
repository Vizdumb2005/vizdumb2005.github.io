"use client";
import { useMemo, useState } from "react";

// A small simulation of entropy-based question selection over 16 cards.
// Work in progress. No camera. The real project is moving toward gaze detection.
const N = 16;
const bits = [8, 4, 2, 1];

export default function Loki() {
  const [secret, setSecret] = useState<number | null>(null);
  const [alive, setAlive] = useState<number[]>(Array.from({ length: N }, (_, i) => i));
  const [asked, setAsked] = useState(0);
  const entropy = Math.log2(alive.length);
  const q = useMemo(() => (asked < 4 ? bits[asked] : null), [asked]);
  const inSet = (c: number) => (q ? (c & q) !== 0 : false);

  function answer() {
    if (secret === null || q === null) return;
    const yes = inSet(secret);
    setAlive((a) => a.filter((c) => inSet(c) === yes));
    setAsked((n) => n + 1);
  }
  function reset() { setSecret(null); setAlive(Array.from({ length: N }, (_, i) => i)); setAsked(0); }

  return (
    <figure className="border border-line p-5 md:p-8">
      <p className="mono text-xs text-cool">{secret === null ? "Step 1: pick a card and remember it. The sim only keeps it in this page." : asked < 4 ? `Question ${asked + 1}: is your card in the highlighted set?` : "Done. One card left."}</p>
      <div className="mt-4 grid grid-cols-4 gap-2" role="group" aria-label="16 cards">
        {Array.from({ length: N }, (_, c) => {
          const on = alive.includes(c);
          const hl = on && q !== null && secret !== null && inSet(c);
          return (
            <button key={c} type="button" disabled={secret !== null} onClick={() => setSecret(c)}
              aria-label={`Card ${c + 1}${on ? "" : ", eliminated"}`}
              className={"mono min-h-11 border text-xs transition-all " + (!on ? "border-line text-line" : hl ? "border-ember text-ink" : "border-cool text-body") + (c === secret && asked === 4 ? " bg-ember text-ground" : "")}>
              {c + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="button" onClick={answer} disabled={secret === null || asked >= 4}
          className="mono min-h-11 border border-ember px-4 text-xs text-ink disabled:border-line disabled:text-cool">
          Answer honestly
        </button>
        <button type="button" onClick={reset} className="mono min-h-11 border border-line px-4 text-xs text-cool hover:text-ink">Reset</button>
        <span className="mono text-xs text-cool">Entropy: {entropy.toFixed(1)} bits, {alive.length} left</span>
      </div>
      <div className="mt-3 h-1 bg-line" aria-hidden="true"><div className="h-1 bg-ember transition-all" style={{ width: `${(entropy / 4) * 100}%` }} /></div>
      <figcaption className="mono mt-4 text-xs text-cool">Simulation of the idea behind LOKI. Work in progress. No camera is used. The project is moving toward gaze direction, with a focus on cards.</figcaption>
    </figure>
  );
}
