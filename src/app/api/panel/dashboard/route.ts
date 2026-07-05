import { NextResponse } from "next/server";
import { buildAdminHeaders, getBackendBaseUrl } from "@/lib/admin-backend";

export async function GET() {
    const response = await fetch(`${getBackendBaseUrl()}/api/admin/dashboard`, {
        headers: buildAdminHeaders(),
        cache: "no-store",
    });

    const payload = await response.json().catch(() => ({ error: "Invalid response" }));
    return NextResponse.json(payload, { status: response.status });
}