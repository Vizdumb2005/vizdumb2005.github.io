# AGENTS.md

Working notes for any AI agent building this project. Read this, task.md and architecture.md before changing anything.

## Project
Portfolio site for Viren Singh. Spec (private): https://files.instinct.com/3qc0792o7lb7-portfolio-site-spec-viren-singh
The spec wins any disagreement with these notes. If the spec is wrong, say so to the owner rather than drifting.

## Rules
1. Update task.md in the same change as the work. Log decisions at the bottom.
2. Read the Next.js docs in `node_modules/next/dist/docs/` before using Next APIs. This Next version differs from older releases.
3. Never invent facts. Content comes from `lib/content.ts`, each with a source. If a fact has no source, leave a labelled placeholder.
4. FORGE-Data is a concept. LOKI is work in progress, direction now gaze detection with a card focus. Say so on the page. No camera access.
5. Never commit the owner's phone number, home address or any credential. The contact email is viren.singh.email@gmail.com and is public on the contact section only, by the owner's choice.
6. Company name is NeuraFinix. IIT Madras is "BS Data Science (coursework)", never a completed degree.
7. Anti-slop checks in the spec are pass or fail. No gradient glow, no glass cards, no random floating shapes, no fake testimonials, no emoji, no em dashes in copy.
8. Real HTML for all content. Canvas is aria-hidden. Respect reduced motion. Every scene needs a fallback.
9. Check visually: render the page at 390px and 1280px and look at it before calling work done.
10. Do not push, deploy or change repo visibility without the owner's say. Do not run unknown install scripts.

## Owner
Viren writes short, casual messages and prefers short copy. Ask one clear question at a time when blocked.

## Commands
- `npm run dev` local dev
- `npm run build` static export to `out/`
