import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { cases } from "@/lib/cases";
import { projects } from "@/lib/content";
import Stratum from "@/components/figures/Stratum";
import Kratos from "@/components/figures/Kratos";
import Forge from "@/components/figures/Forge";
import Loki from "@/components/figures/Loki";
import Nav from "@/components/ui/Nav";

const figs: Record<string, React.ReactNode> = { "stratum-rag": <Stratum />, "kratos-engine": <Kratos />, "forge-data": <Forge />, loki: <Loki /> };

export function generateStaticParams() { return cases.map((c) => ({ slug: c.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  const p = projects.find((x) => x.slug === slug);
  return c && p ? { title: `${p.name} | Viren Singh`, description: c.headline } : {};
}

export default async function Case({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = cases.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = cases[i];
  const p = projects.find((x) => x.slug === slug)!;
  const next = cases[(i + 1) % cases.length];
  const nextP = projects.find((x) => x.slug === next.slug)!;
  return (
    <main>
      <Nav home="/" />
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Link href="/#work" className="mono text-xs text-cool">All work</Link>
        <p className="mono mt-8 text-xs text-cool">{c.meta}</p>
        <h1 className="display mt-3 text-5xl md:text-7xl">{p.name}</h1>
        <p className="mt-6 max-w-2xl text-xl text-ink md:text-2xl">{c.headline}</p>
        <ul className="mono mt-6 flex flex-wrap gap-2 text-xs text-cool">{c.tags.map((t) => <li key={t} className="border border-line px-3 py-1">{t}</li>)}</ul>
        <div className="measure mt-12 space-y-5"><p>{c.problem}</p><p>{c.built}</p></div>
        <div className="mt-14">{figs[slug]}</div>
        <h2 className="display mt-24 text-3xl md:text-5xl">The decisions that made it work</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {c.decisions.map((d, k) => (
            <li key={d.title} className="border border-line p-5">
              <p className="mono text-xs text-ember">0{k + 1}</p>
              <h3 className="mt-3 text-lg">{d.title}</h3>
              <p className="mt-2 text-sm">{d.body}</p>
            </li>
          ))}
        </ol>
        {c.note && <p className="mono mt-10 border border-dashed border-line p-4 text-xs text-cool">{c.note}</p>}
        <p className="mt-10"><a href={c.repo}>Read the source on {c.repo.includes("gitlab") ? "GitLab" : "GitHub"}</a></p>
        <Link href={`/work/${next.slug}`} className="mt-16 block border border-line p-6 no-underline hover:border-ember">
          <span className="mono text-xs text-cool">Next project</span>
          <span className="display mt-2 block text-3xl text-ink">{nextP.name}</span>
        </Link>
      </article>
    </main>
  );
}
