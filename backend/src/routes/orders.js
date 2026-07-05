import { hasValidBearerToken, sendJson } from "../lib/admin-auth.js";
import { listOrders } from "../state/store.js";

export async function handleOrdersListRequest(req, res) {
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

  sendJson(res, 200, { orders: listOrders() });
}