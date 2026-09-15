"use client";
import { useEffect, useRef } from "react";
export default function GalaxyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const c = ref.current;
    if (!c) return;
    const x = c.getContext("2d");
    if (!x) return;
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    let id = 0;
    const sc = Math.min(w * h / 3000, 800);
    const st = [];
    for (let i = 0; i < sc; i++) {
      st.push({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.5 + 0.3, o: Math.random() * 0.8 + 0.2, t: Math.random() * 0.02 + 0.005, d: Math.random() > 0.5 ? 1 : -1 });
    }
    const pc = Math.min(w * h / 8000, 150);
    const pa = [];
    for (let i = 0; i < pc; i++) {
      pa.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1 + 0.5, o: Math.random() * 0.3 + 0.1 });
    }
    function resize() { w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
    window.addEventListener("resize", resize);
    function draw() {
      x.fillStyle = "#000";
      x.fillRect(0, 0, w, h);
      for (const s of st) {
        s.o += s.t * s.d;
        if (s.o > 1 || s.o < 0.2) s.d *= -1;
        s.o = Math.max(0.2, Math.min(1, s.o));
        x.beginPath();
        x.arc(s.x, s.y, s.r, 0, 6.283);
        x.fillStyle = "rgba(240,240,245," + s.o + ")";
        x.fill();
        if (s.r > 1) {
          x.beginPath();
          x.arc(s.x, s.y, s.r * 2, 0, 6.283);
          x.fillStyle = "rgba(240,240,245," + (s.o * 0.1) + ")";
          x.fill();
        }
      }
      for (const p of pa) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        x.beginPath();
        x.arc(p.x, p.y, p.r, 0, 6.283);
        x.fillStyle = "rgba(232,213,160," + p.o + ")";
        x.fill();
        x.beginPath();
        x.arc(p.x, p.y, p.r * 3, 0, 6.283);
        x.fillStyle = "rgba(232,213,160," + (p.o * 0.15) + ")";
        x.fill();
      }
      id = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="galaxy-canvas" />;
}
