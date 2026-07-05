import { getLocalAdminApiToken } from "@/lib/secret-store";

export function getBackendBaseUrl() {
    return (process.env.BACKEND_API_URL ?? "http://localhost:4000").replace(/\/$/, "");
}

export function getAdminBearerToken() {
    return getLocalAdminApiToken();
}

export function buildAdminHeaders() {
    const token = getAdminBearerToken();

    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}