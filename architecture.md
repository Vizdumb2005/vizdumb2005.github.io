# architecture.md

## Goal
A dark, premium, 3D portfolio for Viren Singh. Concept: The Prestige (pledge, turn, prestige). Every 3D object maps to a real repo. Spec is the source of truth for design decisions.

## Stack
- Next.js (App Router), static export (`output: "export"`), TypeScript
- React Three Fiber, three, drei for 3D
- GSAP ScrollTrigger and Lenis for scroll
- CSS variables for tokens, Tailwind for layout
- Hosting: free static host (Cloudflare Pages first)
- No backend, no database, no analytics at launch

## Rendering model
- All content is real HTML. The page is complete and readable with no JavaScript for 3D.
- One persistent `<canvas>` sits fixed behind the page. Scenes mount per section and only one renders at a time.
- Hero headline is plain HTML so LCP never waits for WebGL.

## Capability gate (`lib/capability.ts`)
Live 3D runs only if ALL are true: viewport >= 768px, no `prefers-reduced-motion`, WebGL2 available, not on a data-saver connection. Otherwise every scene renders its fallback: a pre-rendered loop with poster, plus a static SVG of the same diagram. LOKI stays interactive in 2D.
A frame-time governor lowers point counts (4000, 1500, 600) when frames run long.

## Directory plan
```
app/
  layout.tsx            fonts, metadata, theme lock (dark)
  page.tsx              section order
  globals.css           design tokens
  work/[slug]/page.tsx  case study routes
components/
  scenes/               BeliefField, StratumPipeline, KratosRing, ForgeConcept, LokiSim
  sections/             Hero, Work, Founder, Credentials, Contact
  ui/                   Nav, Button, Slot (labelled placeholder)
lib/
  capability.ts
  content.ts            all copy and facts, each with a source
public/
  fallbacks/            posters, loops (added later)
```

## Content rules
- Every claim has a source in a README or in code. `lib/content.ts` stores the source next to each fact.
- FORGE-Data is a concept and is tagged so. LOKI is work in progress. VANI and FixiDesk README are not shown.
- No fake proof. No client logos. No invented numbers.
- No camera access, ever.

## Design tokens (from spec)
- Ground #0A0A0B, text #ECE7DC, body #A8A399, accent ember #FF5A1F, cool #6E7B8B
- Display Cabinet Grotesk, body Geist, labels Geist Mono
- Easing settle: cubic-bezier(0.22, 1, 0.36, 1). Durations 200, 450, 900 ms.

## Performance budget
- Initial JS under 350 KB gzipped, 3D chunk after first paint
- LCP under 2.0 s, CLS under 0.05 on mid-range Android over 4G
- Pixel ratio cap 1.75, instanced meshes, dispose on unmount

## Deploy
Static output in `out/`. Deploy via Cloudflare Pages (build `npm run build`, output `out`) or GitHub Pages.
