import { person } from "@/lib/content";
const items = [["Work", "#work"], ["Founder", "#founder"], ["Credentials", "#credentials"]];
export default function Nav({ home = "" }: { home?: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 border-b border-line bg-ground/80 backdrop-blur-sm">
      <nav aria-label="Primary" className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 whitespace-nowrap">
        <a href={home || "#top"} className="font-semibold no-underline">Viren Singh</a>
        <ul className="flex items-center gap-4 text-sm md:gap-6">
          {items.map(([l, h]) => <li key={h} className="hidden md:block"><a href={home + h} className="no-underline hover:underline">{l}</a></li>)}
          <li><a href={`mailto:${person.email}`} className="inline-flex min-h-11 items-center border border-ember px-4 text-ink no-underline transition-colors hover:bg-ember hover:text-ground">Email me</a></li>
        </ul>
      </nav>
    </header>
  );
}
