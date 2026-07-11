"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import coffee from "@/assets/coffee.gif";

const DURATION = 3000; // ms

export default function SplashPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        // Small buffer so the bar visually completes before navigating
        setTimeout(() => router.replace("/crossiya"), 120);
      }
    };

    requestAnimationFrame(tick);
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        background: "var(--background, #fdf6f0)",
      }}
    >
      {/* GIF logo */}
      <Image src={coffee} alt="Maison Crème" width={160} height={160} priority />

      {/* Brand name */}
      {/* <p
        style={{
          fontFamily: "var(--font-display, Georgia, serif)",
          fontSize: "1.5rem",
          letterSpacing: "0.06em",
          color: "var(--foreground, #3d2c1e)",
          margin: 0,
        }}
      >
        Maison Crème
      </p> */}

      {/* Loader bar track */}
      <div className="border-2 border-primary-border w-50 h-2 rounded-xs">
        {/* Loader bar fill */}
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--primary-2)",
            boxShadow: "0 0 8px oklch(0.65 0.18 40 / 0.5)",
            transition: "width 60ms linear",
          }}
        />
      </div>

      {/* Subtle label */}
      <p
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--primary-2)",
          margin: 0,
        }}
      >
        Brewing your experience…
      </p>
    </div>
  );
}