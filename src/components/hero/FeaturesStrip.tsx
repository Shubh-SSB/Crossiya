"use client";

import { useRef, useEffect, useState } from "react";
import { Coffee, Bean, Armchair, Heart } from "lucide-react";

const features = [
    {
        Icon: Bean,
        title: "Premium Beans",
        desc: "Sourced from the best coffee regions.",
    },
    {
        Icon: Coffee,
        title: "Expert Baristas",
        desc: "Brewing perfection in every cup.",
    },
    {
        Icon: Armchair,
        title: "Cozy Ambience",
        desc: "A space to relax, work or connect.",
    },
    {
        Icon: Heart,
        title: "Made with Love",
        desc: "Every detail curated for you.",
    },
];

export default function FeaturesStrip() {
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0); // 0 = hidden, 1 = fully revealed

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const windowH = window.innerHeight;

            // Start animating when the section's top is within 1.1x viewport height
            // Fully revealed when section's top reaches 0.3x viewport height
            const start = windowH * 5.5;
            const end = windowH * 3.5;
            const raw = 1 - (rect.top - end) / (start - end);
            setProgress(Math.max(0, Math.min(1, raw)));
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // initial check
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Interpolated values
    const translateY = (1 - progress) * 80;         // 80px → 0
    const borderRadius = (1 - progress) * 55;       // 55px curve → 0
    const contentOpacity = Math.max(0, (progress - 0.3) / 0.7); // fade in after 30%
    const contentTranslateY = (1 - contentOpacity) * 30;

    return (
        <section
            ref={sectionRef}
            className="relative text-white px-6 pt-16 pb-16"
            style={{
                background: "#0f0a05",
                borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
                marginTop: "-52px",
                zIndex: 2,
                transform: `translateY(${translateY}px)`,
                transition: "transform 0.05s linear, border-radius 0.05s linear",
            }}
        >
            {/* Heading */}
            <div
                className="text-center mb-12"
                style={{
                    opacity: contentOpacity,
                    transform: `translateY(${contentTranslateY}px)`,
                    transition: "opacity 0.1s, transform 0.1s",
                }}
            >
                <p
                    className="text-[10px] font-poppins font-semibold uppercase tracking-[0.30em] mb-3"
                    style={{ color: "#C08552" }}
                >
                    Made with Passion
                </p>
                <h2 className="font-display font-light text-3xl md:text-4xl">
                    Crafted for Coffee Lovers
                </h2>
                {/* decorative divider */}
                <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="h-px w-14" style={{ background: "rgba(192,133,82,0.35)" }} />
                    <Coffee size={16} style={{ color: "#C08552" }} />
                    <div className="h-px w-14" style={{ background: "rgba(192,133,82,0.35)" }} />
                </div>
            </div>

            {/* Feature columns — stagger each card */}
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {features.map(({ Icon, title, desc }, i) => {
                    const cardDelay = i * 0.08;
                    const cardProgress = Math.max(0, Math.min(1, (contentOpacity - cardDelay) / (1 - cardDelay)));
                    return (
                        <div
                            key={title}
                            className="flex flex-col items-center text-center gap-3"
                            style={{
                                opacity: cardProgress,
                                transform: `translateY(${(1 - cardProgress) * 24}px)`,
                                transition: "opacity 0.15s, transform 0.15s",
                            }}
                        >
                            <div
                                className="grid h-12 w-12 place-items-center rounded-full"
                                style={{ background: "rgba(192,133,82,0.12)", color: "#C08552" }}
                            >
                                <Icon size={22} strokeWidth={1.5} />
                            </div>
                            <p className="text-sm font-poppins font-semibold" style={{ color: "#C08552" }}>
                                {title}
                            </p>
                            <p
                                className="text-xs font-poppins leading-relaxed max-w-[130px]"
                                style={{ color: "rgba(255,255,255,0.50)" }}
                            >
                                {desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
