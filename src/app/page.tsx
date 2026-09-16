'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { personal, skills, projects, experience, stats } from '@/data/mockData';
import { useAppStore } from '@/store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

const GalaxyScene = dynamic(() => import('@/three/GalaxyScene').then(m => m.GalaxyScene), { ssr: false });
const Loader = dynamic(() => import('@/components/Loader').then(m => m.Loader), { ssr: false });

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const storeSetScroll = useAppStore((s) => s.setScrollProgress);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lenis: Lenis;
    let cleanupFns: (() => void)[] = [];

    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? (h.scrollTop / max) * 100 : 0;
      setScrollProgress(progress);
      storeSetScroll(progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanupFns.push(() => window.removeEventListener('scroll', onScroll));

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    cleanupFns.push(() => obs.disconnect());

    const nameEl = document.getElementById('hero-name');
    if (nameEl) {
      nameEl.querySelectorAll('.letter').forEach((el: Element, i: number) => {
        setTimeout(() => el.classList.add('animate'), 400 + i * 70);
      });
    }

    const animateSkillBars = () => {
      document.querySelectorAll('.skill-bar-fill').forEach((el) => { el.style.width = '0%'; });
      setTimeout(() => {
        document.querySelectorAll('.skill-bar-fill').forEach((el) => {
          el.style.width = el.getAttribute('data-level') + '%';
        });
      }, 300);
    };
    const skillObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animateSkillBars(); skillObs.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    const skillsSection = document.getElementById('skills');
    if (skillsSection) skillObs.observe(skillsSection);
    cleanupFns.push(() => skillObs.disconnect());

    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo('.hero-tagline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
      .fromTo('.hero-title', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
      .fromTo('.hero-scroll-hint', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    cleanupFns.push(() => tl.kill());

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (lenis) lenis.destroy();
    };
  }, [storeSetScroll]);

  return (
    <>
      <Loader />
      <GalaxyScene />
      <div className="grain" />
      <div className="scroll-progress" style={{ width: scrollProgress + '%' }} />

      <a href="#" className="logo">N<span>·</span>A</a>
      <nav className="nav">
        <a href="#about" className="nav-link">About</a>
        <a href="#skills" className="nav-link">Skills</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>

      <section className="hero" id="hero">
        <p className="hero-tagline">{personal.tagline}</p>
        <h1 id="hero-name" className="hero-name font-display">
          {personal.name.split('').map((c, i) => (
            <span key={i} className="letter">{c === ' ' ? ' ' : c}</span>
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
            <div className="about-meta">
              <div>
                <span className="about-meta-label">Location</span>
                <span className="about-meta-value">{personal.location}</span>
              </div>
              <div>
                <span className="about-meta-label">Status</span>
                <span className="about-meta-value">{personal.availability}</span>
              </div>
            </div>
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
        <p className="section-label reveal">Kỹ nạng</p>
        <h2 className="section-title font-display reveal">Công cụ &amp; Chuyên môn</h2>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div key={i} className="skill reveal">
              <div className="skill-name">{s.name}</div>
              <div className="skill-category">{s.category}</div>
              <div className="skill-bar">
                <div className="skill-bar-fill" data-level={s.level} style={{ width: '0%' }} />
              </div>
              <div className="skill-level">{s.level}%</div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects">
        <p className="section-label reveal">Dự ản</p>
        <h2 className="section-title font-display reveal">Những vì sao đã tạo</h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className={'project reveal project-' + p.accent}>
              <div className="project-year">{p.year}</div>
              <h3 className="project-title">{p.title}</h3>
              <div className="project-client">{p.client}</div>
              <p className="project-desc">{p.description}</p>
              <div className="project-tags">
                {p.tags.map((t, j) => <span key={j} className="project-tag">{t}</span>)}
              </div>
              <a href={p.link} className="project-link">View project →</a>
            </div>
          ))}
        </div>
      </section>

      <section id="experience">
        <p className="section-label reveal">Kinh nghiệm</p>
        <h2 className="section-title font-display reveal">Đưống đi đã trải</h2>
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
        <h2 className="section-title font-display reveal">Cùng tạo ra điều gì đó huyện bí</h2>
        <a href={'mailto:' + personal.email} className="contact-email reveal">{personal.email}</a>
        <div className="contact-socials reveal">
          <a href={'https://' + personal.socials.github} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">GH</span>
            {personal.socials.github}
          </a>
          <a href={'https://' + personal.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">X</span>
            {personal.socials.twitter}
          </a>
          <a href={'https://' + personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">IN</span>
            {personal.socials.linkedin}
          </a>
          <a href={'https://' + personal.socials.portfolio} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">PT</span>
            {personal.socials.portfolio}
          </a>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} {personal.name} — {personal.availability}
      </footer>
    </>
  );
}