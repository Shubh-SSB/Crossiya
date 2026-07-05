import herobg from "@/assets/cup.png";
import FeaturesStrip from "./FeaturesStrip";
import Image from "next/image";

export default function Section() {
    return (
        <>
            <section
                id="top"
                className="relative isolate min-h-screen mx-6 mt-10 rounded-lg overflow-hidden bg-[#0f0a05] text-[#f7efe8]"
            >
                {/* <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,212,170,0.16),transparent_30%),radial-gradient(circle_at_18%_18%,rgba(192,133,82,0.12),transparent_28%),radial-gradient(circle_at_82%_28%,rgba(255,255,255,0.05),transparent_26%),linear-gradient(180deg,rgba(11,6,4,0.86)_0%,rgba(11,6,4,0.98)_100%)]"
                /> */}
                <div className="relative z-10 font-extralight font-poppins my-10 gap-10 flex min-h-screen w-full flex-col items-center justify-center">
                    <div className="flex flex-row"><div className="text-9xl mx-5">
                        <h1>Every Cup</h1>
                    </div>
                        <div className="text-9xl mx-5">
                            <h1>Has A
                                <span className="text-[#F2EAD3] mx-8">
                                    Story.</span>
                            </h1>
                        </div></div>
                    <p className="text-[#F2EAD3] w-[50rem] text-center">
                        A warm neighborhood café serving handcrafted espresso, matcha, and delicate pastries. Perfect for slow mornings and cozy afternoons.</p>
                    <div className="flex items-center gap-10 mt-5">
                        <button className="skeu-btn skeu-btn-hover text-lg font-bold tracking-[0.2em] sm:text-sm px-5 py-3">Explore Menu </button>
                        <button className="skeu-btn skeu-btn-hover text-lg font-bold tracking-[0.2em] sm:text-sm px-5 py-3">Order Now</button>
                    </div>
                </div>
            </section>
            {/* <FeaturesStrip /> */}
        </>
    );
}
