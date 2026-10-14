"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });

  const rafRef = useRef<number | null>(null);

  // Synchronize live clock (Saigon / UTC+7) with clean interval cleanup
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Optimized ambient spotlight tracking via requestAnimationFrame (Vercel Best Practices)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();

      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
      });
    },
    []
  );

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex h-dvh max-h-dvh w-full flex-col justify-between overflow-hidden bg-[#070709] p-5 text-neutral-200 select-none sm:p-8 md:p-10 lg:p-12"
    >
      {/* Background ambient spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 650px at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.045), transparent 70%)`,
        }}
      />

      {/* Background architectural grid */}
      <div className="bg-grid-editorial pointer-events-none absolute inset-0 opacity-25" />

      {/* Architectural Corner Crosshairs */}
      <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] text-neutral-600 sm:top-5 sm:left-5">
        +
      </span>
      <span className="pointer-events-none absolute top-3 right-3 font-mono text-[10px] text-neutral-600 sm:top-5 sm:right-5">
        +
      </span>
      <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] text-neutral-600 sm:bottom-5 sm:left-5">
        +
      </span>
      <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[10px] text-neutral-600 sm:bottom-5 sm:right-5">
        +
      </span>

      {/* ======================================================== */}
      {/* 1. TOP EDITORIAL BAR (Header Meta)                       */}
      {/* ======================================================== */}
      <header
        className="animate-editorial-reveal relative z-10 flex w-full items-center justify-between border-b border-neutral-800/80 pb-3 sm:pb-4"
        style={{ animationDelay: "100ms" }}
      >
        {/* Left: Edition & Status */}
        <div className="flex items-center gap-3 sm:gap-5">
          <span className="font-mono text-[10px] tracking-[0.22em] text-neutral-400 uppercase sm:text-xs">
            [ ED. 2026 // INTRO ]
          </span>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 sm:inline-flex">
            <span className="animate-status-pulse h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[9px] font-medium tracking-widest text-emerald-300 uppercase">
              ONLINE
            </span>
          </div>
        </div>

        {/* Center: Discipline Tagline */}
        <div className="hidden text-center md:block">
          <p className="font-mono text-[10px] tracking-[0.28em] text-neutral-400 uppercase lg:text-[11px]">
            SYSTEMS ARCHITECTURE &bull; CREATIVE TECHNOLOGY
          </p>
        </div>

        {/* Right: Live Clock & Action */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="font-mono text-[10px] tracking-wider text-neutral-400 sm:text-xs">
            <span className="text-neutral-500">ICT </span>
            <span className="font-semibold text-neutral-200">
              {time || "12:00:00"}
            </span>
          </div>
          <a
            href="mailto:trongkhabgphan@gmail.com"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-neutral-700/80 bg-neutral-900/60 px-3 py-1 font-mono text-[10px] tracking-wider text-neutral-300 uppercase transition-all duration-300 hover:border-neutral-200 hover:bg-neutral-100 hover:text-neutral-950 sm:px-3.5 sm:py-1.5 sm:text-xs"
          >
            <span>CONTACT</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CENTRAL EDITORIAL PLANE (Oversized Brand Typography)  */}
      {/* ======================================================== */}
      <main className="relative z-10 flex flex-1 flex-col justify-center py-2 sm:py-4">
        {/* Sub-label above brand name */}
        <div
          className="animate-editorial-reveal mb-2 flex items-center justify-between sm:mb-4"
          style={{ animationDelay: "200ms" }}
        >
          <div className="flex items-center gap-2">
            <span className="h-[1px] w-6 bg-neutral-600 sm:w-10" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase sm:text-xs">
              PORTFOLIO ARCHIVE
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase sm:text-xs">
            01 / 01
          </span>
        </div>

        {/* Oversized Brand Typography */}
        <div
          className="animate-editorial-reveal flex flex-col"
          style={{ animationDelay: "300ms" }}
        >
          <h1 className="flex flex-col font-extrabold tracking-[-0.05em] uppercase text-white">
            <span className="text-[clamp(2.75rem,11.5vw,10.5rem)] leading-[0.88] select-all">
              PHAN
            </span>
            <span className="text-[clamp(2.75rem,11.5vw,10.5rem)] leading-[0.88] text-neutral-300 select-all transition-colors duration-500 hover:text-white">
              TRỌNG KHANG
            </span>
          </h1>
        </div>

        {/* Editorial Sub-grid: Role, Coordinates, Manifesto */}
        <div
          className="animate-editorial-reveal mt-4 grid grid-cols-1 gap-4 border-t border-neutral-800/80 pt-4 sm:mt-6 sm:grid-cols-12 sm:gap-6 sm:pt-6"
          style={{ animationDelay: "450ms" }}
        >
          {/* Column 1: Primary Titles */}
          <div className="flex flex-col gap-1 sm:col-span-5 md:col-span-4">
            <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase sm:text-[10px]">
              CORE DISCIPLINES
            </span>
            <p className="text-xs font-medium tracking-tight text-neutral-200 sm:text-sm md:text-base">
              Creative Developer & Systems Architect
            </p>
            <p className="font-mono text-[10px] tracking-wide text-neutral-400 sm:text-xs">
              Distributed Infrastructure & High-Performance Web
            </p>
          </div>

          {/* Column 2: Editorial Statement / Ethos */}
          <div className="flex flex-col justify-center sm:col-span-7 md:col-span-8">
            <span className="font-mono text-[9px] tracking-[0.25em] text-neutral-500 uppercase sm:text-[10px]">
              DESIGN ETHOS
            </span>
            <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm md:max-w-xl">
              Sculpting resilient cloud architectures, real-time distributed
              systems, and visceral 3D digital artifacts at the exact
              intersection of engineering rigor and minimalist aesthetics.
            </p>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. BOTTOM EDITORIAL BAR (Zero-Scroll Anchor Meta)        */}
      {/* ======================================================== */}
      <footer
        className="animate-editorial-reveal relative z-10 flex w-full items-center justify-between border-t border-neutral-800/80 pt-3 sm:pt-4"
        style={{ animationDelay: "600ms" }}
      >
        {/* Left: Origin & Coordinates */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-neutral-500 uppercase sm:text-xs">
            ORIGIN:
          </span>
          <span className="font-mono text-[10px] tracking-wider text-neutral-300 uppercase sm:text-xs">
            10°15&apos;N 105°58&apos;E &bull; VN
          </span>
        </div>

        {/* Center: Stack Badges (Hidden on mobile, visible on sm+) */}
        <div className="hidden items-center gap-2 font-mono text-[10px] tracking-wider text-neutral-400 uppercase sm:flex">
          <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300">
            NEXT.JS
          </span>
          <span className="text-neutral-600">&bull;</span>
          <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300">
            TYPESCRIPT
          </span>
          <span className="text-neutral-600">&bull;</span>
          <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300">
            JAVA
          </span>
          <span className="text-neutral-600">&bull;</span>
          <span className="rounded bg-neutral-900 px-2 py-0.5 text-neutral-300">
            PYTHON
          </span>
        </div>

        {/* Right: External Outlinks */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/khang26042012"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 font-mono text-[10px] tracking-wider text-neutral-400 uppercase transition-colors hover:text-white sm:text-xs"
          >
            <span>GITHUB</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
          <span className="text-neutral-700">/</span>
          <a
            href="https://nexorax.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 font-mono text-[10px] tracking-wider text-neutral-400 uppercase transition-colors hover:text-white sm:text-xs"
          >
            <span>CLOUD</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}
