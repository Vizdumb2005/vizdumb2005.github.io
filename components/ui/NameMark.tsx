"use client";
import { useEffect, useRef, useState } from "react";

const NAME = "Viren Singh";

// Name that melts on hover (SVG turbulence displacement plus per-letter drip),
// while a small avatar rises from below the bar and waves.
export default function NameMark({ href }: { href: string }) {
  const [open, setOpen] = useState(false);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const raf = useRef(0);
  const amt = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduced = useRef(false);
  const ptype = useRef("mouse");

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => { cancelAnimationFrame(raf.current); clearTimeout(timer.current); };
  }, []);

  useEffect(() => {
    cancelAnimationFrame(raf.current);
    if (reduced.current) { disp.current?.setAttribute("scale", "0"); return; }
    const to = open ? 34 : 0;
    const tick = () => {
      amt.current += (to - amt.current) * 0.1;
      if (Math.abs(to - amt.current) < 0.3) amt.current = to;
      disp.current?.setAttribute("scale", amt.current.toFixed(1));
      if (amt.current !== to) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
  }, [open]);

  return (
    <a
      href={href}
      className="namemark relative flex h-11 items-center no-underline"
      data-open={open}
      aria-label="Viren Singh, home"
      onPointerDown={(e) => { ptype.current = e.pointerType; }}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") setOpen(false); }}
      onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setOpen(true); }}
      onBlur={() => setOpen(false)}
      onClick={(e) => {
        if (ptype.current !== "mouse" && !open) {
          e.preventDefault();
          setOpen(true);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setOpen(false), 3600);
        }
      }}
    >
      <svg width="0" height="0" className="absolute" aria-hidden focusable="false">
        <filter id="melt" x="-10%" y="-40%" width="120%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.06" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.7" />
        </filter>
      </svg>
      <span className="namemark-text display text-[26px] leading-none" aria-hidden>
        {NAME.split("").map((ch, i) => (
          <span key={i} className="namemark-ch" style={{ ["--i" as string]: i }}>{ch === " " ? "\u00A0" : ch}</span>
        ))}
      </span>
      <span className="namemark-hi" aria-hidden>
        <span className="namemark-avatar" />
        <svg className="namemark-wave" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff5a1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
        </svg>
        <span className="mono text-xs text-ink">Hi, I&apos;m Viren</span>
      </span>
    </a>
  );
}
