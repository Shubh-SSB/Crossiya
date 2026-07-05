import { NextResponse } from "next/server";
import { buildAdminHeaders, getBackendBaseUrl } from "@/lib/admin-backend";

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);

    if (!body?.tableNumber) {
        return NextResponse.json({ error: "tableNumber is required" }, { status: 400 });
    }

    const response = await fetch(`${getBackendBaseUrl()}/api/admin/qr/tables`, {
        method: "POST",
        headers: buildAdminHeaders(),
        body: JSON.stringify({ tableNumber: body.tableNumber }),
    });

    const payload = await response.json().catch(() => ({ error: "Invalid response" }));
    return NextResponse.json(payload, { status: response.status });
}