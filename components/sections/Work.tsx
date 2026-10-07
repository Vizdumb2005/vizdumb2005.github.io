import { projects, fixidesk } from "@/lib/content";
import Stratum from "@/components/figures/Stratum";
import Kratos from "@/components/figures/Kratos";
import Forge from "@/components/figures/Forge";
import Loki from "@/components/figures/Loki";

const figures: Record<string, React.ReactNode> = { "stratum-rag": <Stratum />, "kratos-engine": <Kratos />, "forge-data": <Forge />, loki: <Loki /> };

const tag: Record<string, string> = {
  "shipped-open-source": "Open source",
  concept: "Concept, in progress",
  "work-in-progress": "Work in progress",
};

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28">
      <h2 className="display text-5xl md:text-7xl">Work</h2>
      <div className="mt-14 space-y-24">
        {projects.map((p, i) => (
          <article key={p.slug} className="grid gap-8 md:grid-cols-12">
            <div className={i === 0 ? "md:col-span-5" : "md:col-span-4"}>
              <p className="mono text-xs text-cool">{tag[p.status]}</p>
              <h3 className="display mt-3 text-4xl md:text-5xl">{p.name}</h3>
              <p className="mt-4">{p.summary}</p>
              <p className="mono mt-4 text-xs text-cool">{p.stack.join(" / ")}</p>
              <p className="mt-4 flex gap-5">{(p.slug === "stratum-rag" || p.slug === "kratos-engine") && <a href={`/work/${p.slug}`}>Case study</a>}{p.href && <a href={p.href}>Repo</a>}</p>
            </div>
            <div className={i === 0 ? "md:col-span-7" : "md:col-span-8"}>
              {figures[p.slug]}
            </div>
          </article>
        ))}
      </div>
      <p className="mono mt-20 text-xs text-cool">
        Also on GitLab (FixiDesk group): {fixidesk.map((f, i) => <span key={f.name}>{i > 0 && ", "}<a href={f.href}>{f.name}</a></span>)}
      </p>
    </section>
  );
}
