import { NextResponse } from "next/server";
import { buildAdminHeaders, getBackendBaseUrl } from "@/lib/admin-backend";

type RouteParams = {
    params: Promise<{ orderId: string }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
    const { orderId } = await params;
    const body = await request.json().catch(() => null);

    if (!body?.status) {
        return NextResponse.json({ error: "status is required" }, { status: 400 });
    }

    const response = await fetch(`${getBackendBaseUrl()}/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: buildAdminHeaders(),
        body: JSON.stringify({ status: body.status }),
    });

    const payload = await response.json().catch(() => ({ error: "Invalid response" }));
    return NextResponse.json(payload, { status: response.status });
}