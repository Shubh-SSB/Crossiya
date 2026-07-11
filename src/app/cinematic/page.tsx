"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./cinematic.css";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   Data
   ────────────────────────────────────────────── */

const GREETINGS = [
  "Hello",
  "Ciao",
  "Hola",
  "नमस्ते",
  "Bonjour",
  "Privet",
  "Kon'nichiwa",
];

interface ShapeData {
  menuLabel: string;
  gradient: string; // CSS gradient for the shape fill
  restX: number;    // initial hidden x (same as typo x, shapes start there)
}

/* Each shape maps to one letter of CROSSIYA */
const SHAPES: ShapeData[] = [
  { menuLabel: "Coffee",    gradient: "linear-gradient(160deg, #3d1f0a 0%, #6b3518 60%, #2a1208 100%)", restX: 3 },
  { menuLabel: "Signature", gradient: "linear-gradient(160deg, #1a0d05 0%, #4a2510 55%, #321508 100%)", restX: 14.5 },
  { menuLabel: "Desserts",  gradient: "linear-gradient(155deg, #2e1509 0%, #8b4a1c 50%, #3a1e0c 100%)", restX: 26 },
  { menuLabel: "Bakery",    gradient: "linear-gradient(165deg, #1c0e06 0%, #5c2e12 45%, #2d1609 100%)", restX: 38 },
  { menuLabel: "Cold Brew", gradient: "linear-gradient(150deg, #0d1a24 0%, #1a3a52 55%, #0a1219 100%)", restX: 55 },
  { menuLabel: "Tea",       gradient: "linear-gradient(160deg, #1a1208 0%, #4a3818 50%, #241a0a 100%)", restX: 63 },
  { menuLabel: "More",      gradient: "linear-gradient(155deg, #2a1508 0%, #6b3a18 55%, #1e0e05 100%)", restX: 76 },
];

/* Typography targets — positions of CROSSIYA letters */
const TYPO = [
  { x: 3,    y: -5, w: 9,  h: 75 }, // C
  { x: 14.5, y:  2, w: 10, h: 70 }, // R
  { x: 26,   y: -3, w: 11, h: 68 }, // O
  { x: 38,   y:  0, w: 14, h: 78 }, // SS
  { x: 55,   y: -8, w:  7, h: 85 }, // I
  { x: 63,   y:  3, w: 11, h: 65 }, // Y
  { x: 76,   y: -2, w: 12, h: 72 }, // A
];

/* Compute plate positions at runtime (px) */
function computePlates(vw: number, vh: number) {
  const isMobile = vw <= 768;

  if (isMobile) {
    const size = vw * 0.22;
    const gap  = vw * 0.03;
    const topCount = 4, botCount = 3;
    const topW = topCount * size + (topCount - 1) * gap;
    const botW = botCount * size + (botCount - 1) * gap;
    const rowGap = gap * 2.5;
    const totalH = size * 2 + rowGap;
    const topY = (vh - totalH) / 2;
    const botY = topY + size + rowGap;

    return SHAPES.map((_, i) => {
      if (i < topCount) {
        return { left: (vw - topW) / 2 + i * (size + gap), top: topY, size };
      }
      const j = i - topCount;
      return { left: (vw - botW) / 2 + j * (size + gap), top: botY, size };
    });
  }

  const size   = vw * 0.105;
  const gap    = vw * 0.01;
  const totalW = SHAPES.length * size + (SHAPES.length - 1) * gap;
  const startX = (vw - totalW) / 2;
  const centerY = (vh - size) / 2;
  return SHAPES.map((_, i) => ({
    left: startX + i * (size + gap),
    top:  centerY,
    size,
  }));
}

const TAGLINE_COFFEE  = "Coffee";
const TAGLINE_CREATED = "created";
const TAGLINE_CRAFTED = "crafted";

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function CinematicPage() {
  // ── Refs ──
  const introRef       = useRef<HTMLElement>(null);
  const greetingRef    = useRef<HTMLHeadingElement>(null);
  const expRef         = useRef<HTMLElement>(null);
  const shapeRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const brandWrapRef   = useRef<HTMLDivElement>(null);
  const brandRef       = useRef<HTMLHeadingElement>(null);
  const tagCoffeeRef   = useRef<HTMLSpanElement>(null);
  const tagCreatedRef  = useRef<HTMLSpanElement>(null);
  const tagCraftedRef  = useRef<HTMLSpanElement>(null);
  const scribbleRef    = useRef<SVGPathElement>(null);
  const menuRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const plateHeadingRef = useRef<HTMLHeadingElement>(null);
  const breathers      = useRef<gsap.core.Tween[]>([]);

  // ── State ──
  const [idx,  setIdx]  = useState(0);
  const [done, setDone] = useState(false);
  const [text, setText] = useState(GREETINGS[0]);

  const refShape = useCallback((i: number) => (el: HTMLDivElement | null) => { shapeRefs.current[i] = el; }, []);
  const refMenu  = useCallback((i: number) => (el: HTMLSpanElement | null) => { menuRefs.current[i] = el; }, []);

  /* ── Phase 0: Greeting word cycling ── */
  useEffect(() => {
    if (done) return;
    const greetEl = greetingRef.current;
    if (!greetEl) return;

    if (idx === GREETINGS.length - 1) {
      gsap.to(greetEl, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out",
        onComplete: () => setTimeout(() => setDone(true), 600) });
      return;
    }

    gsap.fromTo(greetEl, { opacity: 0, y: 8 }, {
      opacity: 1, y: 0, duration: 0.3, ease: "power2.out",
      onComplete: () => {
        setTimeout(() => {
          gsap.to(greetEl, {
            opacity: 0, y: -8, duration: 0.25, ease: "power2.in",
            onComplete: () => { setText(GREETINGS[idx + 1]); setIdx(idx + 1); },
          });
        }, 200);
      },
    });
  }, [idx, done]);

  /* ── Phase 1: Intro scroll — zoom & fade ── */
  useEffect(() => {
    if (!done) return;
    const el  = greetingRef.current;
    const sec = introRef.current;
    if (!el || !sec) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1, scale: 1, y: 0 });
      gsap.timeline({
        scrollTrigger: { trigger: sec, start: "top top", end: "+=280%", scrub: 0.5, pin: true, anticipatePin: 1 },
      })
        .to(el, { scale: 32, ease: "none", duration: 1 })
        .to(el, { opacity: 0, duration: 0.1 }, 0.8)
        .to({}, { duration: 0.06 });
    });
    return () => ctx.revert();
  }, [done]);

  /* ── Phases 2–5: Experience master timeline ── */
  useEffect(() => {
    if (!done) return;
    const shapes  = shapeRefs.current.filter(Boolean) as HTMLDivElement[];
    const brand   = brandRef.current;
    const brandWrap = brandWrapRef.current;
    const menus   = menuRefs.current.filter(Boolean) as HTMLSpanElement[];
    const sec     = expRef.current;
    const plateHeading = plateHeadingRef.current;
    if (shapes.length < 7 || !brand || !brandWrap || !sec) return;

    const ctx = gsap.context(() => {

      // ── Shapes start invisible, already at their TYPO positions ──
      shapes.forEach((s, i) => {
        const t = TYPO[i];
        gsap.set(s, {
          left:   `${t.x}vw`,
          top:    `calc(50% + ${t.y}vh - ${t.h / 2}vh)`,
          width:  `${t.w}vw`,
          height: `${t.h}vh`,
          x: 0, y: 0,
          opacity: 0,
          borderRadius: "28px",
        });
      });

      gsap.set(brandWrap, { opacity: 0 });
      gsap.set(brand, { filter: "blur(30px)", opacity: 0 });

      const coffee       = tagCoffeeRef.current;
      const created      = tagCreatedRef.current;
      const crafted      = tagCraftedRef.current;
      const scribblePath = scribbleRef.current;
      if (coffee)  gsap.set(coffee,  { opacity: 0, y: 16 });
      if (created) gsap.set(created, { opacity: 0, y: 16 });
      if (crafted) gsap.set(crafted, { opacity: 0, y: 16 });
      if (scribblePath) {
        const len = scribblePath.getTotalLength();
        gsap.set(scribblePath, { strokeDasharray: len, strokeDashoffset: len });
      }
      menus.forEach(m => gsap.set(m, { opacity: 0, y: 10 }));
      if (plateHeading) gsap.set(plateHeading, { opacity: 0, y: 30 });

      // ── Master timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=650%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ── PHASE 2: CROSSIYA brand reveal (0 → 0.35) ──
      tl.to(brandWrap, { opacity: 1, duration: 0.06 }, 0.02);
      tl.to(brand, { filter: "blur(0px)", opacity: 1, duration: 0.16, ease: "power2.out" }, 0.04);

      // Tagline sequence
      if (coffee)  tl.to(coffee,  { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.22);
      if (created) tl.to(created, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.26);
      if (scribblePath)
        tl.to(scribblePath, { strokeDashoffset: 0, duration: 0.05, ease: "power2.inOut" }, 0.30);
      if (created) tl.to(created, { opacity: 0.35, duration: 0.03 }, 0.34);
      if (crafted) tl.to(crafted, { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.34);

      // ── PHASE 3: Shapes appear at TYPO positions (0.38 → 0.52) ──
      // Brand fades out as shapes fade in
      tl.to(brandWrap, { opacity: 0, duration: 0.06 }, 0.38);

      shapes.forEach((s, i) => {
        tl.to(s, { opacity: 1, duration: 0.08, ease: "power2.out" }, 0.40 + i * 0.018);
      });

      // ── PHASE 4: Shapes hold at TYPO positions (0.52 → 0.62) ──
      // (hold beat — shapes form the word silhouettes)

      // ── PHASE 5: Morph to round plates (0.64 → 1.0) ──
      const plates = computePlates(window.innerWidth, window.innerHeight);

      shapes.forEach((s, i) => {
        const p = plates[i];
        tl.to(s, {
          left: p.left, top: p.top,
          x: 0, y: 0,
          width: p.size, height: p.size,
          borderRadius: "50%",
          duration: 0.16,
          ease: "power3.inOut",
        }, 0.64 + i * 0.014);
      });

      if (plateHeading)
        tl.to(plateHeading, { opacity: 1, y: 0, duration: 0.07, ease: "power2.out" }, 0.72);

      menus.forEach((m, i) => {
        tl.to(m, { opacity: 1, y: 0, duration: 0.06, ease: "power2.out" }, 0.80 + i * 0.014);
      });

      // ── Subtle breathing on shapes ──
      breathers.current = shapes.map((s, i) =>
        gsap.to(s, {
          scale: 1.03,
          duration: 3.5 + i * 0.5,
          repeat: -1, yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        })
      );
    });

    return () => {
      breathers.current.forEach(tw => tw?.kill());
      ctx.revert();
    };
  }, [done]);

  /* ── Render ── */
  return (
    <main className="cin-page">

      {/* Section 1: Intro */}
      <section ref={introRef} className="cin-intro">
        <div className="cin-intro-viewport">
          <h1 ref={greetingRef} className="cin-greeting">{text}</h1>
        </div>
      </section>

      {/* Sections 2–5: Experience */}
      <section ref={expRef} className="cin-experience">
        <div className="cin-exp-viewport">

          {/* Plate heading (Phase 5) */}
          <h2 ref={plateHeadingRef} className="cin-plate-heading">Our Menu</h2>

          {/* 7 Shapes — start invisible at TYPO positions, morph to plates */}
          {SHAPES.map((shape, i) => (
            <div
              key={i}
              ref={refShape(i)}
              className="cin-strip"
              /* inline style is initial; GSAP sets top/left/w/h at runtime */
              style={{ background: shape.gradient }}
            >
              <span ref={refMenu(i)} className="cin-menu-label cin-plate-label">
                {shape.menuLabel}
              </span>
            </div>
          ))}

          {/* Brand overlay */}
          <div ref={brandWrapRef} className="cin-brand-wrap">
            <h2 ref={brandRef} className="cin-brand">CROSSIYA</h2>
            <div className="cin-tagline">
              <span ref={tagCoffeeRef} className="cin-tagline-word">{TAGLINE_COFFEE}</span>
              <span className="cin-tagline-scribble-wrap">
                <span ref={tagCreatedRef} className="cin-tagline-word cin-tagline-created">
                  {TAGLINE_CREATED}
                </span>
                <svg className="cin-scribble-svg" viewBox="0 0 120 20" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    ref={scribbleRef}
                    d="M2 10 C10 4, 20 16, 30 10 S50 4, 60 10 S80 16, 90 10 S110 4, 118 10"
                    fill="none"
                    stroke="rgba(255,120,100,0.85)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span ref={tagCraftedRef} className="cin-tagline-word cin-tagline-crafted">
                {TAGLINE_CRAFTED}
              </span>
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
