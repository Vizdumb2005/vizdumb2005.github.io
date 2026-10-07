"use client";
import dynamic from "next/dynamic";
import { useMode } from "@/lib/capability";
import { person } from "@/lib/content";

const BeliefField = dynamic(() => import("@/components/scenes/BeliefField"), { ssr: false });

export default function Hero() {
  const mode = useMode();
  return (
    <section className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        {mode === "live" ? <BeliefField /> : <div className="h-full w-full" style={{ background: "radial-gradient(60% 50% at 70% 45%, rgba(255,90,31,0.10), transparent 70%)" }} />}
      </div>
      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-6 pt-20">
        <h1 className="measure text-4xl md:text-6xl lg:text-7xl">
          I build AI systems that show their work.
        </h1>
        <p className="mt-6 max-w-xl text-lg">
          {person.name}, {person.headline}. Retrieval, agents and data tools, in the open.
        </p>
        <div className="mt-8">
          <a href="#work" className="inline-flex items-center rounded-full bg-ember px-6 py-3 font-medium text-ground no-underline transition-colors" style={{ transitionDuration: "var(--t-state)" }}>
            See the work
          </a>
        </div>
      </div>
    </section>
  );
}
