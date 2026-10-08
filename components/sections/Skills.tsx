"use client";
import { useRef, useState, useEffect } from "react";
import { skills } from "@/lib/content";

const LABEL = ["", "Learning", "Working", "Solid", "Strong", "Expert"];

function Card({ s, ring, slotRef }: { s: (typeof skills)[number]; ring?: boolean; slotRef?: (el: HTMLLIElement | null) => void }) {
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
    if (!el || !fine() || (ring && document.body.dataset.ringDrag)) return;
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
    <li className={ring ? "skill-slot skill-ring-slot" : "skill-slot"} ref={slotRef}>
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

const N = skills.length;
const STEP = 360 / N;
const norm = (a: number) => ((((a + 180) % 360) + 360) % 360) - 180;

function Ring() {
  const stage = useRef<HTMLDivElement>(null);
  const ringEl = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLLIElement | null)[]>([]);
  const st = useRef({ rot: 0, vel: 0, drag: false, lastX: 0, lastT: 0, idleAt: 0, target: null as number | null, R: 480, visible: true });

  useEffect(() => {
    const stg = stage.current, ring = ringEl.current;
    if (!stg || !ring) return;
    const S = st.current;
    const layout = () => {
      const w = stg.clientWidth;
      const cw = w < 640 ? 230 : 290;
      stg.style.setProperty("--cw", cw + "px");
      S.R = Math.round(cw / 2 / Math.tan(Math.PI / N)) + 40;
      slots.current.forEach((el, i) => el && (el.dataset.base = `rotateY(${i * STEP}deg) translateZ(${S.R}px)`));
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(stg);
    const io = new IntersectionObserver(([e]) => (S.visible = e.isIntersecting), { threshold: 0 });
    io.observe(stg);

    let raf = 0, prev = performance.now();
    const frame = (t: number) => {
      const dt = Math.min(48, t - prev); prev = t;
      if (S.visible) {
        if (!S.drag) {
          if (S.target !== null) {
            S.rot += (S.target - S.rot) * 0.12;
            if (Math.abs(S.target - S.rot) < 0.05) { S.rot = S.target; S.target = null; S.idleAt = t; }
          } else if (Math.abs(S.vel) > 0.004) {
            S.rot += S.vel * dt;
            S.vel *= Math.pow(0.94, dt / 16);
            S.idleAt = t;
          } else if (t - S.idleAt > 2500) {
            S.rot += 0.006 * dt; // slow drift when left alone
          }
        }
        ring.style.transform = `translateZ(${-S.R}px) rotateY(${S.rot}deg)`;
        slots.current.forEach((el, i) => {
          if (!el) return;
          const d = Math.abs(norm(i * STEP + S.rot));
          const f = Math.max(0, 1 - d / 100);
          el.style.transform = el.dataset.base || "";
          el.style.opacity = String(0.22 + 0.78 * f);
          el.style.filter = `brightness(${0.55 + 0.45 * f})`;
          el.style.pointerEvents = d < 40 ? "auto" : "none";
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const down = (e: PointerEvent) => {
      S.drag = true; S.target = null; S.vel = 0; S.lastX = e.clientX; S.lastT = performance.now();
      document.body.dataset.ringDrag = "1";
      stg.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!S.drag) return;
      const now = performance.now();
      const dx = e.clientX - S.lastX;
      const k = 0.32; // degrees per pixel
      S.rot += dx * k;
      const dt = Math.max(1, now - S.lastT);
      S.vel = 0.8 * S.vel + 0.2 * ((dx * k) / dt);
      S.lastX = e.clientX; S.lastT = now;
    };
    const up = () => {
      if (!S.drag) return;
      S.drag = false; S.idleAt = performance.now();
      delete document.body.dataset.ringDrag;
    };
    stg.addEventListener("pointerdown", down);
    stg.addEventListener("pointermove", move);
    stg.addEventListener("pointerup", up);
    stg.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      stg.removeEventListener("pointerdown", down); stg.removeEventListener("pointermove", move);
      stg.removeEventListener("pointerup", up); stg.removeEventListener("pointercancel", up);
    };
  }, []);

  const snap = (dir: number) => {
    const S = st.current;
    S.vel = 0;
    S.target = Math.round((S.rot - dir * STEP) / STEP) * STEP;
  };
  return (
    <>
      <div className="mx-auto flex max-w-6xl items-end justify-between px-6">
        <h2 className="display text-5xl md:text-7xl">Skills</h2>
        <div className="flex gap-3">
          <button className="skill-nav" aria-label="Previous skill" onClick={() => snap(-1)}>←</button>
          <button className="skill-nav" aria-label="Next skill" onClick={() => snap(1)}>→</button>
        </div>
      </div>
      <div
        ref={stage}
        className="skill-stage mt-10"
        tabIndex={0}
        role="group"
        aria-label="Skills carousel. Drag, or use the arrow keys, to rotate."
        onKeyDown={(e) => { if (e.key === "ArrowLeft") snap(-1); if (e.key === "ArrowRight") snap(1); }}
      >
        <div ref={ringEl} className="skill-ring">
          {skills.map((s, i) => <Card key={s.name} s={s} ring slotRef={(el) => { slots.current[i] = el; }} />)}
        </div>
      </div>
      <p className="mono mt-2 text-center text-[11px] text-cool">Drag to rotate</p>
    </>
  );
}

function Flat() {
  return (
    <>
      <div className="mx-auto max-w-6xl px-6"><h2 className="display text-5xl md:text-7xl">Skills</h2></div>
      <ul className="skill-track mt-12" tabIndex={0} aria-label="Skills">
        {skills.map((s) => <Card key={s.name} s={s} />)}
      </ul>
    </>
  );
}

export default function Skills() {
  const [flat, setFlat] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const f = () => setFlat(mq.matches);
    f(); mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return <section id="skills" className="overflow-x-clip py-24">{flat ? <Flat /> : <Ring />}</section>;
}
