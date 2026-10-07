"use client";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Scene 1: a loose probability volume. The pointer is evidence:
// points near it lose entropy and tighten onto a thin sheet.
function Field({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { size } = useThree();
  const { base, pos } = useMemo(() => {
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.2 * Math.cbrt(Math.random());
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      base[i * 3] = r * Math.sin(p) * Math.cos(t) * 1.6;
      base[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      base[i * 3 + 2] = r * Math.cos(p);
    }
    return { base, pos: new Float32Array(base) };
  }, [count]);
  const pointer = useRef(new THREE.Vector2(10, 10));

  useFrame((state, dt) => {
    const pts = ref.current;
    if (!pts) return;
    const px = state.pointer.x * 3.4 * 1.6;
    const py = state.pointer.y * 3.2;
    const tt = state.clock.elapsedTime;
    pointer.current.set(px, py);
    const arr = pts.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const bx = base[i * 3], by = base[i * 3 + 1], bz = base[i * 3 + 2];
      const dx = bx - px, dy = by - py;
      const d = Math.sqrt(dx * dx + dy * dy);
      const pull = Math.exp(-d * d * 0.35); // evidence strength
      const drift = 0.06 * Math.sin(tt * 0.4 + i * 0.37);
      const tx = bx + drift;
      const ty = by + drift * 0.8;
      const tz = bz * (1 - 0.92 * pull);
      const k = 1 - Math.exp(-dt * 3);
      arr[i * 3] += (tx - arr[i * 3]) * k;
      arr[i * 3 + 1] += (ty - arr[i * 3 + 1]) * k;
      arr[i * 3 + 2] += (tz - arr[i * 3 + 2]) * k;
    }
    pts.geometry.attributes.position.needsUpdate = true;
    pts.rotation.y = Math.sin(tt * 0.1) * 0.08;
  });

  void size;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#ff5a1f" transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function BeliefField() {
  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 6.5], fov: 42 }} gl={{ antialias: false, powerPreference: "high-performance" }} aria-hidden>
      <Field count={4000} />
    </Canvas>
  );
}
