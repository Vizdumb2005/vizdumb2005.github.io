"use client";
import { useRef, useState, useEffect } from "react";
import { skills } from "@/lib/content";

const LABEL = ["", "Learning", "Working", "Solid", "Strong", "Expert"];

function Card({ s }: { s: (typeof skills)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const fine = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !fine()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 12}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <li className="skill-slot">
      <div ref={ref} className="skill-card" onPointerMove={move} onPointerLeave={leave} data-on={on}>
        <span className="skill-spec" aria-hidden />
        <p className="mono text-xs text-cool">{s.group}</p>
        <h3 className="display mt-3 text-3xl">{s.name}</h3>
        <p className="mt-3 text-sm opacity-70">{s.note}</p>
      </div>
      <div className="skill-meter" role="img" aria-label={`${s.name}: ${LABEL[s.level]}, ${s.level} of 5`} data-on={on}>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="skill-step" data-filled={i <= s.level} style={{ transitionDelay: `${i * 90}ms` }} />
          ))}
        </div>
        <span className="mono text-[11px] text-cool">{LABEL[s.level]}</span>
      </div>
    </li>
  );
}

export default function Skills() {
  const track = useRef<HTMLUListElement>(null);
  const by = (dir: number) => {
    const t = track.current;
    if (!t) return;
    const slot = t.querySelector<HTMLElement>(".skill-slot");
    t.scrollBy({ left: dir * ((slot?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6">
        <h2 className="display text-5xl md:text-7xl">Skills</h2>
        <div className="hidden gap-3 md:flex">
          <button className="skill-nav" aria-label="Previous skills" onClick={() => by(-1)}>←</button>
          <button className="skill-nav" aria-label="Next skills" onClick={() => by(1)}>→</button>
        </div>
      </div>
      <ul ref={track} className="skill-track mt-12" tabIndex={0} aria-label="Skills carousel">
        {skills.map((s) => <Card key={s.name} s={s} />)}
      </ul>
    </section>
  );
}
