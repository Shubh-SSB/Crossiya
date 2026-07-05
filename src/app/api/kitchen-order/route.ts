import { NextResponse } from "next/server";
import { requiresSignedTableAccess, verifyTableToken } from "@/lib/table-auth";
import { getBackendBaseUrl } from "@/lib/admin-backend";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    if (!body?.customerName || !body?.customerPhone || !body?.tableNumber || !Array.isArray(body?.items)) {
        return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    if (requiresSignedTableAccess() && !verifyTableToken(String(body.tableNumber), String(body.tableToken ?? ""))) {
        return NextResponse.json({ error: "Invalid table token" }, { status: 403 });
    }

    try {
        const response = await fetch(`${getBackendBaseUrl()}/api/kitchen-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const payload = await response.json().catch(() => ({ error: "Invalid backend response" }));

        if (!response.ok) {
            return NextResponse.json(
                { error: payload.error || "Backend rejected the order" },
                { status: response.status },
            );
        }

        return NextResponse.json({ ok: true, order: payload.order });
    } catch (error) {
        console.error("Failed to forward order to backend:", error);
        return NextResponse.json(
            { error: "Could not reach the backend. Make sure it is running." },
            { status: 502 },
        );
    }
}