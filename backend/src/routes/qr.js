import { createTableQrAsset } from "../providers/qr-provider.js";
import { hasValidBearerToken, readJsonBody, sendJson } from "../lib/admin-auth.js";
import { recordQrRequest } from "../state/store.js";

export async function handleQrRequest(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  if (!hasValidBearerToken(req)) {
    sendJson(res, 401, { error: "Unauthorized" });
    return;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    sendJson(res, 400, { error: "Invalid JSON" });
    return;
  }

  const tableNumber = String(body.tableNumber ?? "").trim();
  if (!tableNumber) {
    sendJson(res, 400, { error: "tableNumber is required" });
    return;
  }

  try {
    const asset = await createTableQrAsset(tableNumber);
    recordQrRequest(asset);
    sendJson(res, 200, asset);
  } catch (error) {
    sendJson(res, 500, { error: error instanceof Error ? error.message : "Failed to create QR asset" });
  }
}
