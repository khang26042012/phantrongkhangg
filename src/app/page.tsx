'use client';

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { personal, skills, projects, experience, stats } from "@/data/mockData";

const GalaxyCanvas = dynamic(() => import("@/components/GalaxyCanvas"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Simulate loading screen
    const t = setTimeout(() => setLoaded(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Lenis smooth scroll
    const lenis = new (window as any).Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    // Scroll progress
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setScrollProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // IntersectionObserver for reveal
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

    // Letter animation
    const nameEl = document.getElementById("hero-name");
    if (nameEl) {
      nameEl.querySelectorAll(".letter").forEach((el, i) => {
        setTimeout(() => el.classList.add("animate"), 200 + i * 80);
      });
    }

    // Skill bars
    document.querySelectorAll(".skill-bar-fill").forEach((el) => {
      el.style.width = "0%";
    });
    setTimeout(() => {
      document.querySelectorAll(".skill-bar-fill").forEach((el) => {
        el.style.width = el.getAttribute("data-level") + "%";
      });
    }, 500);

    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      <div className="loader" style={{ opacity: loaded ? 0 : 1, visibility: loaded ? "hidden" : "visible" }}>
        <div className="loader-text">Đang xuyên qua hư không...</div>
        <div className="loader-bar">
          <div className="loader-bar-fill" style={{ width: loaded ? "100%" : "60%" }} />
        </div>
      </div>

      <GalaxyCanvas />
      <div className="vignette" />
      <div className="grain" />

      <div className="scroll-progress" style={{ width: scrollProgress + "%" }} />

      <a href="#" className="logo">N<span>·</span>A</a>
      <nav>
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      <section className="hero">
        <p className="hero-tagline">{personal.tagline}</p>
        <h1 id="hero-name" className="hero-name font-display">
          {personal.name.split("").map((c, i) => (
            <span key={i} className="letter">{c === " " ? "\u00A0" : c}</span>
          ))}
        </h1>
        <p className="hero-title">{personal.title}</p>
        <div className="hero-scroll-hint">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      <section id="about">
        <p className="section-label reveal">Về tôi</p>
        <h2 className="section-title font-display reveal">Hành trình giữa các vì sao</h2>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>{personal.bio}</p>
            <p>{personal.bio2}</p>
          </div>
          <div className="about-stats reveal">
            {stats.map((s, i) => (
              <div key={i} className="stat">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="skills">
        <p className="section-label reveal">Kỹ năng</p>
        <h2 className="section-title font-display reveal">Công cụ & Chuyên môn</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill reveal">
              <div className="skill-name">{s.name}</div>
              <div className="skill-category">{s.category}</div>
              <div className="skill-bar">
                <div className="skill-bar-fill" data-level={s.level} style={{ width: "0%" }} />
              </div>
              <div className="skill-level">{s.level}%</div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <p className="section-label reveal">Dự án</p>
        <h2 className="section-title font-display reveal">Những vì sao đã tạo</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project reveal">
              <div className="project-year">{p.year}</div>
              <h3 className="project-title">{p.title}</h3>
              <div className="project-client">{p.client}</div>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t, j) => <span key={j} className="project-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <p className="section-label reveal">Kinh nghiệm</p>
        <h2 className="section-title font-display reveal">Đường đi đã trải</h2>
        <div className="experience-list">
          {experience.map((e, i) => (
            <div key={i} className="experience-item reveal">
              <div className="experience-period">{e.period}</div>
              <h3 className="experience-role">{e.role}</h3>
              <div className="experience-company">{e.company}</div>
              <p className="experience-desc">{e.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <p className="section-label reveal">Liên hệ</p>
        <h2 className="section-title font-display reveal">Cùng tạo ra điều gì đó huyền bí</h2>
        <a href={"mailto:" + personal.email} className="contact-email reveal">{personal.email}</a>
        <div className="contact-socials reveal">
          <a href="#" className="social-link">{personal.socials.github}</a>
          <a href="#" className="social-link">{personal.socials.twitter}</a>
          <a href="#" className="social-link">{personal.socials.linkedin}</a>
          <a href="#" className="social-link">{personal.socials.portfolio}</a>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} {personal.name} — {personal.availability}
      </footer>
    </>
  );
}

