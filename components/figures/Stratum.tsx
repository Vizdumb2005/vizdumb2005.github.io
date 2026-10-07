"use client";
import { Stepper, Box, type Step } from "./Stepper";

// Facts: README at gitlab.com/viren.singh.email/stratum-rag (read, not run).
const steps: Step[] = [
  { id: "q", label: "1 Query", note: "A question comes in." },
  { id: "s", label: "2 Dense + BM25", note: "Two searches run side by side: vector search in Qdrant and keyword search with BM25." },
  { id: "f", label: "3 Fusion", note: "Reciprocal rank fusion merges the two ranked lists into one." },
  { id: "r", label: "4 Rerank", note: "A cross-encoder rescores the top results against the question." },
  { id: "g", label: "5 CI gate", note: "In CI, a quality drop of more than 3% fails the build." },
];
export default function Stratum() {
  return (
    <Stepper steps={steps} caption="Stratum RAG retrieval pipeline, from the README. Not a live demo.">
      {(a) => (
        <svg viewBox="0 0 640 170" className="w-full min-w-[560px]">
          <Box x={10} y={63} w={80} on={a === 0} label="Query" />
          <Box x={130} y={20} on={a === 1} label="Dense (Qdrant)" />
          <Box x={130} y={106} on={a === 1} label="BM25" />
          <Box x={290} y={63} w={90} on={a === 2} label="RRF fusion" />
          <Box x={420} y={63} w={100} on={a === 3} label="Cross-encoder" />
          <Box x={555} y={63} w={75} on={a === 4} label="CI gate" />
          {[[90, 85, 130, 42], [90, 85, 130, 128], [240, 42, 290, 85], [240, 128, 290, 85], [380, 85, 420, 85], [520, 85, 555, 85]].map((l, k) => (
            <line key={k} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#6e7b8b" />
          ))}
        </svg>
      )}
    </Stepper>
  );
}
