const items = [["Work", "#work"], ["Founder", "#founder"], ["Credentials", "#credentials"], ["Contact", "#contact"]];
export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 border-b border-line bg-ground/80 backdrop-blur-sm">
      <nav aria-label="Primary" className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 whitespace-nowrap">
        <a href="#top" className="font-semibold no-underline">Viren Singh</a>
        <ul className="flex gap-4 text-sm md:gap-6">{items.map(([l, h]) => <li key={h} className={h === "#founder" || h === "#credentials" ? "hidden md:block" : ""}><a href={h} className="no-underline hover:underline">{l}</a></li>)}</ul>
      </nav>
    </header>
  );
}
