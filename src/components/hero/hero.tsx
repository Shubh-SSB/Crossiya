"use client";

export default function Hero() {

    return (

        <section
            className="relative h-screen w-full bg-black overflow-hidden"
        >

            <div
                className="absolute inset-0 grid grid-cols-5 gap-4 px-10 py-10"
            >

                <div className="rounded-[40px] overflow-hidden bg-neutral-800" />

                <div className="translate-y-16 rounded-[40px] overflow-hidden bg-neutral-700" />

                <div className="-translate-y-10 rounded-[40px] overflow-hidden bg-neutral-900" />

                <div className="translate-y-20 rounded-[40px] overflow-hidden bg-neutral-800" />

                <div className="-translate-y-6 rounded-[40px] overflow-hidden bg-neutral-700" />

            </div>

            <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >

                <h1
                    className="hero-title text-7xl font-black tracking-tight text-white opacity-0"
                >

                    CROSSIYA

                </h1>

                <p
                    className="mt-5 text-sm tracking-[.35em] uppercase text-neutral-300"
                >

                    Coffee, Crafted Daily.

                </p>

            </div>

        </section>

    )

}