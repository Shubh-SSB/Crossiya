"use client";

import { useEffect, useState } from "react";

type FadeRevealProps = {
  /** ms to wait before the fade starts */
  delay?: number;
  /** ms the fade transition takes */
  duration?: number;
  /** background color of the fade overlay */
  color?: string;
  /** starting opacity - 1 = solid, lower = more see-through */
  opacity?: number;
};

export default function FadeReveal({
  delay = 200,
  duration = 800,
  color = "var(--background)",
  opacity = 1,
}: FadeRevealProps) {
  const [visible, setVisible] = useState(true);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const startTimer = window.setTimeout(() => setVisible(false), delay);
    const removeTimer = window.setTimeout(
      () => setGone(true),
      delay + duration + 80
    );

    return () => {
      window.clearTimeout(startTimer);
      window.clearTimeout(removeTimer);
    };
  }, [delay, duration]);

  if (gone) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: color,
        opacity: visible ? opacity : 0,
        pointerEvents: "none",
        willChange: "opacity",
        transition: `opacity ${duration}ms ease`,
      }}
    />
  );
}
