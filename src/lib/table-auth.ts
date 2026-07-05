import crypto from "crypto";
import { getLocalTableAccessSecret } from "@/lib/secret-store";

const TOKEN_VERSION = "v1";
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function getSecret() {
    return getLocalTableAccessSecret();
}

function buildPayload(tableNumber: string, issuedAt: number) {
    return `${TOKEN_VERSION}.${tableNumber}.${issuedAt}`;
}

export function createTableToken(tableNumber: string, issuedAt = Date.now()) {
    const secret = getSecret();

    if (!secret) {
        throw new Error("TABLE_ACCESS_SECRET is required to create signed table tokens.");
    }

    const payload = buildPayload(tableNumber, issuedAt);
    const signature = crypto.createHmac("sha256", secret).update(payload).digest("hex");

    return `${payload}.${signature}`;
}

export function verifyTableToken(tableNumber: string, token: string) {
    const secret = getSecret();

    if (!secret || !token) {
        return false;
    }

    const parts = token.split(".");
    if (parts.length !== 4) {
        return false;
    }

    const [version, tokenTable, issuedAtText, signature] = parts;
    if (version !== TOKEN_VERSION || tokenTable !== tableNumber) {
        return false;
    }

    const issuedAt = Number(issuedAtText);
    if (!Number.isFinite(issuedAt) || issuedAt <= 0) {
        return false;
    }

    if (Date.now() - issuedAt > TOKEN_TTL_MS) {
        return false;
    }

    const expected = crypto
        .createHmac("sha256", secret)
        .update(buildPayload(tableNumber, issuedAt))
        .digest("hex");

    if (signature.length !== expected.length) {
        return false;
    }

    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function requiresSignedTableAccess() {
    return process.env.NODE_ENV === "production";
}