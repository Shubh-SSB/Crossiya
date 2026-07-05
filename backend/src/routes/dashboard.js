import { hasValidBearerToken, readJsonBody, sendJson } from "../lib/admin-auth.js";
import { getDashboardSnapshot, updateOrderStatus } from "../state/store.js";

export async function handleDashboardRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!hasValidBearerToken(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  sendJson(res, 200, getDashboardSnapshot());
}

export async function handleOrdersRequest(req, res, orderId) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (!hasValidBearerToken(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  if (req.method !== "PATCH") {
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

  const nextStatus = String(body.status ?? "").trim();
  if (!nextStatus) {
    sendJson(res, 400, { error: "status is required" });
    return;
  }

  const updated = updateOrderStatus(orderId, nextStatus);
  if (!updated) {
    sendJson(res, 404, { error: "Order not found" });
    return;
  }

  sendJson(res, 200, { order: updated });
}