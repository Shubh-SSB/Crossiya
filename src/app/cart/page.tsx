import type { Metadata } from "next";
import CartClient from "./cart-client";
import { requiresSignedTableAccess, verifyTableToken } from "@/lib/table-auth";

export const metadata: Metadata = {
    title: "Maison Crème — Cart",
    description: "Review your table order and send it to the kitchen.",
};

type CartPageProps = {
    searchParams?: Record<string, string | string[] | undefined>;
};

function firstParam(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] : value;
}

export default function CartPage({ searchParams }: CartPageProps) {
    const tableNumber = firstParam(searchParams?.table) ?? firstParam(searchParams?.tableNumber) ?? "01";
    const tableToken = firstParam(searchParams?.ticket) ?? firstParam(searchParams?.token) ?? "";
    const signedLinkRequired = requiresSignedTableAccess();
    const isValid = !signedLinkRequired || verifyTableToken(tableNumber, tableToken);

    if (!isValid) {
        return (
            <main className="min-h-screen bg-[#110a06] px-4 py-8 text-[#f7efe8] sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center text-center">
                    <div className="rounded-4xl border border-white/10 bg-white/5 p-8">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[#d7a27d]">
                            Access blocked
                        </p>
                        <h1 className="mt-4 font-display text-4xl sm:text-5xl">This table link is invalid.</h1>
                        <p className="mt-4 text-white/60">
                            Scan the signed QR code from your table. The cart does not trust plain URL edits in
                            production.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <CartClient
            tableNumber={tableNumber}
            tableToken={tableToken || null}
            signedLinkRequired={signedLinkRequired}
        />
    );
}