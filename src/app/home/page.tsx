import { Metadata } from "next";
import Image from "next/image";
import matchaImg from "@/assets/menu-matcha.jpg";
import croissantImg from "@/assets/menu-croissant.jpg";
import cakeImg from "@/assets/menu-cake.jpg";
import cappuccinoImg from "@/assets/menu-cappuccino.jpg";
import aboutImg from "@/assets/about-cafe.jpg";
import FadeReveal from "@/components/FadeReveal";
import Section from "@/components/hero/section";
import MenuExplorer from "@/components/menu/MenuExplorer";
import Pizza from "@/components/menu/pizza";
import Menu from "@/components/menu/page";
import CornerDisplay from "@/components/corners";

export const metadata: Metadata = {
    title: "Maison Crème — Slow mornings, soft mornings",
    description:
        "A pastel neighbourhood café serving hand-pulled espresso, matcha, and small-batch pastries. Open daily in the quiet end of town.",
    openGraph: {
        title: "Maison Crème — Slow mornings, soft mornings",
        description: "Hand-pulled espresso, matcha, and small-batch pastries.",
    },
};

const menu = [
    {
        name: "Heart Cappuccino",
        desc: "Double ristretto, velvet milk, drawn by hand.",
        price: "$5.20",
        tone: "Warm",
        img: cappuccinoImg,
    },
    {
        name: "Garden Matcha",
        desc: "Stone-milled ceremonial grade, oat or whole milk.",
        price: "$6.40",
        tone: "Sage",
        img: matchaImg,
    },
    {
        name: "Butter Croissant",
        desc: "72-hour cold proof, French cultured butter.",
        price: "$4.80",
        tone: "Golden",
        img: croissantImg,
    },
    {
        name: "Strawberry Cloud",
        desc: "Chiffon sponge, mascarpone cream, ripe berries.",
        price: "$7.00",
        tone: "Blush",
        img: cakeImg,
    },
];

function Nav() {
    return (
        <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]">
            <nav className="skeu-card border border-[#f7efe8]/50 flex items-center justify-between gap-4 rounded-full p-2 pl-6 pr-2 text-[#0f0a05] shadow-lg">
                <a href="#top" className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#0f0a05] text-[#f7efe8] font-handwriting text-2xl pt-1">C</span>
                    <span className="font-poppins font-semibold text-xl tracking-tight text-[#0f0a05]">Crossiya</span>
                </a>
                <span className="hidden lg:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f0a05]/5 text-xs font-semibold uppercase tracking-widest text-[#0f0a05]/60 shadow-inner">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#c08552] shadow-[0_0_8px_#c08552]" />
                    Open · 7am – 6pm
                </span>
                <ul className="hidden md:flex items-center gap-2 text-sm font-poppins font-medium">
                    {[
                        ["Menu", "#menu"],
                        ["About", "#about"],
                        ["Visit", "#footer"],
                    ].map(([label, href]) => (
                        <li key={href}>
                            <a
                                href={href}
                                className="rounded-full px-5 py-2.5 text-[#0f0a05]/70 transition-all hover:text-[#0f0a05] hover:bg-[#0f0a05]/5"
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a href="#menu" className="skeu-btn skeu-btn-hover px-6 py-3 text-sm font-bold rounded-full">
                    Order ahead
                </a>
            </nav>
        </header>
    );
}

function About() {
    return (
        <section id="about" className="px-4 py-24">
            <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
                <div className="relative">
                    <div
                        className="overflow-hidden rounded-[48%_52%_44%_56%/56%_46%_54%_44%] border border-white/60 shadow-(--shadow-pillow)"
                    >
                        <Image
                            src={aboutImg}
                            alt="The Maison Crème dining room, warm pastel walls and wooden tables"
                            className="aspect-5/6 w-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-2 skeu-card flex items-center gap-4 px-5 py-4 md:-right-6">
                        <div className="skeu-inset grid h-12 w-12 place-items-center">
                            <span className="font-display text-xl text-primary">07</span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-muted-foreground">Years of</p>
                            <p className="font-display text-lg">slow mornings</p>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="skeu-pill inline-flex px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
                        Our story
                    </span>
                    <h2 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
                        A little room
                        <br />
                        for <em className="italic text-primary">quiet rituals.</em>
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Maison Crème began in 2018 as a single espresso machine on a windowsill. Today it&apos;s a
                        ten-seat room, the same machine, and the same belief: that a good morning starts with
                        something made carefully, by someone who cares.
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {[
                            { k: "Beans", v: "Roasted weekly, in small batches with our friends at Færn." },
                            { k: "Pastries", v: "Made each morning by Lucie, before the sun is properly up." },
                            { k: "Milk", v: "From a single family farm, two hours north of the city." },
                            { k: "Room", v: "Ten seats, soft music, no laptops after eleven." },
                        ].map((b) => (
                            <div key={b.k} className="skeu-card p-5">
                                <p className="font-display text-xl text-primary">{b.k}</p>
                                <p className="mt-1 text-sm text-muted-foreground">{b.v}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer id="footer" className="px-6 pb-10 pt-16">
            <div
                className="mx-auto max-w-8xl skeu-card overflow-hidden bg-(--gradient-blush) p-8 md:p-14"
            >
                <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="grid h-10 w-10 place-items-center rounded-full skeu-btn text-sm font-semibold">
                                C
                            </span>
                            <span className="font-display text-2xl">Crossiya</span>
                        </div>
                        <p className="mt-5 max-w-sm text-foreground/75">
                            Come in for an espresso, stay for the second one. We&apos;ll save you the seat by the
                            window.
                        </p>
                        <div className="mt-6 flex gap-2">
                            <a href="#" className="skeu-btn-ghost grid h-11 w-11 place-items-center" aria-label="Instagram">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                                </svg>
                            </a>
                            <a href="#" className="skeu-btn-ghost grid h-11 w-11 place-items-center" aria-label="TikTok">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-foreground/60">Visit us</p>
                        <p className="mt-3 font-display text-xl">14 Rue des Tilleuls</p>
                        <p className="text-foreground/75">75011 Paris</p>
                        <p className="mt-4 text-sm text-foreground/75">
                            Mon–Fri · 7am – 6pm
                            <br />
                            Sat–Sun · 8am – 4pm
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-wider text-foreground/60">Say hello</p>
                        <p className="mt-3 font-display text-xl">hello@maisoncreme.co</p>
                        <p className="text-foreground/75">+33 1 23 45 67 89</p>
                        <a
                            href="#menu"
                            className="skeu-btn skeu-btn-hover mt-5 inline-flex px-5 py-2.5 text-sm font-semibold"
                        >
                            Book a table
                        </a>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/60 md:flex-row md:items-center">
                    <p>© {new Date().getFullYear()} Maison Crème. Made slowly, on purpose.</p>
                    <div className="flex gap-5">
                        <a href="#" className="hover:text-foreground">Privacy</a>
                        <a href="#" className="hover:text-foreground">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SubFooter() {
    return (
        <div className="mx-6 mb-10 mt-2 flex justify-center items-center overflow-hidden pointer-events-none select-none opacity-90">
            <h1 className="text-[12vw] text-[#c08552] leading-none tracking-tight whitespace-nowrap">
                {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i}>Crossiya</span>
                ))}
            </h1>
        </div>
    );
}

export default function Index() {
    return (
        <main className="min-h-screen font-poppins">
            <FadeReveal delay={80} duration={750} />
            <Nav />
            <Section />
            <Menu />
            <Pizza />
            <About />
            <div className="mx-6 my-10 flex flex-col lg:flex-row gap-6">
                <div className="h-[600px] w-full rounded-lg overflow-hidden">
                    <CornerDisplay />
                </div>
                <div className="h-[600px] w-full rounded-lg overflow-hidden">
                    <CornerDisplay />
                </div>
            </div>
            <Footer />
            <SubFooter />
        </main>
    );
}
