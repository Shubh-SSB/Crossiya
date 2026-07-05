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
}

export function getSecretFilePath() {
  return secretFilePath;
}