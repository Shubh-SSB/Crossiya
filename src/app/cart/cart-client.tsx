"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { clearCart, formatCurrency, loadCart, removeFromCart, updateCartQuantity, type CartItem, cartSubtotal, CART_EVENT } from "@/lib/cart";

type CartClientProps = {
    tableNumber: string;
    tableToken?: string | null;
    signedLinkRequired: boolean;
};

export default function CartClient({ tableNumber, tableToken, signedLinkRequired }: CartClientProps) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        const syncCart = () => setItems(loadCart());

        syncCart();
        window.addEventListener("storage", syncCart);
        window.addEventListener(CART_EVENT, syncCart as EventListener);

        return () => {
            window.removeEventListener("storage", syncCart);
            window.removeEventListener(CART_EVENT, syncCart as EventListener);
        };
    }, []);

    const subtotal = useMemo(() => cartSubtotal(items), [items]);

    const submitOrder = async () => {
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName || !trimmedPhone || items.length === 0) {
            setStatusMessage("Add your name, phone number, and at least one dish first.");
            return;
        }

        setIsSubmitting(true);
        setStatusMessage(null);

        try {
            const response = await fetch("/api/kitchen-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tableNumber,
                    tableToken,
                    customerName: trimmedName,
                    customerPhone: trimmedPhone,
                    subtotalCents: subtotal,
                    items,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to send order");
            }

            setStatusMessage("Order sent to the kitchen.");
            setIsOrderOpen(false);
            setName("");
            setPhone("");
        } catch {
            setStatusMessage("Could not reach the kitchen endpoint yet. Check the webhook link.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#110a06] px-4 py-8 text-[#f7efe8] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mb-8 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#d7a27d]">
                            Minimal cart
                        </p>
                        <h1 className="mt-3 font-display text-5xl sm:text-6xl">Your cart</h1>
                        <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/45">
                            Table {tableNumber}
                        </p>
                        <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white/30">
                            {signedLinkRequired ? "Verified table link required" : "Development mode"}
                        </p>
                    </div>

                    <Link
                        href="/home#menu"
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10"
                    >
                        Back to menu
                    </Link>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-4xl border border-white/10 bg-white/4 p-8 text-center">
                        <p className="font-display text-3xl">Nothing in your cart yet.</p>
                        <p className="mt-3 text-white/60">Open the menu, hover a dish, and add it here.</p>
                        <Link
                            href="/home#menu"
                            className="mt-6 inline-flex rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-5 py-3 text-sm font-semibold text-white"
                        >
                            Browse dishes
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <section className="space-y-4">
                            {items.map((item) => (
                                <article
                                    key={item.id}
                                    className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/4 p-4 sm:flex-row sm:items-center"
                                >
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                                        <Image src={item.imageSrc} alt={item.name} fill className="object-cover" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d7a27d]">
                                                    {item.category}
                                                </p>
                                                <h2 className="mt-2 font-display text-2xl text-[#faf1e8]">
                                                    {item.name}
                                                </h2>
                                            </div>
                                            <span className="font-semibold text-white/85">
                                                {formatCurrency(item.priceCents * item.quantity)}
                                            </span>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                                <button
                                                    type="button"
                                                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                    className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-lg leading-none text-white transition-colors hover:bg-white/10"
                                                >
                                                    -
                                                </button>
                                                <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                    className="grid h-7 w-7 place-items-center rounded-full bg-white/5 text-lg leading-none text-white transition-colors hover:bg-white/10"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>

                        <aside className="h-fit rounded-4xl border border-white/10 bg-white/5 p-6">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-[#d7a27d]">
                                Summary
                            </p>
                            <div className="mt-4 space-y-3 text-sm text-white/65">
                                <div className="flex items-center justify-between">
                                    <span>Items</span>
                                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Subtotal</span>
                                    <span>{formatCurrency(subtotal)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Pickup</span>
                                    <span>Free</span>
                                </div>
                            </div>

                            <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/60">
                                This is a minimal cart. Checkout can be wired later once you are ready.
                            </div>

                            {statusMessage ? (
                                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                                    {statusMessage}
                                </div>
                            ) : null}

                            <div className="mt-6 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={clearCart}
                                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    Clear cart
                                </button>
                                <Link
                                    href="/home#menu"
                                    className="flex-1 rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-4 py-3 text-center text-sm font-semibold text-white"
                                >
                                    Add more
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => setIsOrderOpen(true)}
                                    disabled={items.length === 0}
                                    className="group relative flex-1 overflow-hidden rounded-full bg-[#f1d3c8] px-4 py-3 text-sm font-semibold text-[#5a3127] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(239,141,114,0.4)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(239,141,114,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                    style={items.length > 0 ? { animation: "order-glow 2.5s ease-in-out infinite" } : undefined}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <span className="inline-block transition-transform duration-300 group-hover:scale-110">🍽</span>
                                        Order now
                                    </span>
                                    <span className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.5)_45%,transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:animate-[shimmer_1.2s_ease-out] group-hover:opacity-100" />
                                </button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>

            {isOrderOpen ? (
                <div
                    className="fixed inset-0 z-90 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
                    onClick={() => setIsOrderOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Send order to kitchen"
                        className="w-full max-w-lg rounded-4xl border border-white/10 bg-[#160d09]/95 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#d7a27d]">
                                    Order handoff
                                </p>
                                <h2 className="mt-2 font-display text-3xl text-[#f8efe6]">
                                    Send to kitchen
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOrderOpen(false)}
                                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                aria-label="Close order popup"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
                            Table {tableNumber} · {items.length} items · {formatCurrency(subtotal)} total
                        </div>

                        <div className="mt-5 space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                                    Name
                                </span>
                                <input
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    placeholder="Your name"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#efb39d]/60"
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                                    Phone number
                                </span>
                                <input
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    placeholder="+1 555 000 0000"
                                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-[#efb39d]/60"
                                />
                            </label>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={submitOrder}
                                disabled={isSubmitting}
                                className="flex-1 rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting ? "Sending..." : "Send order"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsOrderOpen(false)}
                                className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </main>
    );
}