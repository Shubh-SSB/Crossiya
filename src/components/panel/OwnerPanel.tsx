"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, Download, RefreshCw, QrCode, Sparkles, CornerUpRight, Receipt } from "lucide-react";
import { formatCurrency } from "@/lib/cart";
import { getServerName } from "@/lib/panel";

type OrderStatus = "new" | "preparing" | "ready" | "served" | string;

type PanelDashboard = {
    summary: {
        totalOrders: number;
        openOrders: number;
        readyOrders: number;
        servedOrders: number;
        activeTables: number;
        revenueCents: number;
        qrRequests: number;
    };
    recentOrders: Array<{
        id: string;
        tableNumber: string;
        customerName: string;
        customerPhone: string;
        subtotalCents: number;
        items: Array<{ name: string; quantity: number }>;
        status: OrderStatus;
        createdAt: string;
        updatedAt: string;
    }>;
    tables: Array<{
        tableNumber: string;
        orderCount: number;
        lastStatus: OrderStatus;
        lastOrderAt: string;
        open: boolean;
    }>;
    recentQrRequests: Array<{
        id: string;
        tableNumber: string;
        url: string;
        createdAt: string;
    }>;
};

type QrAsset = {
    tableNumber: string;
    ticket: string;
    url: string;
    svg: string;
    dataUrl: string;
    pngDataUrl: string;
};

const orderStatuses: OrderStatus[] = ["new", "preparing", "ready", "served"];

function statusLabel(status: OrderStatus) {
    return String(status).replace(/^[a-z]/, (letter) => letter.toUpperCase());
}

export default function OwnerPanel() {
    const [dashboard, setDashboard] = useState<PanelDashboard | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tableNumber, setTableNumber] = useState("12");
    const [qrAsset, setQrAsset] = useState<QrAsset | null>(null);
    const [qrLoading, setQrLoading] = useState(false);
    const [copyMessage, setCopyMessage] = useState<string | null>(null);

    const loadDashboard = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/panel/dashboard", { cache: "no-store" });
            const payload = (await response.json()) as PanelDashboard | { error?: string };

            if (!response.ok) {
                throw new Error(payload && "error" in payload ? payload.error || "Failed to load panel" : "Failed to load panel");
            }

            setDashboard(payload as PanelDashboard);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Failed to load panel");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadDashboard();
    }, [loadDashboard]);

    const refreshOrder = async (orderId: string, nextStatus: OrderStatus) => {
        await fetch(`/api/panel/orders/${orderId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: nextStatus }),
        });
        await loadDashboard();
    };

    const generateQr = async () => {
        setQrLoading(true);
        try {
            const response = await fetch("/api/panel/qr", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tableNumber }),
            });
            const payload = await response.json();
            if (!response.ok) {
                throw new Error(payload.error || "Failed to generate QR");
            }
            setQrAsset(payload as QrAsset);
            await loadDashboard();
        } catch (qrError) {
            setError(qrError instanceof Error ? qrError.message : "Failed to generate QR");
        } finally {
            setQrLoading(false);
        }
    };

    const copyToClipboard = async () => {
        if (!qrAsset) {
            return;
        }

        await navigator.clipboard.writeText(qrAsset.url);
        setCopyMessage("Cart link copied.");
        window.setTimeout(() => setCopyMessage(null), 1500);
    };

    const downloadQr = () => {
        if (!qrAsset) return;

        const size = 1024;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Use pngDataUrl if available, otherwise convert SVG to a usable source
        const imgSrc = qrAsset.pngDataUrl || qrAsset.dataUrl;

        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            // White background
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, size, size);

            // Draw the QR code
            ctx.drawImage(img, 0, 0, size, size);

            // Draw a white circle in the center for the logo area
            const cx = size / 2;
            const cy = size / 2;
            const radius = size * 0.13;

            ctx.beginPath();
            ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.fill();

            // Subtle border around the circle
            ctx.beginPath();
            ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
            ctx.strokeStyle = "#e0d5cc";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Draw the cafe name "LIA"
            ctx.fillStyle = "#1a1a1a";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `bold ${Math.round(radius * 1.05)}px Georgia, 'Times New Roman', serif`;
            ctx.fillText("LIA", cx, cy);

            // Trigger download
            const link = document.createElement("a");
            link.download = `LIA-Table-${qrAsset.tableNumber}-QR.png`;
            link.href = canvas.toDataURL("image/png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.onerror = () => {
            // Fallback: direct download of the SVG
            const link = document.createElement("a");
            link.download = `LIA-Table-${qrAsset.tableNumber}-QR.svg`;
            link.href = qrAsset.dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = imgSrc;
    };

    const printInvoice = (order: PanelDashboard["recentOrders"][0]) => {
        const serverName = getServerName(order.id);
        const date = new Date(order.createdAt).toLocaleString();
        
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice - ${order.id}</title>
                <style>
                    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #111; max-width: 600px; margin: 0 auto; }
                    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                    .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
                    .header p { margin: 5px 0; color: #666; font-size: 14px; }
                    .meta { display: flex; justify-content: space-between; margin-bottom: 30px; font-size: 14px; color: #444; }
                    .meta div { display: flex; flex-direction: column; gap: 4px; }
                    .items { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    .items th { text-align: left; border-bottom: 1px solid #ddd; padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; }
                    .items td { padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; }
                    .items .qty { width: 50px; text-align: center; }
                    .total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 20px; }
                    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; }
                    @media print { body { padding: 0; } }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Crossiya</h1>
                    <p>+1 (555) 123-4567</p>
                </div>
                
                <div class="meta">
                    <div>
                        <strong>Customer:</strong>
                        <span>${order.customerName}</span>
                        <span>${order.customerPhone}</span>
                    </div>
                    <div style="text-align: right">
                        <strong>Order Date:</strong>
                        <span>${date}</span>
                        <strong style="margin-top: 10px">Server:</strong>
                        <span>${serverName}</span>
                    </div>
                </div>

                <table class="items">
                    <thead>
                        <tr>
                            <th class="qty">Qty</th>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td class="qty">${item.quantity}</td>
                                <td>${item.name}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>

                <div class="total">
                    Total: ${formatCurrency(order.subtotalCents)}
                </div>

                <div class="footer">
                    Thank you for dining with us!
                </div>
            </body>
            </html>
        `;
        
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.width = "0";
        iframe.style.height = "0";
        iframe.style.border = "none";
        document.body.appendChild(iframe);

        if (iframe.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(html);
            iframe.contentWindow.document.close();
            
            // Wait slightly for the browser to parse before printing
            setTimeout(() => {
                iframe.contentWindow?.focus();
                iframe.contentWindow?.print();
                
                // Cleanup after a short delay
                setTimeout(() => {
                    if (document.body.contains(iframe)) {
                        document.body.removeChild(iframe);
                    }
                }, 2000);
            }, 250);
        }
    };

    const revenue = useMemo(() => dashboard ? formatCurrency(dashboard.summary.revenueCents) : "$0.00", [dashboard]);

    return (
        <main className="min-h-screen bg-[#110a06] px-4 py-6 text-[#f7efe8] sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,250,246,0.05),rgba(255,250,246,0.02))] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.32)] sm:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(239,141,114,0.18),transparent_24%),radial-gradient(circle_at_90%_20%,rgba(215,162,125,0.14),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.04),transparent_28%)]" />

                    <div className="relative flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.42em] text-[#d7a27d]">
                                Owner panel
                            </p>
                            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl">
                                Precise control for the floor
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base">
                                Track active tables, current orders, revenue, and generate signed QR links for new
                                table placards without exposing the secret to the browser.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => void loadDashboard()}
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                            <Link
                                href="/home"
                                className="inline-flex items-center gap-2 rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-4 py-2.5 text-sm font-semibold text-white"
                            >
                                Back to site
                            </Link>
                        </div>
                    </div>

                    {error ? (
                        <div className="relative mt-5 rounded-3xl border border-[#ef8d72]/40 bg-[#ef8d72]/10 px-4 py-3 text-sm text-[#ffd9cb]">
                            {error}
                        </div>
                    ) : null}

                    <div className="relative mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            { label: "Open orders", value: dashboard?.summary.openOrders ?? 0 },
                            { label: "Active tables", value: dashboard?.summary.activeTables ?? 0 },
                            { label: "Ready orders", value: dashboard?.summary.readyOrders ?? 0 },
                            { label: "Revenue", value: revenue },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="rounded-[32px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                            >
                                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{item.label}</p>
                                <p className="mt-4 font-display text-4xl text-[#faf1e8]">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="relative mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                        <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-5">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d7a27d]">
                                        Live orders
                                    </p>
                                    <h2 className="mt-2 font-display text-3xl">Kitchen queue</h2>
                                </div>
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/50">
                                    {dashboard?.summary.totalOrders ?? 0} total
                                </span>
                            </div>

                            <div className="mt-5 space-y-4">
                                {loading ? (
                                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/55">
                                        Loading orders...
                                    </div>
                                ) : dashboard?.recentOrders.length ? (
                                    dashboard.recentOrders.map((order) => (
                                        <article
                                            key={order.id}
                                            className="rounded-[28px] border border-white/10 bg-[#120a07] p-4"
                                        >
                                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                <div className="min-w-0">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="rounded-full bg-[#efb39d]/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#ffd9cb]">
                                                            Table {order.tableNumber}
                                                        </span>
                                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                                                            {statusLabel(order.status)}
                                                        </span>
                                                    </div>

                                                    <h3 className="mt-3 font-display text-2xl text-[#f8efe6]">
                                                        {order.customerName}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-white/50">{order.customerPhone}</p>
                                                    <p className="mt-3 text-sm leading-6 text-white/65">
                                                        {order.items.map((item) => `${item.quantity}× ${item.name}`).join(" · ")}
                                                    </p>
                                                </div>

                                                <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
                                                    <p className="font-display text-3xl text-[#faf1e8]">
                                                        {formatCurrency(order.subtotalCents)}
                                                    </p>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => printInvoice(order)}
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                                            title="Print Invoice"
                                                        >
                                                            <Receipt size={12} /> Print
                                                        </button>
                                                        {orderStatuses.map((status) => (
                                                            <button
                                                                key={status}
                                                                type="button"
                                                                onClick={() => void refreshOrder(order.id, status)}
                                                                className={`rounded-full border px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] transition-colors ${
                                                                    order.status === status
                                                                        ? "border-[#efb39d]/50 bg-[#efb39d]/12 text-[#ffd9cb]"
                                                                        : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white"
                                                                }`}
                                                            >
                                                                {status}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                    ))
                                ) : (
                                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white/55">
                                        No orders yet. Once guests place orders, they will appear here.
                                    </div>
                                )}
                            </div>
                        </section>

                        <aside className="space-y-6">
                            <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#ef8d72]/15 text-[#ffd9cb]">
                                        <QrCode size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d7a27d]">
                                            QR provider
                                        </p>
                                        <h2 className="font-display text-2xl">Generate table QR</h2>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-3">
                                    <input
                                        value={tableNumber}
                                        onChange={(event) => setTableNumber(event.target.value)}
                                        className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-[#efb39d]/50"
                                        placeholder="Table number"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => void generateQr()}
                                        disabled={qrLoading}
                                        className="rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {qrLoading ? "Creating..." : "Create"}
                                    </button>
                                </div>

                                {qrAsset ? (
                                    <div className="mt-4 space-y-4">
                                        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#f6eee7] p-3">
                                            <Image
                                                src={qrAsset.dataUrl}
                                                alt={`QR for table ${qrAsset.tableNumber}`}
                                                width={320}
                                                height={320}
                                                className="h-auto w-full"
                                            />
                                        </div>

                                        <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 text-xs leading-6 text-white/55">
                                            <p className="uppercase tracking-[0.28em] text-[#d7a27d]">Signed URL</p>
                                            <p className="mt-2 break-all">{qrAsset.url}</p>
                                            <div className="mt-4 flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => void copyToClipboard()}
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75 transition-colors hover:bg-white/10 hover:text-white"
                                                >
                                                    <Copy size={14} /> Copy link
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={downloadQr}
                                                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-b from-[#ef8d72] to-[#c95c43] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                                >
                                                    <Download size={14} /> Download QR
                                                </button>
                                            </div>
                                            {copyMessage ? <p className="mt-3 text-[#ffd9cb]">{copyMessage}</p> : null}
                                        </div>
                                    </div>
                                ) : null}
                            </section>

                            <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#d7a27d]/15 text-[#ffd9cb]">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d7a27d]">
                                            Tables
                                        </p>
                                        <h2 className="font-display text-2xl">Current floor</h2>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {(dashboard?.tables ?? []).map((table) => (
                                        <div
                                            key={table.tableNumber}
                                            className="flex items-center justify-between rounded-[24px] border border-white/10 bg-white/5 px-4 py-3"
                                        >
                                            <div>
                                                <p className="font-display text-xl text-[#faf1e8]">Table {table.tableNumber}</p>
                                                <p className="text-xs uppercase tracking-[0.24em] text-white/40">
                                                    {table.orderCount} orders · {statusLabel(table.lastStatus)}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] ${table.open ? "bg-[#efb39d]/15 text-[#ffd9cb]" : "bg-white/5 text-white/45"}`}>
                                                {table.open ? "Open" : "Quiet"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="rounded-[36px] border border-white/10 bg-white/[0.04] p-5">
                                <div className="flex items-center gap-3">
                                    <div className="grid h-12 w-12 place-items-center rounded-full bg-[#efb39d]/15 text-[#ffd9cb]">
                                        <Check size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-[#d7a27d]">
                                            Recent QR links
                                        </p>
                                        <h2 className="font-display text-2xl">Panel activity</h2>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3 text-sm text-white/60">
                                    {(dashboard?.recentQrRequests ?? []).map((entry) => (
                                        <div key={entry.id} className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="font-semibold text-[#faf1e8]">Table {entry.tableNumber}</span>
                                                <span className="text-xs uppercase tracking-[0.24em] text-white/35">
                                                    {new Date(entry.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                            <p className="mt-2 break-all text-xs text-white/45">{entry.url}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </aside>
                    </div>
                </section>
            </div>
        </main>
    );
}