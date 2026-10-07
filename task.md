# task.md

Progress tracker. Update this file in the same commit as the work it describes.
Status: [ ] todo, [~] in progress, [x] done, [!] blocked.

Spec: https://files.instinct.com/3qc0792o7lb7-portfolio-site-spec-viren-singh (private, revision 2)

## Phase 0: alignment
- [x] Spec written and revised with Viren's answers
- [x] task.md, architecture.md, AGENTS.md created before any site code
- [x] Next.js app scaffolded locally (Next 16, TypeScript, Tailwind)
- [!] Repo push: local only. GitHub access was logged out after the first push. Needs a fresh device-flow approval from Viren.
- [x] Host: GitHub Pages at vizdumb2005.github.io (repo must be public; Viren has been told, final yes pending at push time)

## Phase 1: foundation
- [x] Design tokens (colour, type scale, spacing, easing) in app/globals.css
- [x] Layout, nav (one line at 1024px), section shells with labelled placeholders
- [x] Capability gate: decides live 3D vs fallback
- [x] Hero belief field (Scene 1), verified at 1280 and 390
- [ ] Display font: shipping Geist for now. Cabinet Grotesk only after the Fontshare licence is checked.
- [x] Hero fallback on mobile, reduced motion and save-data (gradient, no canvas)

## Phase 2: Stratum scene and case study route
- [x] Stratum pipeline figure (stepper, SVG, from README). Pinned-scroll version dropped: stepper works on touch and keyboard.
- [ ] /work/stratum-rag case study page (not started)

## Phase 3: Kratos and FORGE-Data (concept)
- [x] Kratos loop figure (stepper)
- [x] FORGE-Data concept sketch, tagged "Concept, in progress"

## Phase 4: LOKI simulation
- [x] LOKI simulation: 16 cards, 4 yes/no questions, entropy bar (2D, works on mobile)
- [x] On-screen label: simulation, work in progress, gaze direction noted, no camera

## Phase 5: content
- [x] Founder section, portrait slot
- [x] Credentials, education worded as coursework for IIT Madras
- [x] Contact: mailto link
- [x] FixiDesk archive row (vigil-stream, VERIGRPO), no claims

## Phase 6: ship
- [ ] Real-device performance pass (mid-range Android, 4G)
- [ ] Accessibility and reduced-motion pass
- [ ] Anti-slop checklist from the spec, every item
- [ ] Deploy to free host

## Waiting on Viren
- Stratum and Kratos screenshots or recordings
- Portrait photo
- One line each on vigil-stream and VERIGRPO, if wanted
- What exists today at NeuraFinix (services, delivered work)
- Confirm Stratum "53 tests", else it stays off
- Pick the free address
- GitHub device-flow approval to push

## Log
- 2026-10-08: Spec v2 published. Docs created. Scaffold in place, hero in progress.
- 2026-10-08 00:12: Figures built and checked with Playwright screenshots at 1280 and 390, no console errors, no horizontal overflow. Fixed mobile nav overflow and Kratos label clipping. Not yet done: real-device perf, a11y audit, anti-slop checklist pass, case-study route, Pages deploy workflow.
