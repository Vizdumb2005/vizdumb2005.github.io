"use client";
import { useEffect, useState } from "react";

export type Mode = "pending" | "live" | "fallback";

function webgl2(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  } catch {
    return false;
  }
}

export function useMode(): Mode {
  const [mode, setMode] = useState<Mode>("pending");
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setMode(wide && !calm && !saver && webgl2() ? "live" : "fallback");
  }, []);
  return mode;
}
