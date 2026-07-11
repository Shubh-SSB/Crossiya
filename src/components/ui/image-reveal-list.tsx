"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Plus, ShoppingCart, Check } from "lucide-react";
import type { MenuDish } from "@/lib/menu-data";
import { addToCart } from "@/lib/cart";

export interface ImageRevealListItem {
  id: string;
  title: string;
  price?: string;
  image: string;
  number: string;
  href?: string;
  /** The original MenuDish object for cart integration */
  dish?: MenuDish;
}

export interface ImageRevealListProps {
  items: ImageRevealListItem[];
  className?: string;
  /** Max items per column before wrapping to the next column */
  maxPerColumn?: number;
}

export function ImageRevealList({ items, className }: ImageRevealListProps) {

  // Track recently-added item for brief check animation
  const [addedId, setAddedId] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const handleAdd = (item: ImageRevealListItem) => {
    if (item.dish) {
      addToCart(item.dish);
    }
    setAddedId(item.id);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setAddedId(null), 1200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      <ul className="list-none grid gap-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {items.map((item) => {
          const justAdded = addedId === item.id;

          return (
            <li key={item.id} className="relative">
              <div className="group relative flex items-center gap-3 py-4 px-4 text-white text-[14px] font-medium rounded-lg transition-all duration-300 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.07] hover:border-white/[0.12] hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
                {/* Image reveal on hover */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute -left-[100px] top-1/2 -translate-y-1/2 scale-90 w-[85px] h-[115px] rounded-md object-cover shadow-2xl opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:-left-[95px]"
                />

                {/* Number */}
                <span className="text-[#FFEED6]/30 group-hover:text-[#FFEED6]/60 text-xs font-mono shrink-0 transition-colors duration-300">
                  {item.number}
                </span>

                {/* Title + Price */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-archivo tracking-wide text-white/90 group-hover:text-white transition-colors duration-300 truncate">
                    {item.title}
                  </span>
                  {item.price && (
                    <span className="text-xs text-[#FFEED6]/70 font-semibold mt-0.5">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Add to Cart button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAdd(item);
                  }}
                  className={cn(
                    "relative ml-auto shrink-0 flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-8 h-8",
                    justAdded
                      ? "bg-emerald-500 text-white"
                      : "bg-white/[0.08] text-white/80 hover:scale-105 group-hover:w-24 group-hover:rounded-md group-hover:bg-[#FFEED6] group-hover:text-[#0f0a05]"
                  )}
                >
                  {justAdded ? (
                    <Check size={16} strokeWidth={2.5} className="animate-[scale-in_0.3s_ease-out]" />
                  ) : (
                    <>
                      <Plus
                        size={15}
                        strokeWidth={2}
                        className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:scale-50"
                      />
                      <span className="flex items-center gap-1.5 opacity-0 scale-75 transition-all duration-300 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap group-hover:opacity-100 group-hover:scale-100">
                        <ShoppingCart size={13} strokeWidth={2.5} />
                        Add
                      </span>
                    </>
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ImageRevealList;
