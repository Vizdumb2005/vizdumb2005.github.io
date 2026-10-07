"use client";
import { Stepper, type Step } from "./Stepper";

// Facts: README at gitlab.com/viren.singh.email/kratos-engine (read, not run).
const steps: Step[] = [
  { id: "t", label: "THINK", note: "The model reasons about the next move." },
  { id: "c", label: "CALL", note: "It calls a tool: sandboxed Python or read-only DuckDB." },
  { id: "v", label: "VERIFY", note: "The result is checked before it is trusted." },
  { id: "f", label: "FINAL", note: "Only then does the loop return an answer." },
];
export default function Kratos() {
  const pts = [[160, 20], [300, 90], [160, 160], [20, 90]];
  return (
    <Stepper steps={steps} caption="Kratos agent loop, from the README. Not a live demo.">
      {(a) => (
        <svg viewBox="-70 -20 460 230" className="mx-auto w-full max-w-lg">
          {pts.map((p, k) => {
            const n = pts[(k + 1) % 4];
            return <line key={k} x1={p[0]} y1={p[1]} x2={n[0]} y2={n[1]} stroke="#6e7b8b" strokeDasharray={k === 3 ? "4 4" : undefined} />;
          })}
          {pts.map((p, k) => (
            <g key={k} opacity={k === a ? 1 : 0.4}>
              <circle cx={p[0]} cy={p[1]} r="16" fill="#0a0a0b" stroke={k === a ? "#ff5a1f" : "#6e7b8b"} />
              <text x={p[0]} y={p[1] + (k === 0 ? -24 : k === 2 ? 32 : 4)} textAnchor={k === 1 ? "start" : k === 3 ? "end" : "middle"} dx={k === 1 ? 24 : k === 3 ? -24 : 0} fill="#ece7dc" fontSize="11" fontFamily="var(--font-geist-mono)">{steps[k].label}</text>
            </g>
          ))}
        </svg>
      )}
    </Stepper>
  );
}
