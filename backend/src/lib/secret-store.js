import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const runtimeDir = path.resolve(__dirname, "../../.runtime");
const secretFilePath = path.join(runtimeDir, "secrets.json");

function generateSecret() {
  return crypto.randomBytes(32).toString("hex");
}

function ensureRuntimeDir() {
  fs.mkdirSync(runtimeDir, { recursive: true });
}

export function loadOrCreateSecrets() {
  // 1. Use Environment Variables if they exist (Required for Vercel)
  if (process.env.TABLE_ACCESS_SECRET && process.env.ADMIN_API_TOKEN) {
    return {
      tableAccessSecret: process.env.TABLE_ACCESS_SECRET,
      adminApiToken: process.env.ADMIN_API_TOKEN,
    };
  }

  // 2. Try using the local file system (For local development)
  try {
    ensureRuntimeDir();

    if (fs.existsSync(secretFilePath)) {
      try {
        const raw = fs.readFileSync(secretFilePath, "utf8");
        const parsed = JSON.parse(raw);

        if (parsed.tableAccessSecret && parsed.adminApiToken) {
          return parsed;
        }
      } catch {
        // Fall through and recreate the file.
      }
    }

    const secrets = {
      tableAccessSecret: generateSecret(),
      adminApiToken: generateSecret(),
    };

    fs.writeFileSync(secretFilePath, `${JSON.stringify(secrets, null, 2)}\n`, "utf8");
    return secrets;
  } catch (error) {
    // 3. If file system is read-only (like Vercel) and env vars are missing, don't crash with 500 error.
    console.error("Warning: Could not write secrets.json (read-only filesystem). Using temporary memory secrets. Set TABLE_ACCESS_SECRET and ADMIN_API_TOKEN in Vercel environment variables to persist sessions.");
    return {
      tableAccessSecret: generateSecret(),
      adminApiToken: generateSecret(),
    };
  }
}

export function getSecretFilePath() {
  return secretFilePath;
}