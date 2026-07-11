"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Navbtn from "./navbtn";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent scrolling when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${scrolled
                ? "mt-0 px-0"
                : "mt-4 px-3 sm:px-6"
                }`}
        >
            <nav
                className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${scrolled
                    ? "max-w-full rounded-none bg-black/60 backdrop-blur-xl px-6 sm:px-10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)] border-b border-white/[0.06]"
                    : "max-w-7xl rounded-[0.5em] bg-black/25 backdrop-blur-sm px-4 sm:px-6 py-2.5 shadow-sm"
                    }`}
            >
                {/* Logo */}
                <h1
                    className={`font-belle tracking-wider text-[#FFEED6] transition-all duration-500 ${scrolled ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl"
                        }`}
                >
                    Crossiya
                </h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 lg:gap-10">
                    <a
                        href="#about"
                        className="relative text-[#FFEED6]/80 hover:text-white font-poppins tracking-widest text-sm lg:text-base transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FFEED6] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        About
                    </a>

                    <a
                        href="#story"
                        className="relative text-[#FFEED6]/80 hover:text-white font-poppins tracking-widest text-sm lg:text-base transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-[#FFEED6] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Story
                    </a>

                    <button className="text-[#FFEED6]/80 hover:text-white transition-colors duration-300">
                        <Menu size={22} />
                    </button>

                    <Navbtn />
                </div>

                {/* Mobile Nav */}
                <div className="flex md:hidden items-center gap-3">
                    <div className="scale-90 origin-right">
                        <Navbtn />
                    </div>

                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="text-[#FFEED6] hover:text-white transition-colors duration-300"
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-[#0f0a05] z-50 flex flex-col transition-transform duration-500 ease-in-out ${
                    mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/10">
                    <h1 className="font-belle text-3xl tracking-wider text-[#FFEED6]">
                        Crossiya
                    </h1>
                    <button 
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-[#FFEED6] hover:text-white transition-colors"
                    >
                        <X size={32} strokeWidth={1.5} />
                    </button>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 gap-10">
                    <a 
                        href="#about" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-archivo text-2xl tracking-[0.2em] uppercase text-[#FFEED6] hover:text-white transition-colors"
                    >
                        About
                    </a>
                    <a 
                        href="#story" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-archivo text-2xl tracking-[0.2em] uppercase text-[#FFEED6] hover:text-white transition-colors"
                    >
                        Story
                    </a>
                    <a 
                        href="#menu" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-archivo text-2xl tracking-[0.2em] uppercase text-[#FFEED6] hover:text-white transition-colors"
                    >
                        Menu
                    </a>
                    <a 
                        href="#location" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="font-archivo text-2xl tracking-[0.2em] uppercase text-[#FFEED6] hover:text-white transition-colors"
                    >
                        Location
                    </a>
                </div>
                <div className="p-8 text-center border-t border-white/10">
                    <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-[#FFEED6]/60">
                        Crossiya © Grupo Hunan
                    </p>
                </div>
            </div>
        </header>
    );
}