import Image from "next/image";
import matchaImg from "@/assets/menu-matcha.jpg";
import croissantImg from "@/assets/menu-croissant.jpg";
import cakeImg from "@/assets/menu-cake.jpg";
import cappuccinoImg from "@/assets/menu-cappuccino.jpg";
import MenuExplorer from "@/components/menu/MenuExplorer";

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

const plates = [
    { name: "Cappuccino", img: cappuccinoImg },
    { name: "Matcha", img: matchaImg },
    { name: "Croissant", img: croissantImg },
    { name: "Cake", img: cakeImg },
    { name: "Cappuccino", img: cappuccinoImg },
    { name: "Matcha", img: matchaImg },

];

export default function Menu() {
    return (
        <section id="menu" className="px-4 py-16 min-h-screen">
            <div className="mx-auto max-w-6xl">
                {/* ── Heading + Circular Plates ── */}
                <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">
                    {/* Left: heading text */}
                    <div className="flex-shrink-0 lg:max-w-md">
                        <h2 className="text-5xl font-poppins md:text-6xl">
                            Little plates,{" "}
                            <span className="block">
                                <span className="text-primary text-7xl font-handwriting">
                                    long mornings.
                                </span>
                            </span>
                        </h2>
                        <p className="mt-4 max-w-lg text-muted-foreground">
                            Browse the full 20-dish menu in a modal, then add items directly to your cart.
                        </p>
                    </div>

                    {/* Right: 8 circular plates + explorer button */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="grid grid-cols-6 gap-4 sm:gap-5">
                            {plates.map((plate, i) => (
                                <div
                                    key={plate.name + i}
                                    className="group relative"
                                    style={{ animationDelay: `${i * 60}ms` }}
                                >
                                    <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#f5e6d8] shadow-[0_8px_24px_rgba(120,70,40,0.15),inset_0_-3px_6px_rgba(0,0,0,0.06)] transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1.5 group-hover:shadow-[0_14px_35px_rgba(120,70,40,0.25)] sm:h-34 sm:w-34">
                                        <Image
                                            src={plate.img}
                                            alt={plate.name}
                                            fill
                                            sizes="104px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Elegant hover overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-[#110a06]/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                            <span className="font-display text-lg sm:text-xl text-[#f7efe8] text-center px-2 leading-tight drop-shadow-md">
                                                {plate.name}
                                            </span>
                                        </div>
                                        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/25" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <MenuExplorer />
                    </div>
                </div>

                {/* ── Original Menu Cards Grid ── */}
                <div className="flex flex-col items-center gap-10 mb-0">
                    <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                        {menu.map((item) => (
                            <article
                                key={item.name}
                                className="skeu-card group flex flex-col p-5 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-(--shadow-inset)">
                                    <Image
                                        src={item.img}
                                        alt={item.name}
                                        fill
                                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <span className="absolute left-3 top-3 skeu-pill px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
                                        {item.tone}
                                    </span>
                                </div>
                                <div className="mt-5 flex items-baseline justify-between gap-3">
                                    <h3 className="font-display text-2xl">{item.name}</h3>
                                    <span className="font-display text-lg text-primary">{item.price}</span>
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-6">
                        <MenuExplorer />
                    </div>
                </div>

            </div>
        </section>
    );
}