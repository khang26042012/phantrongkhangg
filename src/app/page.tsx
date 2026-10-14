"use client";

import { useEffect, useRef } from "react";

// Exact count scanned from public/frames/
const TOTAL_FRAMES = 144;
const FRAME_PREFIX = "/frames/ezgif-frame-";
const FRAME_EXTENSION = ".jpg";

// Helper to construct frame URL with 3-digit zero padding
const getFrameUrl = (index: number) => {
  const pad = String(index).padStart(3, "0");
  return `${FRAME_PREFIX}${pad}${FRAME_EXTENSION}`;
};

// Object-fit: cover helper with Retina/High-DPI support
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number
) {
  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;
  if (!imgWidth || !imgHeight) return;

  const hRatio = canvasWidth / imgWidth;
  const vRatio = canvasHeight / imgHeight;
  const ratio = Math.max(hRatio, vRatio);

  const centerShiftX = (canvasWidth - imgWidth * ratio) / 2;
  const centerShiftY = (canvasHeight - imgHeight * ratio) / 2;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(
    img,
    0,
    0,
    imgWidth,
    imgHeight,
    centerShiftX,
    centerShiftY,
    imgWidth * ratio,
    imgHeight * ratio
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References for zero-state high-performance frame animation
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isLoadedRef = useRef<boolean>(false);

  // Function to draw specific frame to canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetIdx = Math.max(1, Math.min(TOTAL_FRAMES, frameIndex)) - 1;
    let img = imagesRef.current[targetIdx];

    // Fallback to nearest loaded frame to prevent any blank flicker
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let i = targetIdx - 1; i >= 0; i--) {
        if (
          imagesRef.current[i] &&
          imagesRef.current[i].complete &&
          imagesRef.current[i].naturalWidth > 0
        ) {
          img = imagesRef.current[i];
          break;
        }
      }
      if (!img) {
        for (let i = targetIdx + 1; i < TOTAL_FRAMES; i++) {
          if (
            imagesRef.current[i] &&
            imagesRef.current[i].complete &&
            imagesRef.current[i].naturalWidth > 0
          ) {
            img = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (img && img.complete && img.naturalWidth > 0) {
      drawImageCover(ctx, img, canvas.width, canvas.height);
    }
  };

  // 1. Preload all 144 frames (draw frame 1 immediately when ready)
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES);

    // Load Frame 1 first for instant visual feedback
    const firstImg = new Image();
    firstImg.src = getFrameUrl(1);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      isLoadedRef.current = true;
      drawFrame(1);
    };

    // Preload remaining frames 2..144
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        imagesRef.current[i - 1] = img;
      };
    }
  }, []);

  // 2. High-DPI canvas resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // Immediately redraw current frame on resize
      drawFrame(Math.round(currentFrameRef.current));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 3. Scroll mapping logic
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      // Calculate progress strictly from 0 to 1
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 4. Continuous 60fps lerp animation loop (Apple-standard smoothness)
  useEffect(() => {
    let isRunning = true;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const renderLoop = () => {
      if (!isRunning) return;

      const isReduced = mediaQuery.matches;

      if (isReduced) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        // Lerp interpolation (factor 0.08 produces silky smooth inertia)
        const diff = targetFrameRef.current - currentFrameRef.current;
        if (Math.abs(diff) < 0.005) {
          currentFrameRef.current = targetFrameRef.current;
        } else {
          currentFrameRef.current += diff * 0.08;
        }
      }

      const frameToDraw = Math.round(currentFrameRef.current);
      if (frameToDraw !== lastDrawnFrameRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[#080808]">
      {/* Sticky Fullscreen Viewport Layer */}
      <div className="sticky top-0 flex h-dvh max-h-dvh w-full flex-col justify-between overflow-hidden bg-[#080808] p-6 text-zinc-200 select-none sm:p-10 md:p-14 lg:p-16">
        {/* ======================================================== */}
        {/* BACKGROUND CANVAS (Scroll-Linked Frame Sequence)        */}
        {/* ======================================================== */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />

        {/* Sophisticated Dark Gradient & Film Grain Overlay for seamless text contrast */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55 backdrop-blur-[0.5px]" />
        <div className="bg-film-grain pointer-events-none absolute inset-0 z-[2]" />

        {/* ======================================================== */}
        {/* 1. TOP EDITORIAL BAR                                     */}
        {/* ======================================================== */}
        <header
          className="animate-fade-in relative z-10 flex w-full items-center justify-between pointer-events-auto"
          style={{ animationDelay: "150ms" }}
        >
          <span className="text-[11px] font-medium tracking-[0.22em] text-zinc-400 uppercase">
            CREATIVE DEVELOPER &amp; SYSTEMS ARCHITECT
          </span>

          <a
            href="mailto:trongkhabgphan@gmail.com"
            className="group relative inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.22em] text-zinc-400 uppercase transition-colors duration-300 hover:text-white"
          >
            <span>CONTACT</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
            <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </header>

        {/* ======================================================== */}
        {/* 2. OVERSIZED BRAND TYPOGRAPHY                            */}
        {/* ======================================================== */}
        <main className="relative z-10 flex flex-1 flex-col justify-center">
          <h1 className="flex flex-col text-[clamp(3.5rem,10.5vw,11.5rem)] font-bold tracking-[-0.04em] text-white uppercase select-all">
            <span className="block overflow-hidden py-1">
              <span
                className="animate-mask-up block leading-[0.86]"
                style={{ animationDelay: "250ms" }}
              >
                PHAN
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span
                className="animate-mask-up block leading-[0.86] text-zinc-100"
                style={{ animationDelay: "400ms" }}
              >
                TRỌNG KHANG
              </span>
            </span>
          </h1>
        </main>

        {/* ======================================================== */}
        {/* 3. BOTTOM EDITORIAL ROW                                  */}
        {/* ======================================================== */}
        <footer
          className="animate-fade-in relative z-10 flex w-full flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: "550ms" }}
        >
          {/* Editorial Short Ethos Statement */}
          <p className="max-w-md text-[13px] font-light leading-relaxed text-zinc-400">
            Crafting high-throughput distributed systems and tactile digital
            experiences at the intersection of architectural discipline and
            minimalist aesthetics.
          </p>

          {/* Minimal Text Outlinks */}
          <div className="flex items-center gap-7 sm:gap-9 pointer-events-auto">
            <a
              href="https://github.com/khang26042012"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors duration-300 hover:text-white"
            >
              <span>GITHUB</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="https://nexorax.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.2em] text-zinc-400 uppercase transition-colors duration-300 hover:text-white"
            >
              <span>CLOUD</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
              <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
