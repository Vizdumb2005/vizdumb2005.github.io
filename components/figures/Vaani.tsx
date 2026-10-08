"use client";
import { Stepper, Box, type Step } from "./Stepper";

// Facts: README at gitlab.com/viren.singh.email/vani (read, not run). Design, not a live deployment.
const steps: Step[] = [
  { id: "c", label: "1 Channels", note: "Citizens write or speak through WhatsApp, SMS via RapidPro, Telegram, phone IVR or the web." },
  { id: "a", label: "2 Cloud Run API", note: "A stateless FastAPI gateway on Cloud Run takes the request and hands the heavy work to Pub/Sub." },
  { id: "v", label: "3 Vertex AI", note: "Speech recognition and text-to-speech for Indian languages, plus Gemini vision to score damage in citizen photos." },
  { id: "b", label: "4 BigQuery", note: "Requests are placed on district boundary polygons and grouped into demand clusters. Small groups are suppressed for privacy." },
  { id: "p", label: "5 Policy cockpit", note: "A multi-criteria ranking of where to invest first, shown in a Next.js dashboard and batched to the grievance portal." },
];
export default function Vaani() {
  return (
    <Stepper steps={steps} caption="VAANI architecture on Google Cloud, from the README. A prototype design, not deployed.">
      {(a) => (
        <svg viewBox="0 0 700 110" className="w-full min-w-[620px]">
          <Box x={5} y={40} w={100} on={a === 0} label="Channels" />
          <Box x={145} y={40} w={110} on={a === 1} label="Cloud Run API" />
          <Box x={295} y={40} w={100} on={a === 2} label="Vertex AI" />
          <Box x={435} y={40} w={100} on={a === 3} label="BigQuery" />
          <Box x={575} y={40} w={120} on={a === 4} label="Policy cockpit" />
          {[[105, 62, 145, 62], [255, 62, 295, 62], [395, 62, 435, 62], [535, 62, 575, 62]].map((l, k) => (
            <line key={k} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke="#6e7b8b" />
          ))}
        </svg>
      )}
    </Stepper>
  );
}
