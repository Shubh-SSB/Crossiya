import type { Metadata } from "next";
import KitchenPanel from "@/components/panel/KitchenPanel";

export const metadata: Metadata = {
    title: "LIA — Kitchen Display",
    description: "Kitchen order queue showing open orders for preparation.",
};

export default function KitchenPage() {
    return <KitchenPanel />;
}
