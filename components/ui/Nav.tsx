import { person } from "@/lib/content";
import NameMark from "./NameMark";
const items = [["Work", "#work"], ["Founder", "#founder"], ["Credentials", "#credentials"]];
export default function Nav({ home = "" }: { home?: string }) {
  return (
    <header className="fixed inset-x-0 top-3 z-20 px-3">
      <nav aria-label="Primary" className="glass-bar mx-auto flex h-14 max-w-5xl items-center justify-between whitespace-nowrap rounded-full pl-6 pr-2">
        <NameMark href={home || "#top"} />
        <ul className="flex items-center gap-4 text-sm md:gap-6">
          {items.map(([l, h]) => <li key={h} className="hidden md:block"><a href={home + h} className="no-underline opacity-80 transition-opacity hover:opacity-100">{l}</a></li>)}
          <li><a href={`mailto:${person.email}`} className="inline-flex min-h-10 items-center rounded-full border border-ember/70 px-5 text-ink no-underline transition-colors hover:bg-ember hover:text-ground">Email me</a></li>
        </ul>
      </nav>
    </header>
  );
}
