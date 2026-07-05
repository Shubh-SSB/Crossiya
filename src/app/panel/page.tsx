import type { Metadata } from "next";
import OwnerPanel from "@/components/panel/OwnerPanel";

export const metadata: Metadata = {
    title: "Maison Crème — Owner Panel",
    description: "Owner dashboard for live orders, tables, and QR generation.",
};

export default function PanelPage() {
    return <OwnerPanel />;
}