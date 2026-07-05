import crypto from "crypto";
import { loadOrCreateSecrets } from "./secret-store.js";

export function getBearerToken(authHeader) {
  if (!authHeader) {
    return "";
  }

  const [scheme, token] = authHeader.split(" ");
  if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
    return "";
  }

  return token.trim();
}

export function hasValidBearerToken(req) {
  const expectedToken = loadOrCreateSecrets().adminApiToken ?? "";

  if (!expectedToken) {
    return true;
  }

  const suppliedToken = getBearerToken(req.headers.authorization);
  if (suppliedToken.length !== expectedToken.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(suppliedToken), Buffer.from(expectedToken));
}

export function sendJson(res, statusCode, body, extraHeaders = {}) {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
    ...extraHeaders,
  });
  res.end(payload);
}

export async function readJsonBody(req) {
  let raw = "";
  for await (const chunk of req) {
    raw += chunk;
  }

  if (!raw) {
    return {};
  }

  return JSON.parse(raw);
}