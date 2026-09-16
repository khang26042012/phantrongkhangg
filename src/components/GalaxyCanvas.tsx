"use client";
import { useEffect, useRef } from "react";

export default function GalaxyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf: number;

    const starCount = Math.min((w * h) / 3000, 800);
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.005,
        dir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const pCount = Math.min((w * h) / 8000, 150);
    const particles = [];
    for (let i = 0; i < pCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Nebulae (dark gray radial gradients)
      const t = Date.now();
      for (let i = 0; i < 3; i++) {
        const nx = w * (0.2 + i * 0.3);
        const ny = h * 0.5;
        const nr = w * 0.25;
        const pulse = Math.sin(t * 0.0003 + i * 2.1) * 0.2 + 0.8;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr * pulse);
        grad.addColorStop(0, "rgba(77, 77, 77, 0.08)");
        grad.addColorStop(0.5, "rgba(26, 26, 26, 0.04)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // Stars
      for (const s of stars) {
        s.opacity += s.twinkle * s.dir;
        if (s.opacity > 1 || s.opacity < 0.2) s.dir *= -1;
        s.opacity = Math.max(0.2, Math.min(1, s.opacity));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.2832);
        ctx.fillStyle = "rgba(240, 240, 245, " + s.opacity + ")";
        ctx.fill();
        if (s.r > 1) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2, 0, 6.2832);
          ctx.fillStyle = "rgba(240, 240, 245, " + s.opacity * 0.1 + ")";
          ctx.fill();
        }
      }

      // Gold particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = "rgba(232, 213, 160, " + p.opacity + ")";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, 6.2832);
        ctx.fillStyle = "rgba(232, 213, 160, " + p.opacity * 0.15 + ")";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="galaxy-canvas" />;
}
