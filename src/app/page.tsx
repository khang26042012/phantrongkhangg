export default function Home() {
  return (
    <div className="relative flex h-dvh max-h-dvh w-screen flex-col justify-between overflow-hidden bg-[#080808] p-6 text-zinc-200 select-none sm:p-10 md:p-14 lg:p-16">
      {/* Subtle fine film grain layer */}
      <div className="bg-film-grain pointer-events-none absolute inset-0 z-0" />

      {/* ======================================================== */}
      {/* 1. TOP EDITORIAL BAR                                     */}
      {/* ======================================================== */}
      <header
        className="animate-fade-in relative z-10 flex w-full items-center justify-between"
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
        <div className="flex items-center gap-7 sm:gap-9">
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
  );
}
