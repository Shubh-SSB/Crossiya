import crypto from "crypto";
import fs from "fs";
import path from "path";

const secretFilePath = path.resolve(process.cwd(), "backend/.runtime/secrets.json");

type Secrets = {
    tableAccessSecret?: string;
    adminApiToken?: string;
};

function createFallbackSecret() {
    return crypto.randomBytes(32).toString("hex");
}

export function readLocalSecrets(): Secrets {
    try {
        const raw = fs.readFileSync(secretFilePath, "utf8");
        const parsed = JSON.parse(raw) as Secrets;
        return parsed;
    } catch {
        return {
            tableAccessSecret: createFallbackSecret(),
            adminApiToken: createFallbackSecret(),
        };
    }
}

export function getLocalTableAccessSecret() {
    return readLocalSecrets().tableAccessSecret ?? "";
}

export function getLocalAdminApiToken() {
    return readLocalSecrets().adminApiToken ?? "";
}