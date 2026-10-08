"use client";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMode } from "@/lib/capability";
import { person } from "@/lib/content";

const LiquidGlass = dynamic(() => import("@/components/scenes/LiquidGlass"), { ssr: false });

const label = "mono text-[11px] uppercase tracking-[0.14em] text-ink/70";

// Same composition without WebGL: stacked type, cutout in front, CSS glass panel.
function StaticHero({ hidden }: { hidden: boolean }) {
  return (
    <div aria-hidden="true" className={"absolute inset-0 " + (hidden ? "invisible" : "")}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 70% 40%, rgba(255,90,31,0.12), transparent 70%)" }} />
      <div className="absolute inset-x-0 top-24 px-[4vw] font-extrabold uppercase text-ink/90" style={{ letterSpacing: "-0.045em", lineHeight: 0.8 }}>
        <div className="text-[27vw] md:text-[24vw]">Data</div>
        <div className="text-[14.5vw] md:text-[11.5vw]">Scientist &amp;</div>
        <div className="text-[14.5vw] md:text-[11.5vw]">AI Engineer</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/cutout.webp" alt="" width={1200} height={1200} decoding="async" className="absolute bottom-0 left-1/2 aspect-square w-[118vw] max-w-none -translate-x-1/2 md:w-[min(96svh,100vw)]" />
      <div className="absolute bottom-24 left-6 right-6 rounded-3xl border border-white/15 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-xl md:hidden">
        <p className="text-sm text-ink">Retrieval, agents and data tools, in the open.</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const mode = useMode();
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={ref} className="relative h-svh min-h-[640px] overflow-hidden bg-ground">
      <h1 className="sr-only">{person.name}, {person.headline}</h1>
      <StaticHero hidden={mode === "live" && ready} />
      {mode === "live" && <div className="absolute inset-0" aria-hidden="true"><LiquidGlass onReady={onReady} active={active} /></div>}
      <div className="pointer-events-none absolute inset-0 z-10">
        <p className={label + " absolute left-[4vw] top-20"}>{person.name} &copy;</p>
        <ul className={label + " absolute right-[4vw] top-[17%] hidden space-y-1 md:block"}>
          <li>/ Retrieval</li><li>/ Agents</li><li>/ Data tools</li>
        </ul>
        <p className={label + " absolute bottom-6 left-[4vw]"}>Based in India</p>
        <div className="pointer-events-auto absolute bottom-5 right-[4vw]">
          <a href="#work" className="inline-flex min-h-11 items-center rounded-full border border-white/20 bg-white/[0.08] px-6 font-medium text-ink no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl transition-colors hover:border-ember hover:bg-ember hover:text-ground" style={{ transitionDuration: "var(--t-state)" }}>
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}
