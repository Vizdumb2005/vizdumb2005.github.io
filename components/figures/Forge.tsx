// Concept only. Owner: incomplete project, shown as an idea (2026-10-08).
export default function Forge() {
  const panes = ["SQL", "Python notebook", "AI copilot"];
  return (
    <figure className="border border-line p-5 md:p-8">
      <div className="grid gap-3 md:grid-cols-3">
        {panes.map((p) => (
          <div key={p} className="mono border border-dashed border-line p-4 text-xs text-cool">
            <p className="text-ink">{p}</p>
            <div className="mt-4 space-y-2" aria-hidden="true">
              <div className="h-1.5 w-4/5 bg-line" /><div className="h-1.5 w-3/5 bg-line" /><div className="h-1.5 w-2/3 bg-line" />
            </div>
          </div>
        ))}
      </div>
      <p className="mono mt-3 border border-line p-3 text-center text-xs text-cool">Self-hosted, one canvas</p>
      <figcaption className="mono mt-4 text-xs text-ember">Concept, in progress. A sketch of the idea, not a working product.</figcaption>
    </figure>
  );
}
