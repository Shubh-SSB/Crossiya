"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis, { LenisOptions } from 'lenis';

// Define the context type to accept either a Lenis instance or null
type LenisContextType = Lenis | null;

const LenisContext = createContext<LenisContextType>(null);

// Custom hook to consume the Lenis instance
export const useLenis = (): LenisContextType => useContext(LenisContext);

// Interface for component props
interface SmoothScrollProps {
    children: React.ReactNode;
    options?: LenisOptions;
}

export default function SmoothScroll({ children, options = {} }: SmoothScrollProps) {
    // Use state instead of ref for context updates to ensure consumer hooks rerender when ready
    const [lenisInstance, setLenisInstance] = useState<LenisContextType>(null);

    useEffect(() => {
        // 1. Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            ...options,
        });

        setLenisInstance(lenis);

        // 2. Setup the animation loop
        let rafId: number;
        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);

        // 3. Clean up on unmount
        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
            setLenisInstance(null);
        };
        // Deep equality or dependency tracking for dynamic objects might require caution,
        // but keeping 'options' here matches your original design.
    }, [options]);

    return (
        <LenisContext.Provider value={lenisInstance}>
            {children}
        </LenisContext.Provider>
    );
}
