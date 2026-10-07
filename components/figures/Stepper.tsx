"use client";
import { useState, type ReactNode } from "react";

export type Step = { id: string; label: string; note: string };

// Shared step control. Buttons, not hover, so it works on touch and keyboard.
export function Stepper({ steps, children, caption }: {
  steps: Step[];
  children: (active: number) => ReactNode;
  caption: string;
}) {
  const [i, setI] = useState(0);
  return (
    <figure className="border border-line p-5 md:p-8">
      <div aria-hidden="true" className="overflow-x-auto">{children(i)}</div>
      <div role="group" aria-label={caption} className="mt-6 flex flex-wrap gap-2">
        {steps.map((s, k) => (
          <button key={s.id} type="button" aria-pressed={k === i} onClick={() => setI(k)}
            className={"mono min-h-11 border px-3 text-xs transition-colors " + (k === i ? "border-ember text-ink" : "border-line text-cool hover:text-ink")}>
            {s.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 min-h-14 text-sm">{steps[i].note}</p>
      <figcaption className="mono mt-2 text-xs text-cool">{caption}</figcaption>
    </figure>
  );
}

export function Box({ x, y, w = 110, h = 44, on, label }: { x: number; y: number; w?: number; h?: number; on: boolean; label: string }) {
  return (
    <g style={{ transition: "opacity 200ms" }} opacity={on ? 1 : 0.35}>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={on ? "#ff5a1f" : "#6e7b8b"} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fill="#ece7dc" fontSize="12" fontFamily="var(--font-geist-mono)">{label}</text>
    </g>
  );
}
