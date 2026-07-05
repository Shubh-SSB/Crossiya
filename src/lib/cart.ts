import type { MenuDish } from "./menu-data";

export type CartItem = {
    id: string;
    name: string;
    category: MenuDish["category"];
    priceCents: number;
    imageSrc: string;
    quantity: number;
};

const CART_KEY = "maison-creme-cart";
export const CART_EVENT = "maison-creme-cart-updated";

export function formatCurrency(cents: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(cents / 100);
}

export function loadCart(): CartItem[] {
    if (typeof window === "undefined") {
        return [];
    }

    try {
        const raw = window.localStorage.getItem(CART_KEY);
        return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
        return [];
    }
}

function saveCart(items: CartItem[]) {
    if (typeof window === "undefined") {
        return;
    }

    window.localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item: MenuDish) {
    const cart = loadCart();
    const existing = cart.find((entry) => entry.id === item.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            category: item.category,
            priceCents: item.priceCents,
            imageSrc: item.image.src,
            quantity: 1,
        });
    }

    saveCart(cart);
}

export function updateCartQuantity(itemId: string, quantity: number) {
    const cart = loadCart()
        .map((item) => (item.id === itemId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);

    saveCart(cart);
}

export function removeFromCart(itemId: string) {
    saveCart(loadCart().filter((item) => item.id !== itemId));
}

export function clearCart() {
    saveCart([]);
}

export function cartSubtotal(items: CartItem[]) {
    return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}