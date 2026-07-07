"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero/hero";

gsap.registerPlugin(ScrollTrigger);

const languages = [
    "Hello",
    "Ciao",
    "Hola",
    "नमस्ते",
    "Bonjour",
    "Privet",
    "Kon'nichiwa",
];

export default function CafeIntro() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const helloRef = useRef<HTMLHeadingElement>(null);

    const heroRef = useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState(0);

    const [finished, setFinished] = useState(false);

    // -------------------------
    // Language Cycle
    // -------------------------

    useEffect(() => {
        if (finished) return;

        if (index === languages.length - 1) {
            const t = setTimeout(() => {
                setFinished(true);
            }, 600);

            return () => clearTimeout(t);
        }

        const timer = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, 250);

        return () => clearTimeout(timer);
    }, [index, finished]);

    // -------------------------
    // Intro Animation
    // -------------------------

    useEffect(() => {
        if (!finished) return;

        const ctx = gsap.context(() => {

            gsap.set(heroRef.current, {
                autoAlpha: 0,
                scale: 0.96,
            });

            gsap.set(helloRef.current, {
                autoAlpha: 1,
                scale: 1,
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(helloRef.current, {
                scale: 22,
                ease: "none",
                duration: 1,
            })

                .to(
                    helloRef.current,
                    {
                        autoAlpha: 0,
                        duration: 0.15,
                    },
                    0.80
                )

                .to(
                    heroRef.current,
                    {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.35,
                    },
                    0.95
                );

        });

        return () => ctx.revert();

    }, [finished]);

    return (

        <section
            ref={sectionRef}
            className="relative h-[300vh] bg-black"
        >

            <div
                className="sticky top-0 h-screen overflow-hidden bg-black"
            >

                <div
                    ref={heroRef}
                    className="absolute inset-0 z-0 invisible opacity-0 scale-95"
                >
                    <Hero />
                </div>

                <div
                    className="absolute inset-0 z-10 flex items-center justify-center"
                >

                    <h1
                        ref={helloRef}
                        className="select-none text-[12vw] font-black tracking-tighter text-white will-change-transform"
                    >

                        {languages[index]}

                    </h1>

                </div>

            </div>

        </section>

    )

}