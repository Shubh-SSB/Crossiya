import http from "http";
import { handleQrRequest } from "./routes/qr.js";
import { handleDashboardRequest, handleOrdersRequest } from "./routes/dashboard.js";
import { handleOrdersListRequest } from "./routes/orders.js";
import { handleKitchenOrderRequest } from "./routes/kitchen-order.js";

const port = Number(process.env.PORT ?? 4000);

const server = http.createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  const url = new URL(req.url, `http://localhost:${port}`);

  if (req.url === "/api/qr/tables") {
    await handleQrRequest(req, res);
    return;
  }

  if (url.pathname === "/api/admin/qr/tables") {
    await handleQrRequest(req, res);
    return;
  }

  if (url.pathname === "/api/admin/dashboard") {
    await handleDashboardRequest(req, res);
    return;
  }

  if (url.pathname === "/api/admin/orders") {
    await handleOrdersListRequest(req, res);
    return;
  }

  if (url.pathname.startsWith("/api/admin/orders/")) {
    const orderId = url.pathname.replace("/api/admin/orders/", "");
    await handleOrdersRequest(req, res, orderId);
    return;
  }

  if (url.pathname === "/api/kitchen-order") {
    await handleKitchenOrderRequest(req, res);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(port, () => {
  console.log(`Maison Crème backend listening on http://localhost:${port}`);
});