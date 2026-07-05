import type { StaticImageData } from "next/image";
import matchaImg from "@/assets/menu-matcha.jpg";
import croissantImg from "@/assets/menu-croissant.jpg";
import cakeImg from "@/assets/menu-cake.jpg";
import cappuccinoImg from "@/assets/menu-cappuccino.jpg";

export const menuCategories = [
    "Espresso Bar",
    "Seasonal Sips",
    "Fresh Bakes",
    "Desserts",
    "Plates",
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export type MenuDish = {
    id: string;
    name: string;
    category: MenuCategory;
    description: string;
    priceCents: number;
    image: StaticImageData;
};

export const menuCatalog: MenuDish[] = [
    {
        id: "heart-cappuccino",
        name: "Heart Cappuccino",
        category: "Espresso Bar",
        description: "Double ristretto, velvet milk, drawn by hand.",
        priceCents: 520,
        image: cappuccinoImg,
    },
    {
        id: "velvet-flat-white",
        name: "Velvet Flat White",
        category: "Espresso Bar",
        description: "Silky microfoam with a darker roast finish.",
        priceCents: 540,
        image: cappuccinoImg,
    },
    {
        id: "cinnamon-cortado",
        name: "Cinnamon Cortado",
        category: "Espresso Bar",
        description: "A short, warm shot with a soft spice finish.",
        priceCents: 480,
        image: cappuccinoImg,
    },
    {
        id: "mocha-silk",
        name: "Mocha Silk",
        category: "Espresso Bar",
        description: "Cocoa, espresso, and steamed milk in a smooth pour.",
        priceCents: 590,
        image: cakeImg,
    },
    {
        id: "garden-matcha",
        name: "Garden Matcha",
        category: "Seasonal Sips",
        description: "Stone-milled ceremonial grade with oat milk.",
        priceCents: 640,
        image: matchaImg,
    },
    {
        id: "iced-matcha-cloud",
        name: "Iced Matcha Cloud",
        category: "Seasonal Sips",
        description: "Chilled matcha topped with vanilla foam.",
        priceCents: 680,
        image: matchaImg,
    },
    {
        id: "orange-blossom-latte",
        name: "Orange Blossom Latte",
        category: "Seasonal Sips",
        description: "Floral syrup, espresso, and bright citrus notes.",
        priceCents: 620,
        image: cappuccinoImg,
    },
    {
        id: "strawberry-oat-foam",
        name: "Strawberry Oat Foam",
        category: "Seasonal Sips",
        description: "Fresh strawberry, cold espresso, and oat cream.",
        priceCents: 650,
        image: cakeImg,
    },
    {
        id: "butter-croissant",
        name: "Butter Croissant",
        category: "Fresh Bakes",
        description: "72-hour cold proof with cultured butter.",
        priceCents: 480,
        image: croissantImg,
    },
    {
        id: "almond-croissant",
        name: "Almond Croissant",
        category: "Fresh Bakes",
        description: "Frangipane filling, toasted almonds, crisp edges.",
        priceCents: 540,
        image: croissantImg,
    },
    {
        id: "morning-bun",
        name: "Morning Bun",
        category: "Fresh Bakes",
        description: "Cinnamon sugar spirals with a citrus glaze.",
        priceCents: 520,
        image: croissantImg,
    },
    {
        id: "pistachio-danish",
        name: "Pistachio Danish",
        category: "Fresh Bakes",
        description: "Flaky pastry with pistachio cream and roasted nuts.",
        priceCents: 560,
        image: croissantImg,
    },
    {
        id: "strawberry-cloud",
        name: "Strawberry Cloud",
        category: "Desserts",
        description: "Chiffon sponge, mascarpone cream, ripe berries.",
        priceCents: 700,
        image: cakeImg,
    },
    {
        id: "burnt-honey-tart",
        name: "Burnt Honey Tart",
        category: "Desserts",
        description: "Soft caramel set in a crisp shell, lightly smoked.",
        priceCents: 690,
        image: cakeImg,
    },
    {
        id: "cocoa-slice",
        name: "Cocoa Slice",
        category: "Desserts",
        description: "Dark chocolate sponge with cream and cacao dust.",
        priceCents: 720,
        image: cakeImg,
    },
    {
        id: "vanilla-mille",
        name: "Vanilla Mille",
        category: "Desserts",
        description: "Layers of vanilla pastry cream and crisp filo.",
        priceCents: 680,
        image: cakeImg,
    },
    {
        id: "burrata-toast",
        name: "Burrata Toast",
        category: "Plates",
        description: "Whipped burrata, tomatoes, herbs, and toasted bread.",
        priceCents: 840,
        image: croissantImg,
    },
    {
        id: "herbed-focaccia",
        name: "Herbed Focaccia",
        category: "Plates",
        description: "Olive oil, rosemary, and sea salt on warm focaccia.",
        priceCents: 790,
        image: croissantImg,
    },
    {
        id: "tomato-tartine",
        name: "Tomato Tartine",
        category: "Plates",
        description: "Roasted tomato, ricotta, pepper oil, and basil.",
        priceCents: 820,
        image: matchaImg,
    },
    {
        id: "mushroom-melt",
        name: "Mushroom Melt",
        category: "Plates",
        description: "Savory mushrooms, soft cheese, and toasted sourdough.",
        priceCents: 880,
        image: croissantImg,
    },
];