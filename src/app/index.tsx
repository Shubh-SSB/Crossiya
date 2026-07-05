// import { createFileRoute } from "@tanstack/react-router";
// import heroImg from "@/assets/hero-coffee.jpg";
// import matchaImg from "@/assets/menu-matcha.jpg";
// import croissantImg from "@/assets/menu-croissant.jpg";
// import cakeImg from "@/assets/menu-cake.jpg";
// import cappuccinoImg from "@/assets/menu-cappuccino.jpg";
// import aboutImg from "@/assets/about-cafe.jpg";

// export const Route = createFileRoute("/")({
//   head: () => ({
//     meta: [
//       { title: "Maison Crème — Slow mornings, soft mornings" },
//       {
//         name: "description",
//         content:
//           "A pastel neighbourhood café serving hand-pulled espresso, matcha, and small-batch pastries. Open daily in the quiet end of town.",
//       },
//       { property: "og:title", content: "Maison Crème — Slow mornings, soft mornings" },
//       {
//         property: "og:description",
//         content: "Hand-pulled espresso, matcha, and small-batch pastries.",
//       },
//     ],
//   }),
//   component: Index,
// });

// const menu = [
//   {
//     name: "Heart Cappuccino",
//     desc: "Double ristretto, velvet milk, drawn by hand.",
//     price: "$5.20",
//     tone: "Warm",
//     img: cappuccinoImg,
//   },
//   {
//     name: "Garden Matcha",
//     desc: "Stone-milled ceremonial grade, oat or whole milk.",
//     price: "$6.40",
//     tone: "Sage",
//     img: matchaImg,
//   },
//   {
//     name: "Butter Croissant",
//     desc: "72-hour cold proof, French cultured butter.",
//     price: "$4.80",
//     tone: "Golden",
//     img: croissantImg,
//   },
//   {
//     name: "Strawberry Cloud",
//     desc: "Chiffon sponge, mascarpone cream, ripe berries.",
//     price: "$7.00",
//     tone: "Blush",
//     img: cakeImg,
//   },
// ];

// function Nav() {
//   return (
//     <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]">
//       <nav className="skeu-surface flex items-center justify-between gap-4 rounded-full px-3 py-2.5 pl-6">
//         <a href="#top" className="flex items-center gap-2">
//           <span className="grid h-9 w-9 place-items-center rounded-full skeu-btn text-sm font-semibold">m</span>
//           <span className="font-display text-lg tracking-tight">Maison Crème</span>
//         </a>
//         <ul className="hidden md:flex items-center gap-1 text-sm">
//           {[
//             ["Menu", "#menu"],
//             ["About", "#about"],
//             ["Visit", "#footer"],
//           ].map(([label, href]) => (
//             <li key={href}>
//               <a
//                 href={href}
//                 className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
//               >
//                 {label}
//               </a>
//             </li>
//           ))}
//         </ul>
//         <a href="#menu" className="skeu-btn skeu-btn-hover px-5 py-2.5 text-sm font-medium">
//           Order ahead
//         </a>
//       </nav>
//     </header>
//   );
// }

// function Hero() {
//   return (
//     <section id="top" className="relative px-4 pt-32 pb-20 md:pt-40 md:pb-28">
//       {/* floating decorative orbs */}
//       <div
//         aria-hidden
//         className="float-slow absolute left-[6%] top-32 h-24 w-24 rounded-full"
//         style={{ background: "var(--gradient-blush)", boxShadow: "var(--shadow-pillow)" }}
//       />
//       <div
//         aria-hidden
//         className="float-slower absolute right-[8%] top-48 h-16 w-16 rounded-full"
//         style={{ background: "var(--gradient-sage)", boxShadow: "var(--shadow-pillow)" }}
//       />
//       <div
//         aria-hidden
//         className="float-slow absolute right-[14%] bottom-10 h-12 w-12 rounded-full"
//         style={{ background: "var(--gradient-cream)", boxShadow: "var(--shadow-pillow)" }}
//       />

//       <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_1fr]">
//         <div className="relative z-10">
//           <span className="skeu-pill inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
//             <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
//             Open today · 7am – 6pm
//           </span>
//           <h1 className="mt-6 text-5xl leading-[1.02] md:text-7xl">
//             Slow mornings,
//             <br />
//             <em className="font-display italic text-primary">soft mornings.</em>
//           </h1>
//           <p className="mt-6 max-w-md text-lg text-muted-foreground">
//             A small pastel café tucked behind the linden trees. Hand-pulled espresso, stone-milled
//             matcha, and pastries made the long way.
//           </p>
//           <div className="mt-9 flex flex-wrap items-center gap-3">
//             <a href="#menu" className="skeu-btn skeu-btn-hover px-7 py-3.5 text-sm font-semibold">
//               See the menu
//             </a>
//             <a href="#about" className="skeu-btn-ghost px-7 py-3.5 text-sm font-medium text-foreground">
//               Our story →
//             </a>
//           </div>

//           <div className="mt-12 flex items-center gap-6">
//             <div className="skeu-inset flex items-center gap-3 px-5 py-3">
//               <div className="flex -space-x-2">
//                 {["#f3c6b5", "#cde0c6", "#f7dfc1"].map((c) => (
//                   <span
//                     key={c}
//                     className="h-7 w-7 rounded-full border-2 border-card"
//                     style={{ background: c }}
//                   />
//                 ))}
//               </div>
//               <span className="text-xs text-muted-foreground">
//                 Loved by <span className="font-semibold text-foreground">2,400+</span> regulars
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Hero visual */}
//         <div className="relative">
//           <div
//             className="relative aspect-square overflow-hidden rounded-[42%_58%_46%_54%/52%_44%_56%_48%]"
//             style={{ boxShadow: "var(--shadow-pillow)", border: "1px solid oklch(1 0 0 / 0.6)" }}
//           >
//             <img
//               src={heroImg}
//               alt="Cappuccino with heart latte art on a pastel pink ceramic plate"
//               width={1536}
//               height={1536}
//               className="h-full w-full object-cover"
//             />
//           </div>

//           {/* skeuomorphic badge */}
//           <div
//             className="absolute -left-4 top-10 skeu-card flex items-center gap-3 px-4 py-3 md:-left-10"
//           >
//             <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: "var(--gradient-sage)", boxShadow: "var(--shadow-soft)" }}>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-foreground">
//                 <path d="M3 8h13a4 4 0 0 1 0 8h-1" />
//                 <path d="M3 8v8a4 4 0 0 0 4 4h5a4 4 0 0 0 4-4" />
//                 <path d="M6 2v3M10 2v3M14 2v3" />
//               </svg>
//             </span>
//             <div>
//               <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Roasted in-house</p>
//               <p className="text-sm font-semibold">Single-origin beans</p>
//             </div>
//           </div>

//           <div
//             className="absolute -right-2 bottom-8 skeu-card px-5 py-4 md:-right-6"
//           >
//             <p className="font-display text-3xl text-primary">4.9</p>
//             <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Google · 800 reviews</p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Menu() {
//   return (
//     <section id="menu" className="px-4 py-24">
//       <div className="mx-auto max-w-6xl">
//         <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
//           <div>
//             <span className="skeu-pill inline-flex px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
//               The Menu
//             </span>
//             <h2 className="mt-5 text-5xl md:text-6xl">
//               Little plates, <em className="italic text-primary">long mornings.</em>
//             </h2>
//           </div>
//           <p className="max-w-sm text-muted-foreground">
//             A short menu that changes with the season. Everything is made in-house, by hand, that
//             same morning.
//           </p>
//         </div>

//         <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
//           {menu.map((item) => (
//             <article
//               key={item.name}
//               className="skeu-card group flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
//             >
//               <div
//                 className="relative aspect-[4/5] overflow-hidden rounded-3xl"
//                 style={{ boxShadow: "var(--shadow-inset)" }}
//               >
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   width={800}
//                   height={1000}
//                   loading="lazy"
//                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <span className="absolute left-3 top-3 skeu-pill px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
//                   {item.tone}
//                 </span>
//               </div>
//               <div className="mt-5 flex items-baseline justify-between gap-3">
//                 <h3 className="font-display text-2xl">{item.name}</h3>
//                 <span className="font-display text-lg text-primary">{item.price}</span>
//               </div>
//               <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function About() {
//   return (
//     <section id="about" className="px-4 py-24">
//       <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
//         <div className="relative">
//           <div
//             className="overflow-hidden rounded-[48%_52%_44%_56%/56%_46%_54%_44%]"
//             style={{ boxShadow: "var(--shadow-pillow)", border: "1px solid oklch(1 0 0 / 0.6)" }}
//           >
//             <img
//               src={aboutImg}
//               alt="The Maison Crème dining room, warm pastel walls and wooden tables"
//               width={1200}
//               height={1400}
//               loading="lazy"
//               className="aspect-[5/6] w-full object-cover"
//             />
//           </div>
//           <div className="absolute -bottom-6 -right-2 skeu-card flex items-center gap-4 px-5 py-4 md:-right-6">
//             <div className="skeu-inset grid h-12 w-12 place-items-center">
//               <span className="font-display text-xl text-primary">07</span>
//             </div>
//             <div>
//               <p className="text-xs uppercase tracking-wider text-muted-foreground">Years of</p>
//               <p className="font-display text-lg">slow mornings</p>
//             </div>
//           </div>
//         </div>

//         <div>
//           <span className="skeu-pill inline-flex px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em]">
//             Our story
//           </span>
//           <h2 className="mt-5 text-5xl leading-[1.05] md:text-6xl">
//             A little room
//             <br />
//             for <em className="italic text-primary">quiet rituals.</em>
//           </h2>
//           <p className="mt-6 text-lg text-muted-foreground">
//             Maison Crème began in 2018 as a single espresso machine on a windowsill. Today it's a
//             ten-seat room, the same machine, and the same belief: that a good morning starts with
//             something made carefully, by someone who cares.
//           </p>

//           <div className="mt-8 grid gap-4 sm:grid-cols-2">
//             {[
//               { k: "Beans", v: "Roasted weekly, in small batches with our friends at Færn." },
//               { k: "Pastries", v: "Made each morning by Lucie, before the sun is properly up." },
//               { k: "Milk", v: "From a single family farm, two hours north of the city." },
//               { k: "Room", v: "Ten seats, soft music, no laptops after eleven." },
//             ].map((b) => (
//               <div key={b.k} className="skeu-card p-5">
//                 <p className="font-display text-xl text-primary">{b.k}</p>
//                 <p className="mt-1 text-sm text-muted-foreground">{b.v}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer id="footer" className="px-4 pb-10 pt-16">
//       <div
//         className="mx-auto max-w-6xl skeu-card overflow-hidden p-8 md:p-14"
//         style={{ background: "var(--gradient-blush)" }}
//       >
//         <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
//           <div>
//             <div className="flex items-center gap-2">
//               <span className="grid h-10 w-10 place-items-center rounded-full skeu-btn text-sm font-semibold">
//                 m
//               </span>
//               <span className="font-display text-2xl">Maison Crème</span>
//             </div>
//             <p className="mt-5 max-w-sm text-foreground/75">
//               Come in for an espresso, stay for the second one. We'll save you the seat by the
//               window.
//             </p>
//             <div className="mt-6 flex gap-2">
//               <a href="#" className="skeu-btn-ghost grid h-11 w-11 place-items-center" aria-label="Instagram">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <rect x="2" y="2" width="20" height="20" rx="5" />
//                   <circle cx="12" cy="12" r="4" />
//                   <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
//                 </svg>
//               </a>
//               <a href="#" className="skeu-btn-ghost grid h-11 w-11 place-items-center" aria-label="TikTok">
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
//                 </svg>
//               </a>
//             </div>
//           </div>

//           <div>
//             <p className="text-xs uppercase tracking-wider text-foreground/60">Visit us</p>
//             <p className="mt-3 font-display text-xl">14 Rue des Tilleuls</p>
//             <p className="text-foreground/75">75011 Paris</p>
//             <p className="mt-4 text-sm text-foreground/75">
//               Mon–Fri · 7am – 6pm
//               <br />
//               Sat–Sun · 8am – 4pm
//             </p>
//           </div>

//           <div>
//             <p className="text-xs uppercase tracking-wider text-foreground/60">Say hello</p>
//             <p className="mt-3 font-display text-xl">hello@maisoncreme.co</p>
//             <p className="text-foreground/75">+33 1 23 45 67 89</p>
//             <a
//               href="#menu"
//               className="skeu-btn skeu-btn-hover mt-5 inline-flex px-5 py-2.5 text-sm font-semibold"
//             >
//               Book a table
//             </a>
//           </div>
//         </div>

//         <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/60 md:flex-row md:items-center">
//           <p>© {new Date().getFullYear()} Maison Crème. Made slowly, on purpose.</p>
//           <div className="flex gap-5">
//             <a href="#" className="hover:text-foreground">Privacy</a>
//             <a href="#" className="hover:text-foreground">Terms</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function Index() {
//   return (
//     <main className="min-h-screen">
//       <Nav />
//       <Hero />
//       <Menu />
//       <About />
//       <Footer />
//     </main>
//   );
// }
