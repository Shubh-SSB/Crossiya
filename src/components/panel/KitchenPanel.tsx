"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
    ChefHat,
    Clock,
    CheckCircle2,
    RefreshCw,
    Flame,
    ArrowRight,
    UtensilsCrossed,
} from "lucide-react";
import { formatCurrency } from "@/lib/cart";
import { getServerName } from "@/lib/panel";

type OrderStatus = "new" | "preparing" | "ready" | "served" | string;

type KitchenOrder = {
    id: string;
    tableNumber: string;
    customerName: string;
    customerPhone: string;
    subtotalCents: number;
    items: Array<{ name: string; quantity: number }>;
    status: OrderStatus;
    createdAt: string;
    updatedAt: string;
};

function timeAgo(iso: string) {
    const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
}

const statusFlow: Record<string, { next: OrderStatus; label: string; icon: typeof Flame }> = {
    new: { next: "preparing", label: "Start cooking", icon: Flame },
    preparing: { next: "ready", label: "Mark ready", icon: CheckCircle2 },
    ready: { next: "served", label: "Mark served", icon: UtensilsCrossed },
};

export default function KitchenPanel() {
    const [orders, setOrders] = useState<KitchenOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const loadOrders = useCallback(async () => {
        try {
            const response = await fetch("/api/panel/orders", { cache: "no-store" });
            const payload = await response.json();
            if (response.ok && Array.isArray(payload.orders)) {
                setOrders(payload.orders);
            }
        } catch {
            // silent fail, will retry
        } finally {
            setLoading(false);
        }
    }, []);

    // Load on mount and auto-refresh every 8 seconds
    useEffect(() => {
        void loadOrders();
        const interval = setInterval(() => void loadOrders(), 8000);
        return () => clearInterval(interval);
    }, [loadOrders]);

    const advanceOrder = async (orderId: string, nextStatus: OrderStatus) => {
        setUpdating(orderId);
        try {
            await fetch(`/api/panel/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });
            await loadOrders();
        } finally {
            setUpdating(null);
        }
    };

    // Only show open orders (new, preparing, ready)
    const openOrders = orders.filter(
        (order) => order.status === "new" || order.status === "preparing" || order.status === "ready"
    );

    const newOrders = openOrders.filter((o) => o.status === "new");
    const preparingOrders = openOrders.filter((o) => o.status === "preparing");
    const readyOrders = openOrders.filter((o) => o.status === "ready");

    return (
        <main className="min-h-screen bg-[#0c0806] px-4 py-6 text-[#f7efe8] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,250,246,0.04),rgba(255,250,246,0.01))] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.4)] sm:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_5%,rgba(239,179,157,0.12),transparent_24%),radial-gradient(circle_at_80%_90%,rgba(215,162,125,0.08),transparent_20%)]" />

                    {/* Header */}
                    <div className="relative flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#ef8d72]/15 text-[#ffd9cb]">
                                <ChefHat size={26} />
                            </div>
                            <div>
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d7a27d]">
                                    Kitchen display
                                </p>
                                <h1 className="mt-1 font-display text-3xl sm:text-4xl lg:text-5xl">
                                    Open orders
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => void loadOrders()}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                            <Link
                                href="/panel"
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                Owner panel
                            </Link>
                        </div>
                    </div>

                    {/* Summary pills */}
                    <div className="relative mt-5 flex flex-wrap gap-3">
                        {[
                            { label: "New", count: newOrders.length, color: "bg-red-500/20 text-red-300" },
                            { label: "Cooking", count: preparingOrders.length, color: "bg-amber-500/20 text-amber-300" },
                            { label: "Ready", count: readyOrders.length, color: "bg-emerald-500/20 text-emerald-300" },
                        ].map((pill) => (
                            <span
                                key={pill.label}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${pill.color}`}
                            >
                                <span className="relative flex h-2 w-2">
                                    {pill.count > 0 && (
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                                    )}
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
                                </span>
                                {pill.count} {pill.label}
                            </span>
                        ))}
                    </div>

                    {/* Order columns */}
                    <div className="relative mt-6 grid gap-5 lg:grid-cols-3">
                        {/* New orders */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="h-3 w-3 rounded-full bg-red-400" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                                    Incoming ({newOrders.length})
                                </h2>
                            </div>
                            {newOrders.length === 0 && (
                                <div className="rounded-[24px] border border-dashed border-white/10 p-6 text-center text-sm text-white/30">
                                    No new orders
                                </div>
                            )}
                            {newOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    updating={updating === order.id}
                                    onAdvance={advanceOrder}
                                    accent="border-red-400/30 bg-red-500/[0.06]"
                                />
                            ))}
                        </div>

                        {/* Preparing orders */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="h-3 w-3 rounded-full bg-amber-400" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                                    Cooking ({preparingOrders.length})
                                </h2>
                            </div>
                            {preparingOrders.length === 0 && (
                                <div className="rounded-[24px] border border-dashed border-white/10 p-6 text-center text-sm text-white/30">
                                    Nothing cooking
                                </div>
                            )}
                            {preparingOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    updating={updating === order.id}
                                    onAdvance={advanceOrder}
                                    accent="border-amber-400/30 bg-amber-500/[0.06]"
                                />
                            ))}
                        </div>

                        {/* Ready orders */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-1">
                                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                                <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">
                                    Ready ({readyOrders.length})
                                </h2>
                            </div>
                            {readyOrders.length === 0 && (
                                <div className="rounded-[24px] border border-dashed border-white/10 p-6 text-center text-sm text-white/30">
                                    Nothing ready
                                </div>
                            )}
                            {readyOrders.map((order) => (
                                <OrderCard
                                    key={order.id}
                                    order={order}
                                    updating={updating === order.id}
                                    onAdvance={advanceOrder}
                                    accent="border-emerald-400/30 bg-emerald-500/[0.06]"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Empty state */}
                    {!loading && openOrders.length === 0 && (
                        <div className="relative mt-6 flex flex-col items-center gap-4 rounded-[32px] border border-dashed border-white/10 py-16 text-center">
                            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/5 text-white/25">
                                <ChefHat size={36} />
                            </div>
                            <p className="text-lg text-white/40">All caught up — no open orders</p>
                            <p className="text-sm text-white/25">New orders will appear here automatically</p>
                        </div>
                    )}

                    {loading && (
                        <div className="relative mt-6 flex items-center justify-center py-16 text-white/40">
                            <RefreshCw size={24} className="animate-spin" />
                            <span className="ml-3">Loading orders...</span>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

/* ─── Order card sub-component ────────────────────────────────────────── */

function OrderCard({
    order,
    updating,
    onAdvance,
    accent,
}: {
    order: KitchenOrder;
    updating: boolean;
    onAdvance: (orderId: string, nextStatus: OrderStatus) => Promise<void>;
    accent: string;
}) {
    const flow = statusFlow[order.status];

    return (
        <article className={`rounded-[24px] border ${accent} p-4 transition-all`}>
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#faf1e8]">
                        Table {order.tableNumber}
                    </span>
                    <h3 className="mt-2 font-display text-xl text-[#f8efe6]">{order.customerName}</h3>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                    <span className="font-display text-lg text-[#faf1e8]">
                        {formatCurrency(order.subtotalCents)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] text-white/35">
                        <Clock size={10} />
                        {timeAgo(order.createdAt)}
                    </span>
                </div>
            </div>

            {/* Items */}
            <div className="mt-3 space-y-1">
                {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-white/65">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-white/10 text-[0.6rem] font-bold text-white/70">
                            {item.quantity}
                        </span>
                        {item.name}
                    </div>
                ))}
            </div>

            {/* Server assignment */}
            {order.status === "ready" && (
                <div className="mt-4 flex items-center justify-between rounded-[16px] bg-emerald-500/10 px-4 py-3 text-[0.7rem] uppercase tracking-[0.2em] text-emerald-300">
                    <span className="font-semibold text-emerald-300/60">Server assigned</span>
                    <span className="font-bold">{getServerName(order.id)}</span>
                </div>
            )}

            {/* Action button */}
            {flow && (
                <button
                    type="button"
                    onClick={() => void onAdvance(order.id, flow.next)}
                    disabled={updating}
                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-4 py-3 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
                >
                    {updating ? (
                        <RefreshCw size={16} className="animate-spin" />
                    ) : (
                        <flow.icon size={16} />
                    )}
                    {flow.label}
                    <ArrowRight size={14} className="ml-auto opacity-50" />
                </button>
            )}
        </article>
    );
}
