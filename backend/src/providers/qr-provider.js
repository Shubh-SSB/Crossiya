import QRCode from "qrcode";
import { createTableToken } from "../lib/table-token.js";

function getCafeBaseUrl() {
  return (process.env.CAFE_WEB_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function buildTableCartUrl(tableNumber) {
  const ticket = createTableToken(tableNumber);
  const baseUrl = getCafeBaseUrl();

  return {
    tableNumber,
    ticket,
    url: `${baseUrl}/cart?table=${encodeURIComponent(tableNumber)}&ticket=${encodeURIComponent(ticket)}`,
  };
}

export async function createTableQrAsset(tableNumber) {
  const link = buildTableCartUrl(tableNumber);
  const svg = await QRCode.toString(link.url, {
    type: "svg",
    errorCorrectionLevel: "H",
    margin: 1,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  const pngDataUrl = await QRCode.toDataURL(link.url, {
    errorCorrectionLevel: "H",
    margin: 1,
    width: 1024,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  return {
    ...link,
    svg,
    dataUrl: `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`,
    pngDataUrl,
  };
}
