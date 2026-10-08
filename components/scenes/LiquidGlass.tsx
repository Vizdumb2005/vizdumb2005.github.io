"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Hero scene. One full-screen shader composites four layers (dust, type,
// portrait cutout, ember asterisk) and refracts them through a liquid glass
// bead that follows the pointer. Type is drawn to a 2D canvas texture so the
// real font is used. Red channel = type behind the portrait, green = asterisk in front.

const LINES = ["DATA", "SCIENTIST &", "AI ENGINEER"];

const vert = /* glsl */ `
varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const frag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes, uP1, uP2, uMouse, uStar;
uniform float uTime, uScroll, uLensR, uStarR;
uniform vec4 uPortrait;
uniform sampler2D tType, tPortrait;

float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }

float sdf(vec2 p){
  float d1 = length(p-uP1) - uLensR;
  float d2 = length(p-uP2) - uLensR*0.5;
  float k = uLensR*0.7;
  float h = clamp(0.5 + 0.5*(d2-d1)/k, 0.0, 1.0);
  return mix(d2, d1, h) - k*h*(1.0-h);
}

vec3 scene(vec2 p){
  vec3 col = vec3(0.039, 0.039, 0.043);
  // ember dust, one point per cell
  vec2 cell = floor((p + vec2(0.0, uTime*6.0)) / 54.0);
  vec2 f = fract((p + vec2(0.0, uTime*6.0)) / 54.0);
  float on = step(0.86, hash(cell));
  vec2 c = 0.2 + 0.6*vec2(hash(cell+3.1), hash(cell+7.7));
  float dust = on * smoothstep(0.045, 0.0, length(f-c)) * (0.5+0.5*sin(uTime*0.8+hash(cell)*6.28));
  col += vec3(1.0, 0.35, 0.12) * dust * 0.55;
  // type behind portrait
  vec2 tp = (p - vec2(uMouse.x*-12.0, uScroll*0.22 + uMouse.y*-7.0)) / uRes;
  float typ = (tp.x>0.0&&tp.x<1.0&&tp.y>0.0&&tp.y<1.0) ? texture2D(tType, tp).r : 0.0;
  col = mix(col, vec3(0.925,0.906,0.863), typ);
  // portrait
  vec2 pp = (p - vec2(uMouse.x*9.0, uScroll*0.08 + uMouse.y*5.0) - uPortrait.xy) / uPortrait.zw;
  if(pp.x>0.0&&pp.x<1.0&&pp.y>0.0&&pp.y<1.0){
    vec4 t = texture2D(tPortrait, pp);
    col = mix(col, t.rgb*vec3(1.0,0.985,0.96), t.a);
  }
  // asterisk in front, slowly turning
  vec2 sp = p - vec2(uMouse.x*24.0, uScroll*0.14 + uMouse.y*14.0);
  vec2 d = sp - uStar; float a = uTime*0.25; float cs = cos(a), sn = sin(a);
  vec2 r = vec2(cs*d.x - sn*d.y, sn*d.x + cs*d.y) + uStar;
  vec2 sq = r / uRes;
  float star = (sq.x>0.0&&sq.x<1.0&&sq.y>0.0&&sq.y<1.0) ? texture2D(tType, sq).g : 0.0;
  col = mix(col, vec3(1.0, 0.353, 0.122), star);
  return col;
}

void main(){
  vec2 p = vUv * uRes;
  float d = sdf(p);
  vec3 col;
  if(d < 0.0){
    float depth = clamp(-d/(uLensR*0.85), 0.0, 1.0);
    float edge = 1.0 - depth;
    vec2 e = vec2(1.5, 0.0);
    vec2 n = normalize(vec2(sdf(p+e.xy)-sdf(p-e.xy), sdf(p+e.yx)-sdf(p-e.yx)) + 1e-5);
    vec2 q = p - n * uLensR*0.30*pow(edge, 2.4) + (uP1 - p)*0.06*depth;
    float ab = 2.6*edge;
    col = vec3(scene(q + n*ab).r, scene(q).g, scene(q - n*ab).b);
    col = mix(col, vec3(dot(col, vec3(0.3,0.59,0.11))), 0.0);
    col *= 0.97;
    float rim = smoothstep(0.78, 1.0, edge);
    col += vec3(0.85,0.9,1.0) * rim * 0.28;
    float spec = pow(max(dot(n, normalize(vec2(-0.55, 0.83))), 0.0), 5.0) * edge;
    col += vec3(1.0) * spec * 0.35;
    col += vec3(1.0,0.45,0.2) * pow(max(dot(n, normalize(vec2(0.6,-0.8))), 0.0), 6.0) * edge * 0.18;
    col += vec3(1.0) * smoothstep(2.0, 0.0, -d) * 0.25;
  } else {
    col = scene(p);
    col *= 1.0 - 0.28*exp(-d/(uLensR*0.18));
  }
  // vignette
  vec2 v = vUv - 0.5; col *= 1.0 - 0.35*dot(v, v);
  gl_FragColor = vec4(col, 1.0);
}
`;

function drawType(W: number, H: number, dpr: number, family: string) {
  const c = document.createElement("canvas");
  c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
  const g = c.getContext("2d")!;
  g.scale(dpr, dpr);
  g.fillStyle = "#000"; g.fillRect(0, 0, W, H);
  g.globalCompositeOperation = "lighter";
  g.textBaseline = "alphabetic";
  const fit = (t: string, maxW: number, cap: number) => {
    g.font = `800 100px ${family}`;
    return Math.min(cap, (maxW / g.measureText(t).width) * 100);
  };
  const left = W * 0.04;
  const sizes = [fit(LINES[0], W * 0.9, H * 0.36), fit(LINES[1], W * 0.92, H * 0.3), fit(LINES[2], W * 0.92, H * 0.3)];
  let y = H * 0.16;
  g.fillStyle = "rgb(255,0,0)";
  LINES.forEach((t, i) => {
    const s = sizes[i];
    y += s * 0.74;
    g.font = `800 ${s}px ${family}`;
    g.fillText(t, left, y);
    y += s * 0.07;
  });
  // asterisk, green channel
  const R = H * 0.085, cx = W * 0.87, cy = H * 0.36;
  g.strokeStyle = "rgb(0,255,0)"; g.lineCap = "round"; g.lineWidth = R * 0.34;
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3;
    g.beginPath();
    g.moveTo(cx - Math.cos(a) * R, cy - Math.sin(a) * R);
    g.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    g.stroke();
  }
  return { canvas: c, star: new THREE.Vector2(cx, H - cy), starR: R };
}

function Glass({ onReady }: { onReady: () => void }) {
  const { size, gl } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const ptr = useRef({ x: 0, y: 0, has: false, last: 0 });
  const p1 = useRef(new THREE.Vector2()), p2 = useRef(new THREE.Vector2());
  const mouse = useRef(new THREE.Vector2());
  const typeTex = useRef<THREE.CanvasTexture | null>(null);
  const portrait = useMemo(() => {
    const t = new THREE.TextureLoader().load("/cutout.webp");
    t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
    return t;
  }, []);
  const uniforms = useMemo(() => ({
    uRes: { value: new THREE.Vector2(1, 1) }, uP1: { value: p1.current }, uP2: { value: p2.current },
    uMouse: { value: mouse.current }, uStar: { value: new THREE.Vector2() }, uTime: { value: 0 },
    uScroll: { value: 0 }, uLensR: { value: 110 }, uStarR: { value: 0 },
    uPortrait: { value: new THREE.Vector4() }, tType: { value: null as THREE.Texture | null }, tPortrait: { value: portrait },
  }), [portrait]);

  useEffect(() => {
    let dead = false;
    const W = size.width, H = size.height;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-sans").trim() || "sans-serif";
    document.fonts.load(`800 100px ${family}`).catch(() => document.fonts.ready).then(() => {
      if (dead) return;
      const { canvas, star, starR } = drawType(W, H, Math.min(window.devicePixelRatio || 1, 1.5), family);
      typeTex.current?.dispose();
      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
      typeTex.current = tex;
      uniforms.tType.value = tex;
      uniforms.uStar.value.copy(star); uniforms.uStarR.value = starR;
      const ph = H * 0.88;
      uniforms.uPortrait.value.set(W * 0.56 - ph / 2, -H * 0.02, ph, ph);
      uniforms.uRes.value.set(W, H);
      uniforms.uLensR.value = Math.max(80, Math.min(W, H) * 0.14);
      if (!ptr.current.has) { p1.current.set(W * 0.5, H * 0.5); p2.current.copy(p1.current); }
      onReady();
    });
    return () => { dead = true; };
  }, [size.width, size.height, uniforms, onReady]);

  useEffect(() => {
    const el = gl.domElement;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left, y = r.height - (e.clientY - r.top);
      if (x < 0 || y < 0 || x > r.width || y > r.height) return;
      ptr.current = { x, y, has: true, last: performance.now() };
      mouse.current.set((x / r.width - 0.5) * 2, (y / r.height - 0.5) * 2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [gl]);

  useFrame((state, dt) => {
    if (mat.current && mat.current.uniforms !== uniforms) mat.current.uniforms = uniforms as unknown as typeof mat.current.uniforms;
    const u = uniforms, t = state.clock.elapsedTime, W = size.width, H = size.height;
    const idle = !ptr.current.has || performance.now() - ptr.current.last > 2500;
    const tx = idle ? W * (0.5 + 0.26 * Math.cos(t * 0.45)) : ptr.current.x;
    const ty = idle ? H * (0.5 + 0.2 * Math.sin(t * 0.63)) : ptr.current.y;
    p1.current.x += (tx - p1.current.x) * (1 - Math.exp(-dt * 8));
    p1.current.y += (ty - p1.current.y) * (1 - Math.exp(-dt * 8));
    p2.current.x += (p1.current.x - p2.current.x) * (1 - Math.exp(-dt * 3.2));
    p2.current.y += (p1.current.y - p2.current.y) * (1 - Math.exp(-dt * 3.2));
    if (idle) mouse.current.set(Math.cos(t * 0.45) * 0.4, Math.sin(t * 0.63) * 0.3);
    u.uTime.value = t;
    u.uScroll.value = Math.min(window.scrollY, H * 1.2);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial ref={mat} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} depthTest={false} depthWrite={false} />
    </mesh>
  );
}

export default function LiquidGlass({ onReady, active }: { onReady: () => void; active: boolean }) {
  return (
    <Canvas className="!absolute inset-0" dpr={[1, 1.5]} frameloop={active ? "always" : "never"}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }} camera={{ position: [0, 0, 1] }}>
      <Glass onReady={onReady} />
    </Canvas>
  );
}
