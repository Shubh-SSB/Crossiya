"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, PlusCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { addToCart, formatCurrency } from "@/lib/cart";
import { menuCatalog, menuCategories, type MenuCategory, type MenuDish } from "@/lib/menu-data";

const categoryColors: Record<MenuCategory, { border: string; shadow: string; text: string; lightText: string; bg: string; buttonBg: string; buttonText: string }> = {
    "Espresso Bar": {
        border: "border-[#d78a59]",
        shadow: "shadow-[0_0_20px_rgba(215,138,89,0.25)]",
        text: "text-[#d78a59]",
        lightText: "text-[#ffd9c2]",
        bg: "bg-[#d78a59]/10",
        buttonBg: "bg-[#d78a59]",
        buttonText: "text-[#3a2012]",
    },
    "Seasonal Sips": {
        border: "border-[#a5b082]",
        shadow: "shadow-[0_0_20px_rgba(165,176,130,0.25)]",
        text: "text-[#a5b082]",
        lightText: "text-[#e6ecd2]",
        bg: "bg-[#a5b082]/10",
        buttonBg: "bg-[#a5b082]",
        buttonText: "text-[#2a301a]",
    },
    "Fresh Bakes": {
        border: "border-[#dfa460]",
        shadow: "shadow-[0_0_20px_rgba(223,164,96,0.25)]",
        text: "text-[#dfa460]",
        lightText: "text-[#ffebd2]",
        bg: "bg-[#dfa460]/10",
        buttonBg: "bg-[#dfa460]",
        buttonText: "text-[#3a2712]",
    },
    Desserts: {
        border: "border-[#d18488]",
        shadow: "shadow-[0_0_20px_rgba(209,132,136,0.25)]",
        text: "text-[#d18488]",
        lightText: "text-[#ffdee0]",
        bg: "bg-[#d18488]/10",
        buttonBg: "bg-[#d18488]",
        buttonText: "text-[#3a1d1f]",
    },
    Plates: {
        border: "border-[#cf6c57]",
        shadow: "shadow-[0_0_20px_rgba(207,108,87,0.25)]",
        text: "text-[#cf6c57]",
        lightText: "text-[#ffcdc2]",
        bg: "bg-[#cf6c57]/10",
        buttonBg: "bg-[#cf6c57]",
        buttonText: "text-[#3a1a14]",
    },
};

export default function MenuExplorer() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<MenuCategory>(menuCategories[0]);
    const [selectedId, setSelectedId] = useState(menuCatalog[0]?.id ?? "");
    const [recentItem, setRecentItem] = useState<MenuDish | null>(null);
    const clearRecentTimer = useRef<number | null>(null);

    const groupedMenu = useMemo(
        () =>
            menuCategories.map((category) => ({
                category,
                items: menuCatalog.filter((item) => item.category === category),
            })),
        [],
    );

    const selectedItem = menuCatalog.find((item) => item.id === selectedId) ?? menuCatalog[0];

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const firstVisible = groupedMenu.find((group) => group.category === activeCategory)?.items[0];
        if (firstVisible) {
            setSelectedId(firstVisible.id);
        }
    }, [activeCategory, groupedMenu, isOpen]);

    const handleAdd = (item: MenuDish) => {
        addToCart(item);
        setRecentItem(item);

        if (clearRecentTimer.current) {
            window.clearTimeout(clearRecentTimer.current);
        }

        clearRecentTimer.current = window.setTimeout(() => {
            setRecentItem(null);
        }, 1700);
    };

    useEffect(() => {
        return () => {
            if (clearRecentTimer.current) {
                window.clearTimeout(clearRecentTimer.current);
            }
        };
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="skeu-btn skeu-btn-hover inline-flex px-5 py-3 text-sm font-semibold"
            >
                View menu
            </button>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-6 py-8 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Full menu"
                            className="relative flex h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-white/10 bg-[#BCA88D]/5 backdrop-blur-xs shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-6 sm:px-8">
                                <div>
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#d7a27d]">
                                        Full menu
                                    </p>
                                    <h3 className="mt-1 mb-2 font-display text-3xl text-[#f8efe6] sm:text-4xl">
                                        20 dishes, five categories
                                    </h3>
                                    {/* <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 mt-2 text-white/58">
                                        Hover any item to preview it here. Add dishes directly from the list or
                                        open the cart to review your order.
                                    </div> */}
                                </div>

                                <div className="flex justify-between items-center gap-3">

                                    <Link
                                        href="/cart"
                                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10"
                                    >
                                        View cart
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                        aria-label="Close menu"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[1.3fr_0.7fr]">
                                <div className="h-full overflow-y-auto px-6 py-6 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    <div className="mb-10 flex gap-6 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {menuCategories.map((category) => {
                                            const catImage = menuCatalog.find(item => item.category === category)?.image;
                                            const isActive = activeCategory === category;

                                            return (
                                                <button
                                                    key={category}
                                                    type="button"
                                                    onClick={() => setActiveCategory(category)}
                                                    className="group flex flex-col items-center gap-3 transition-transform hover:-translate-y-1"
                                                >
                                                    <div
                                                        className={`relative grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center overflow-hidden rounded-full border-2 transition-all duration-300 ${isActive
                                                            ? `${categoryColors[category].border} ${categoryColors[category].shadow}`
                                                            : "border-transparent bg-white/5 group-hover:border-white/20 group-hover:bg-white/10"
                                                            }`}
                                                    >
                                                        {catImage && (
                                                            <Image
                                                                src={catImage}
                                                                alt={category}
                                                                fill
                                                                className={`object-cover transition-all duration-500 ${isActive ? "scale-110 opacity-100" : "scale-100 opacity-60 group-hover:scale-110 group-hover:opacity-100"
                                                                    }`}
                                                            />
                                                        )}
                                                    </div>
                                                    <span
                                                        className={`whitespace-nowrap text-center text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? categoryColors[category].lightText : "text-white/55 group-hover:text-white/90"
                                                            }`}
                                                    >
                                                        {category}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="space-y-8">
                                        {groupedMenu.map(({ category, items }) => (
                                            <section key={category}>
                                                <div className="mb-6 flex items-center justify-between gap-3">
                                                    <h4 className={`font-display text-3xl ${categoryColors[category].text}`}>{category}</h4>
                                                    <span className="text-xs uppercase tracking-[0.32em] text-white/35">
                                                        {items.length} items
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    {items.map((item, index) => {
                                                        const isFeatured = index === 0;

                                                        return (
                                                            <div
                                                                key={item.id}
                                                                tabIndex={0}
                                                                onClick={() => {
                                                                    setActiveCategory(category);
                                                                    setSelectedId(item.id);
                                                                }}
                                                                onFocus={() => {
                                                                    setActiveCategory(category);
                                                                    setSelectedId(item.id);
                                                                }}
                                                                className={`group relative overflow-hidden rounded-[28px] border border-white/5 bg-[#C08552]/30 transition-all hover:border-white/15 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-[#efb39d]/40 cursor-pointer ${isFeatured
                                                                    ? "sm:row-span-2 flex flex-col justify-center min-h-[260px] p-6 pl-[150px] sm:pl-[180px]"
                                                                    : "flex flex-col justify-center min-h-[120px] p-5 pl-[110px] sm:pl-[130px]"
                                                                    }`}
                                                            >
                                                                {/* Background Image Circle */}
                                                                <div
                                                                    className={`absolute top-1/2 -translate-y-1/2 rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-none ${isFeatured
                                                                        ? "w-[240px] h-[240px] left-[-90px] sm:w-[280px] sm:h-[280px] sm:left-[-110px]"
                                                                        : "w-[150px] h-[150px] left-[-60px] sm:w-[160px] sm:h-[160px] sm:left-[-70px]"
                                                                        }`}
                                                                >
                                                                    <Image
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        fill
                                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                                    />
                                                                </div>

                                                                {/* Content */}
                                                                <div className="relative z-10 flex h-full flex-col">
                                                                    <div className={`text-[0.65rem] font-bold uppercase tracking-[0.2em] ${categoryColors[category].text}`}>
                                                                        {category}
                                                                    </div>
                                                                    <h5 className={`mt-1.5 font-display text-[#faf1e8] ${isFeatured ? 'text-3xl' : 'text-xl'}`}>
                                                                        {item.name}
                                                                    </h5>
                                                                    <p className={`mt-1.5 text-white/50 transition-colors group-hover:text-white/70 ${isFeatured ? 'text-sm leading-6 line-clamp-3' : 'text-xs leading-5 line-clamp-2'}`}>
                                                                        {item.description}
                                                                    </p>

                                                                    <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                                                                        <div className={`font-display text-white/70 transition-colors group-hover:text-[#f8efe6] ${isFeatured ? 'text-[1.35rem]' : 'text-lg'}`}>
                                                                            {formatCurrency(item.priceCents)}
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleAdd(item);
                                                                            }}
                                                                            className="rounded-full bg-white/5 p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                                                                            aria-label="Add to cart"
                                                                        >
                                                                            <PlusCircle size={22} />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleAdd(item)}
                                                                            className={`rounded-full border border-white/10 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 transition-all duration-300 hover:brightness-110 ${categoryColors[category].buttonBg} ${categoryColors[category].buttonText}`}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </section>
                                        ))}
                                    </div>
                                </div>

                                <aside className="h-full overflow-y-auto border-t border-white/10 bg-white/[0.015] px-6 py-6 lg:border-l lg:border-t-0 sm:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    <div className="mx-auto w-full space-y-6">
                                        <div className="overflow-hidden rounded-[32px] border border-white/5 bg-[#120a07] shadow-2xl">
                                            <div className="relative aspect-[16/9] w-full">
                                                <Image
                                                    src={selectedItem.image}
                                                    alt={selectedItem.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="p-7 sm:p-8">
                                                {/* Header Row: Category & Price */}
                                                <div className="flex items-center justify-between mb-5">
                                                    <p className={`text-[0.7rem] font-bold uppercase tracking-[0.35em] ${categoryColors[selectedItem.category].text}`}>
                                                        {selectedItem.category}
                                                    </p>
                                                    <div className="flex items-center gap-3">
                                                        <span className="rounded-[16px] border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold text-white/90 shadow-sm">
                                                            {formatCurrency(selectedItem.priceCents)}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleAdd(selectedItem)}
                                                            className="rounded-full bg-white/5 p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                                                            aria-label="Add to cart"
                                                        >
                                                            <PlusCircle size={22} />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h4 className="font-display text-3xl leading-[1.1] text-[#faf1e8] mb-2 pr-4">
                                                    {selectedItem.name}
                                                </h4>

                                                {/* Description */}
                                                <p className="text-base leading-[1.8] text-white/60 mb-5">
                                                    {selectedItem.description}
                                                </p>

                                                {/* Buttons */}
                                                <div className="flex gap-4 items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAdd(selectedItem)}
                                                        className="flex-1 rounded-lg bg-linear-to-b from-[#e58a74] to-[#cc6852] py-4 text-center font-bold text-white shadow-[0_10px_30px_rgba(204,104,82,0.3)] transition-transform hover:-translate-y-1"
                                                    >
                                                        <span className="block text-base">Add to Cart</span>
                                                    </button>
                                                    <Link
                                                        href="/cart"
                                                        className="grid place-items-center rounded-lg border border-white/10 bg-white/5 px-8 py-4 font-bold text-white/90 transition-colors hover:bg-white/15 hover:text-white"
                                                    >
                                                        Cart
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>

            <div
                className={`fixed bottom-5 right-5 z-[95] flex items-center gap-3 rounded-full border border-white/10 bg-[#f6e7dd] px-4 py-3 text-[#5a3127] shadow-[0_18px_40px_rgba(0,0,0,0.3)] transition-all duration-300 ${recentItem ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-4 scale-95 opacity-0"
                    }`}
            >
                {recentItem ? (
                    <>
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#d16b4d] text-white shadow-[0_8px_20px_rgba(209,107,77,0.35)]">
                            <Check size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#b15d43]">
                                Added to cart
                            </p>
                            <p className="truncate font-display text-lg leading-tight">{recentItem.name}</p>
                        </div>
                    </>
                ) : null}
            </div>
        </>
    );
}