import { addKitchenOrder } from "../state/store.js";
import { readJsonBody, sendJson } from "../lib/admin-auth.js";

export async function handleKitchenOrderRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    sendJson(res, 400, { error: "Invalid JSON" });
    return;
  }

  const customerName = String(body.customerName ?? "").trim();
  const customerPhone = String(body.customerPhone ?? "").trim();
  const tableNumber = String(body.tableNumber ?? "").trim();

  if (!customerName || !customerPhone || !tableNumber || !Array.isArray(body.items)) {
    sendJson(res, 400, { error: "customerName, customerPhone, tableNumber, and items are required" });
    return;
  }

  try {
    const order = addKitchenOrder(body);
    sendJson(res, 201, { ok: true, order });
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "Failed to create order" });
  }
}
