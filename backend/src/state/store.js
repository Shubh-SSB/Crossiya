import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const runtimeDir = path.resolve(__dirname, "../../.runtime");
const dbPath = path.join(runtimeDir, "cafe.db");

// ─── Initialise database ────────────────────────────────────────────────

function openDb() {
  fs.mkdirSync(runtimeDir, { recursive: true });

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS orders (
      id            TEXT PRIMARY KEY,
      table_number  TEXT NOT NULL,
      table_token   TEXT NOT NULL DEFAULT '',
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      subtotal_cents INTEGER NOT NULL DEFAULT 0,
      items         TEXT NOT NULL DEFAULT '[]',
      status        TEXT NOT NULL DEFAULT 'new',
      created_at    TEXT NOT NULL,
      updated_at    TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_orders_table  ON orders(table_number);

    CREATE TABLE IF NOT EXISTS qr_requests (
      id           TEXT PRIMARY KEY,
      table_number TEXT NOT NULL,
      url          TEXT NOT NULL,
      created_at   TEXT NOT NULL
    );
  `);

  return db;
}

const db = openDb();

// ─── Helpers ─────────────────────────────────────────────────────────────

function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function rowToOrder(row) {
  return {
    id: row.id,
    tableNumber: row.table_number,
    tableToken: row.table_token,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    subtotalCents: row.subtotal_cents,
    items: JSON.parse(row.items),
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToQr(row) {
  return {
    id: row.id,
    tableNumber: row.table_number,
    url: row.url,
    createdAt: row.created_at,
  };
}

// ─── Prepared statements ─────────────────────────────────────────────────

const stmts = {
  insertOrder: db.prepare(`
    INSERT INTO orders (id, table_number, table_token, customer_name, customer_phone, subtotal_cents, items, status, created_at, updated_at)
    VALUES (@id, @table_number, @table_token, @customer_name, @customer_phone, @subtotal_cents, @items, @status, @created_at, @updated_at)
  `),

  listOrders: db.prepare(`
    SELECT * FROM orders ORDER BY created_at DESC
  `),

  findOrder: db.prepare(`
    SELECT * FROM orders WHERE id = ?
  `),

  updateStatus: db.prepare(`
    UPDATE orders SET status = ?, updated_at = ? WHERE id = ?
  `),

  insertQr: db.prepare(`
    INSERT INTO qr_requests (id, table_number, url, created_at)
    VALUES (@id, @table_number, @url, @created_at)
  `),

  recentQr: db.prepare(`
    SELECT * FROM qr_requests ORDER BY created_at DESC LIMIT 8
  `),

  // Dashboard aggregates
  countOrders: db.prepare(`SELECT COUNT(*) as cnt FROM orders`),
  countByStatus: db.prepare(`SELECT COUNT(*) as cnt FROM orders WHERE status = ?`),
  sumRevenue: db.prepare(`SELECT COALESCE(SUM(subtotal_cents), 0) as total FROM orders`),
  uniqueTables: db.prepare(`SELECT COUNT(DISTINCT table_number) as cnt FROM orders`),
  recentOrders: db.prepare(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 8`),
  countQr: db.prepare(`SELECT COUNT(*) as cnt FROM qr_requests`),

  tableStats: db.prepare(`
    SELECT
      table_number,
      COUNT(*) as order_count,
      MAX(created_at) as last_order_at
    FROM orders
    GROUP BY table_number
    ORDER BY CAST(table_number AS INTEGER)
  `),

  latestStatusPerTable: db.prepare(`
    SELECT table_number, status
    FROM orders o1
    WHERE created_at = (SELECT MAX(created_at) FROM orders o2 WHERE o2.table_number = o1.table_number)
    GROUP BY table_number
  `),

  hasOpenByTable: db.prepare(`
    SELECT table_number, COUNT(*) as cnt
    FROM orders
    WHERE status IN ('new', 'preparing')
    GROUP BY table_number
  `),
};

// ─── Public API ──────────────────────────────────────────────────────────

export function addKitchenOrder(payload) {
  const now = new Date().toISOString();
  const id = createId("ord");

  const params = {
    id,
    table_number: String(payload.tableNumber),
    table_token: String(payload.tableToken ?? ""),
    customer_name: String(payload.customerName),
    customer_phone: String(payload.customerPhone),
    subtotal_cents: Number(payload.subtotalCents ?? 0),
    items: JSON.stringify(Array.isArray(payload.items) ? payload.items : []),
    status: "new",
    created_at: now,
    updated_at: now,
  };

  stmts.insertOrder.run(params);

  return {
    id,
    tableNumber: params.table_number,
    tableToken: params.table_token,
    customerName: params.customer_name,
    customerPhone: params.customer_phone,
    subtotalCents: params.subtotal_cents,
    items: JSON.parse(params.items),
    status: params.status,
    createdAt: params.created_at,
    updatedAt: params.updated_at,
  };
}

export function listOrders() {
  return stmts.listOrders.all().map(rowToOrder);
}

export function updateOrderStatus(orderId, status) {
  const row = stmts.findOrder.get(orderId);
  if (!row) return null;

  const now = new Date().toISOString();
  stmts.updateStatus.run(status, now, orderId);

  return rowToOrder({ ...row, status, updated_at: now });
}

export function recordQrRequest(asset) {
  stmts.insertQr.run({
    id: createId("qr"),
    table_number: asset.tableNumber,
    url: asset.url,
    created_at: new Date().toISOString(),
  });
}

export function getDashboardSnapshot() {
  const totalOrders = stmts.countOrders.get().cnt;
  const openOrders = stmts.countByStatus.get("new").cnt + stmts.countByStatus.get("preparing").cnt;
  const readyOrders = stmts.countByStatus.get("ready").cnt;
  const servedOrders = stmts.countByStatus.get("served").cnt;
  const activeTables = stmts.uniqueTables.get().cnt;
  const revenueCents = stmts.sumRevenue.get().total;
  const qrRequestCount = stmts.countQr.get().cnt;

  const recentOrders = stmts.recentOrders.all().map(rowToOrder);
  const recentQrRequests = stmts.recentQr.all().map(rowToQr);

  // Build table stats
  const tableRows = stmts.tableStats.all();
  const latestStatus = new Map(stmts.latestStatusPerTable.all().map((r) => [r.table_number, r.status]));
  const openByTable = new Map(stmts.hasOpenByTable.all().map((r) => [r.table_number, r.cnt > 0]));

  const tables = tableRows.map((row) => ({
    tableNumber: row.table_number,
    orderCount: row.order_count,
    lastStatus: latestStatus.get(row.table_number) ?? "new",
    lastOrderAt: row.last_order_at,
    open: openByTable.get(row.table_number) ?? false,
  }));

  return {
    summary: {
      totalOrders,
      openOrders,
      readyOrders,
      servedOrders,
      activeTables,
      revenueCents,
      qrRequests: qrRequestCount,
    },
    recentOrders,
    tables,
    recentQrRequests,
  };
}