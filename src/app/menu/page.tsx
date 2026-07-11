"use client";

import { ImageRevealList, type ImageRevealListItem } from "@/components/ui/image-reveal-list"
import { menuCatalog, menuCategories } from "@/lib/menu-data"
import { formatCurrency } from "@/lib/cart"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { MenuCategory } from "@/lib/menu-data"
import Navbar from "@/components/ui/navbar"
import { ShoppingCart } from "lucide-react"
import SmoothScroll from "@/components/scroll";
import { Footer } from "@/components/ui/footer";

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState<MenuCategory | "All">("All");

    const filteredDishes = activeCategory === "All"
        ? menuCatalog
        : menuCatalog.filter((d) => d.category === activeCategory);

    const items: ImageRevealListItem[] = filteredDishes.map((dish, idx) => ({
        id: dish.id,
        title: dish.name,
        price: formatCurrency(dish.priceCents),
        image: dish.image.src,
        number: String(idx + 1).padStart(2, "0"),
        dish,
    }));

    // Group items by category for sectioned display
    const groupedByCategory = menuCategories.map((cat) => ({
        category: cat,
        items: menuCatalog
            .filter((d) => d.category === cat)
            .map((dish, idx) => ({
                id: dish.id,
                title: dish.name,
                price: formatCurrency(dish.priceCents),
                image: dish.image.src,
                number: String(idx + 1).padStart(2, "0"),
                dish,
            } as ImageRevealListItem)),
    }));

    return (
        <SmoothScroll options={{ lerp: 0.2 }}>
            <div className="bg-[#0f0a05]">
                {/* ─── Hero Section ─── */}
                <section className="relative min-h-[70vh] w-full overflow-hidden flex items-end">
                    <Image
                        src="/images/menu-coffee.jpeg"
                        alt="Menu hero"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a05] via-[#0f0a05]/40 to-transparent" />

                    <Navbar />

                    {/* Hero content */}
                    <div className="relative z-10 w-full px-6 pb-16 sm:px-10 md:px-16 lg:px-24">
                        <span className="font-archivo text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#FFEED6]/60 mb-4 block">
                            Crossiya Menu
                        </span>
                        <h1 className="font-archivo text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-bold uppercase leading-[0.9] tracking-tight text-white">
                            Taste the<br />
                            <span className="font-belle text-[#FFEED6] tracking-normal font-normal">Craft</span>
                        </h1>
                        <p className="mt-6 max-w-md font-archivo text-sm sm:text-base leading-7 text-white/60">
                            A curated selection of drinks, bakes, and plates — each one a reflection of our dedication to craft.
                        </p>
                    </div>
                </section>

                {/* ─── Sticky Filter Bar ─── */}
                <section className="sticky top-0 z-40 bg-[#0f0a05]/95 backdrop-blur-md border-b border-white/[0.06]">
                    <div className="px-6 sm:px-10 md:px-16 lg:px-24 py-4 flex items-center justify-between gap-4">
                        {/* Category pills */}
                        <div className="flex flex-wrap gap-2 flex-1">
                            <button
                                onClick={() => setActiveCategory("All")}
                                className={`rounded-full px-4 py-1.5 font-archivo text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${activeCategory === "All"
                                    ? "bg-[#FFEED6] text-[#0f0a05]"
                                    : "bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white/80"
                                    }`}
                            >
                                All
                            </button>
                            {menuCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`rounded-full px-4 py-1.5 font-archivo text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${activeCategory === cat
                                        ? "bg-[#FFEED6] text-[#0f0a05]"
                                        : "bg-white/[0.06] text-white/50 hover:bg-white/10 hover:text-white/80"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Cart link */}
                        <Link
                            href="/cart"
                            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white/[0.06] border border-white/10 px-6 py-4 font-archivo text-[18px] sm:text-[18px] font-semibold uppercase tracking-[0.2em] text-[#FFEED6] transition-all hover:bg-white/10"
                        >
                            <ShoppingCart size={32} />
                            <span className="hidden sm:inline">Cart</span>
                        </Link>
                    </div>
                </section>

                {/* ─── Menu Content ─── */}
                <section className="px-6 sm:px-10 md:px-16 lg:px-24 py-16 sm:py-20">
                    {activeCategory === "All" ? (
                        // Sectioned view — one block per category
                        <div className="space-y-20">
                            {groupedByCategory.map(({ category, items: catItems }) => (
                                <div key={category}>
                                    {/* Category header */}
                                    <div className="flex items-end justify-between gap-4 mb-8 border-b border-white/[0.08] pb-4">
                                        <div>
                                            <span className="font-archivo text-[10px] uppercase tracking-[0.3em] text-[#FFEED6]/40 block mb-1">
                                                {catItems.length} items
                                            </span>
                                            <h2 className="font-archivo text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-tight text-[#FFEED6]">
                                                {category}
                                            </h2>
                                        </div>
                                    </div>

                                    <ImageRevealList items={catItems} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Filtered single-category view
                        <div>
                            <div className="flex items-end justify-between gap-4 mb-8 border-b border-white/[0.08] pb-4">
                                <div>
                                    <span className="font-archivo text-[10px] uppercase tracking-[0.3em] text-[#FFEED6]/40 block mb-1">
                                        {items.length} items
                                    </span>
                                    <h2 className="font-archivo text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-tight text-[#FFEED6]">
                                        {activeCategory}
                                    </h2>
                                </div>
                            </div>

                            <ImageRevealList items={items} />
                        </div>
                    )}
                </section>

                {/* ─── Bottom CTA Band ─── */}
                <section className="relative overflow-hidden">
                    <div className="relative px-6 sm:px-10 md:px-16 lg:px-24 py-20 sm:py-28 bg-gradient-to-b from-[#0f0a05] via-[#1a120b] to-[#0f0a05]">
                        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                        <div className="relative z-10 max-w-2xl mx-auto text-center">
                            <h3 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-tight text-[#FFEED6] mb-6">
                                Ready to Order?
                            </h3>
                            <p className="font-archivo text-sm sm:text-base leading-7 text-white/50 mb-10 max-w-md mx-auto">
                                Add your favourites and check out when you&apos;re ready. Your table is waiting.
                            </p>
                            <Link
                                href="/cart"
                                className="inline-flex items-center gap-3 rounded-lg bg-[#FFEED6] px-8 py-4 font-archivo text-sm font-bold uppercase tracking-[0.2em] text-[#0f0a05] transition-all hover:bg-white hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(255,238,214,0.15)]"
                            >
                                <ShoppingCart size={18} />
                                View Your Cart
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div></SmoothScroll>
    );
}