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

interface StripData {
  video: string;
  label: string;
  menuLabel: string;
  restX: number;   // vw — left offset of resting position
  width: number;    // vw
  height: number;   // vh
  offsetY: number;  // vh — vertical offset from center
  entryX: number;   // vw — off-screen entry x
  entryY: number;   // vh — off-screen entry y
}

const STRIPS: StripData[] = [
  { video: "/videos/espresso.mp4", label: "Espresso", menuLabel: "Coffee", restX: 1.5, width: 12.5, height: 72, offsetY: 3, entryX: -50, entryY: -70 },
  { video: "/videos/latte.mp4", label: "Milk", menuLabel: "Signature", restX: 15.5, width: 12, height: 60, offsetY: -8, entryX: 25, entryY: -90 },
  { video: "/videos/art.mp4", label: "Latte Art", menuLabel: "Desserts", restX: 29, width: 13, height: 78, offsetY: 6, entryX: -35, entryY: 80 },
  { video: "/videos/beans.mp4", label: "Beans", menuLabel: "Bakery", restX: 43.5, width: 11.5, height: 55, offsetY: -2, entryX: 45, entryY: -60 },
  { video: "/videos/pastry.mp4", label: "Pastry", menuLabel: "Cold Brew", restX: 56.5, width: 12, height: 68, offsetY: 8, entryX: -55, entryY: 65 },
  { video: "/videos/black.mp4", label: "Steam", menuLabel: "Tea", restX: 70, width: 13, height: 82, offsetY: -5, entryX: 35, entryY: -75 },
  { video: "/videos/bakery.mp4", label: "Barista", menuLabel: "More", restX: 84.5, width: 12.5, height: 64, offsetY: 4, entryX: 55, entryY: 55 },
];

/* Typography targets — abstract letter regions of CROSSIYA */
const TYPO = [
  { x: 3, y: -5, w: 8, h: 75 },  // C
  { x: 14.5, y: 2, w: 9, h: 70 },  // R
  { x: 26, y: -3, w: 10, h: 68 },  // O
  { x: 38, y: 0, w: 14, h: 78 },  // SS
  { x: 55, y: -8, w: 5, h: 85 },  // I
  { x: 63, y: 3, w: 10, h: 65 },  // Y
  { x: 76, y: -2, w: 11, h: 72 },  // A
];

/* Menu grid — evenly distributed */
const MENU = STRIPS.map((_, i) => ({
  x: 2 + i * 13.8, y: 0, w: 12, h: 60,
}));

const TAGLINE_COFFEE = "Coffee";
const TAGLINE_CREATED = "created";
const TAGLINE_CRAFTED = "crafted";

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

export default function CinematicPage() {
  // ── Refs ──
  const introRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLHeadingElement>(null);
  const expRef = useRef<HTMLElement>(null);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const brandWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const tagCoffeeRef = useRef<HTMLSpanElement>(null);
  const tagCreatedRef = useRef<HTMLSpanElement>(null);
  const tagCraftedRef = useRef<HTMLSpanElement>(null);
  const scribbleRef = useRef<SVGPathElement>(null);
  const menuRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const breathers = useRef<gsap.core.Tween[]>([]);

  // ── State ──
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [text, setText] = useState(GREETINGS[0]);

  // ── Ref setters (stable across renders) ──
  const refStrip = useCallback((i: number) => (el: HTMLDivElement | null) => { stripRefs.current[i] = el; }, []);
  const refMenu = useCallback((i: number) => (el: HTMLSpanElement | null) => { menuRefs.current[i] = el; }, []);

  /* ─────────────────────────────────────────
     Phase 0 — Greeting word cycling
     ───────────────────────────────────────── */
  useEffect(() => {
    if (done) return;

    // Fade out current word, then show next
    const greetEl = greetingRef.current;
    if (!greetEl) return;

    if (idx === GREETINGS.length - 1) {
      // Last word — hold, then mark done
      gsap.to(greetEl, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => setDone(true), 600);
        },
      });
      return;
    }

    // Fade in current word
    gsap.fromTo(
      greetEl,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          // Hold, then fade out and switch
          setTimeout(() => {
            gsap.to(greetEl, {
              opacity: 0,
              y: -8,
              duration: 0.25,
              ease: "power2.in",
              onComplete: () => {
                const next = idx + 1;
                setText(GREETINGS[next]);
                setIdx(next);
              },
            });
          }, 200);
        },
      }
    );
  }, [idx, done]);

  /* ─────────────────────────────────────────
     Phase 1 — Intro scroll: scale & fade
     ───────────────────────────────────────── */
  useEffect(() => {
    if (!done) return;
    const el = greetingRef.current;
    const sec = introRef.current;
    if (!el || !sec) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 1, scale: 1, y: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=280%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      })
        .to(el, { scale: 32, ease: "none", duration: 1 })
        .to(el, { opacity: 0, duration: 0.1 }, 0.8)
        .to({}, { duration: 0.06 }); // black pause
    });

    return () => ctx.revert();
  }, [done]);

  /* ─────────────────────────────────────────
     Phase 2-5 — Experience master timeline
     ───────────────────────────────────────── */
  useEffect(() => {
    if (!done) return;
    const strips = stripRefs.current.filter(Boolean) as HTMLDivElement[];
    const brand = brandRef.current;
    const brandWrap = brandWrapRef.current;
    const menus = menuRefs.current.filter(Boolean) as HTMLSpanElement[];
    const sec = expRef.current;
    if (strips.length < 7 || !brand || !brandWrap || !sec) return;

    const ctx = gsap.context(() => {

      // ── Initial states ──
      strips.forEach((s, i) => {
        gsap.set(s, {
          x: `${STRIPS[i].entryX}vw`,
          y: `${STRIPS[i].entryY}vh`,
          opacity: 0,
          scale: 0.8,
        });
      });
      gsap.set(brandWrap, { opacity: 0 });
      gsap.set(brand, { filter: "blur(30px)", opacity: 0 });

      // Tagline initial states
      const coffee = tagCoffeeRef.current;
      const created = tagCreatedRef.current;
      const crafted = tagCraftedRef.current;
      const scribblePath = scribbleRef.current;
      if (coffee) gsap.set(coffee, { opacity: 0, y: 16 });
      if (created) gsap.set(created, { opacity: 0, y: 16 });
      if (crafted) gsap.set(crafted, { opacity: 0, y: 16 });
      if (scribblePath) {
        const len = scribblePath.getTotalLength();
        gsap.set(scribblePath, { strokeDasharray: len, strokeDashoffset: len });
      }

      menus.forEach(m => gsap.set(m, { opacity: 0, y: 10 }));

      // ── Master timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=750%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      // ─── PHASE 2: Strip entry (0 → 0.22) ───
      strips.forEach((s, i) => {
        tl.to(s, {
          x: 0, y: 0, opacity: 1, scale: 1,
          duration: 0.18,
          ease: "power2.out",
        }, 0.005 + i * 0.025);
      });

      // ─── PHASE 3: Brand reveal (0.25 → 0.50) ───
      // Dim strips
      strips.forEach((s, i) => {
        tl.to(s, {
          opacity: 0.3, duration: 0.08, ease: "none",
        }, 0.25 + i * 0.006);
      });

      // Brand blur reveal
      tl.to(brandWrap, { opacity: 1, duration: 0.05 }, 0.27);
      tl.to(brand, {
        filter: "blur(0px)", opacity: 1,
        duration: 0.14, ease: "power2.out",
      }, 0.28);

      // Tagline: Coffee → created → scribble → crafted
      if (coffee) {
        tl.to(coffee, {
          opacity: 1, y: 0, duration: 0.04, ease: "power2.out",
        }, 0.38);
      }
      if (created) {
        tl.to(created, {
          opacity: 1, y: 0, duration: 0.04, ease: "power2.out",
        }, 0.41);
      }
      // Scribble draws through "created"
      if (scribblePath) {
        tl.to(scribblePath, {
          strokeDashoffset: 0, duration: 0.04, ease: "power2.inOut",
        }, 0.44);
      }
      // "created" dims after scribble
      if (created) {
        tl.to(created, {
          opacity: 0.35, duration: 0.02, ease: "none",
        }, 0.47);
      }
      // "crafted" reveals
      if (crafted) {
        tl.to(crafted, {
          opacity: 1, y: 0, duration: 0.04, ease: "power2.out",
        }, 0.47);
      }

      // ─── PHASE 4: Typography morph (0.52 → 0.74) ───
      // Fade brand
      tl.to(brandWrap, { opacity: 0, duration: 0.05 }, 0.52);

      // Brighten strips
      strips.forEach((s, i) => {
        tl.to(s, { opacity: 1, duration: 0.05 }, 0.53 + i * 0.004);
      });

      // Morph strip positions → typography
      strips.forEach((s, i) => {
        const t = TYPO[i];
        const rest = STRIPS[i];
        tl.to(s, {
          x: `${t.x - rest.restX}vw`,
          y: `${t.y}vh`,
          width: `${t.w}vw`,
          height: `${t.h}vh`,
          duration: 0.16,
          ease: "power2.inOut",
        }, 0.56 + i * 0.01);
      });

      // ─── PHASE 5: Menu transition (0.78 → 1.0) ───
      strips.forEach((s, i) => {
        const m = MENU[i];
        const rest = STRIPS[i];
        tl.to(s, {
          x: `${m.x - rest.restX}vw`,
          y: `${m.y}vh`,
          width: `${m.w}vw`,
          height: `${m.h}vh`,
          borderRadius: "24px",
          duration: 0.14,
          ease: "power2.inOut",
        }, 0.78 + i * 0.012);
      });

      // Menu labels
      menus.forEach((m, i) => {
        tl.to(m, {
          opacity: 1, y: 0, duration: 0.05, ease: "power2.out",
        }, 0.90 + i * 0.013);
      });

      // ── Breathing (continuous, not scroll) ──
      breathers.current = strips.map((s, i) => {
        const inner = s.querySelector(".cin-strip-inner");
        if (!inner) return null!;
        return gsap.to(inner, {
          scale: 1.04,
          duration: 3.5 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    });

    return () => {
      breathers.current.forEach(tw => tw?.kill());
      ctx.revert();
    };
  }, [done]);

  /* ─────────────────────────────────────────
     Render
     ───────────────────────────────────────── */
  return (
    <main className="cin-page">

      {/* ═══ Section 1: Intro ═══ */}
      <section ref={introRef} className="cin-intro">
        <div className="cin-intro-viewport">
          <h1 ref={greetingRef} className="cin-greeting">
            {text}
          </h1>
        </div>
      </section>

      {/* ═══ Sections 2-5: Experience ═══ */}
      <section ref={expRef} className="cin-experience">
        <div className="cin-exp-viewport">

          {/* 7 Video Strips */}
          {STRIPS.map((strip, i) => (
            <div
              key={i}
              ref={refStrip(i)}
              className="cin-strip"
              style={{
                left: `${strip.restX}vw`,
                width: `${strip.width}vw`,
                height: `${strip.height}vh`,
                top: `calc(50% - ${strip.height / 2}vh + ${strip.offsetY}vh)`,
              }}
            >
              <div className="cin-strip-inner">
                {/* Replace video src with your own files in /public/videos/ */}
                <video
                  src={strip.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    const next = e.currentTarget.nextElementSibling as HTMLElement;
                    if (next) next.style.display = "flex";
                  }}
                />
                <div className="cin-strip-placeholder" style={{ display: "none" }}>
                  {strip.label}
                </div>
              </div>
              <span ref={refMenu(i)} className="cin-menu-label">
                {strip.menuLabel}
              </span>
            </div>
          ))}

          {/* Brand overlay */}
          <div ref={brandWrapRef} className="cin-brand-wrap">
            <h2 ref={brandRef} className="cin-brand">CROSSIYA</h2>
            <div className="cin-tagline">
              <span ref={tagCoffeeRef} className="cin-tagline-word">
                {TAGLINE_COFFEE}
              </span>
              <span className="cin-tagline-scribble-wrap">
                <span ref={tagCreatedRef} className="cin-tagline-word cin-tagline-created">
                  {TAGLINE_CREATED}
                </span>
                {/* Hand-drawn scribble SVG overlaid on "created" */}
                <svg
                  className="cin-scribble-svg"
                  viewBox="0 0 120 20"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
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
