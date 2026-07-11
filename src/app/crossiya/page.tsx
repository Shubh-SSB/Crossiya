import SmoothScroll from "@/components/scroll";
import Navbar from "@/components/ui/navbar";
// import { David_Libre } from "next/font/google";
import Image from "next/image";
import { PerspectiveCarousel } from "@/components/ui/perspective-carousel"
import CornerDisplay from "@/components/corners";
import { Footer } from "@/components/ui/footer";


const items = [
    { src: "/images/cafe1.jpg", title: "urban exploration" },
    { src: "/images/cafe2.jpg", title: "night scene" },
    { src: "/images/cafe3.jpg", title: "yellow wildflowers" },
    { src: "/images/cafe4.jpeg", title: "street with mount fuji" },
]

export default function CrossiyaPage() {
    return (
        <>
            <SmoothScroll options={{ lerp: 0.1 }}>
                <section className="">
                    <div className="relative h-screen w-full pt-6">
                        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                            <source src="/videos/crossiya-hero.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 w-full h-full bg-black/20"></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-black/80 to-transparent"></div>
                        <Navbar />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <p className="text-white text-5xl md:text-7xl font-archivo font-semibold capitalize tracking-wide text-center drop-shadow-lg">
                                Even the <span className="font-belle text-[#FFEED6]">MOON</span> has imperfection,
                                <br />
                                But our <span className="font-belle text-[#FFEED6]">FOOD</span> doesn't.
                            </p>
                        </div>
                    </div >
                </section>
                <section className="relative h-screen w-full">

                    <Image
                        src="/images/intro.jpg"
                        alt="Intro Background"
                        fill
                        priority
                        className="object-cover z-0"
                    />
                    <div className="absolute flex items-start justify-start pt-24 md:pt-20 px-4 pb-4 w-full h-full bg-black/40">
                        <h1 className="uppercase text-white font-archivo font-bold text-5xl md:text-[92px] tracking-wide text-left drop-shadow-lg">At Crossiya,<br /> Every <span className="font-belle text-[#FFEED6]">Cup</span><br /> has a story.</h1>
                    </div>
                    <div className="absolute bottom-0 right-0 pr-4 p-4 md:w-1/2 max-w-md w-full h-fit">
                        <p className="text-white font-archivo text-sm md:text-[20px] tracking-normal leading-snug text-left drop-shadow-lg">
                            Every cup, every bite, every visit. Crossiya is a place where exceptional coffee, fresh cuisine, and inviting ambiance come together effortlessly.
                        </p>
                    </div>
                    {/* Content (z-10) goes here */}
                </section>
                <section className="relative min-h-screen w-full flex flex-col md:flex-row">
                    {/* Image Section: Top on mobile, Left on PC */}
                    <div className="relative w-full h-[50vh] md:h-screen md:w-1/2 overflow-hidden">
                        <Image
                            src="/images/menu-coffee.jpeg"
                            alt="Menu Background"
                            fill
                            priority
                            className="object-cover"
                        />
                        {/* Dark overlay for the image */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Content Section: Bottom on mobile, Right on PC */}
                    <div className="relative w-full h-[50vh] md:h-screen md:w-1/2 bg-[#0f0a05] flex flex-col items-start justify-between p-8 md:p-16">
                        {/* Top: Title */}
                        <div className="w-full">
                            <span className="font-archivo text-white uppercase text-sm md:text-xl tracking-wider leading-snug drop-shadow-lg">Our Menu</span>
                            <h2 className="uppercase text-[#FFEED6] font-archivo text-4xl md:text-6xl tracking-widest leading-snug drop-shadow-lg">
                                Authenticity<br /> Promise,<br /> As always.
                            </h2>
                        </div>

                        {/* Bottom: Text & Button */}
                        <div className="w-full mt-8 md:mt-0">
                            <p className="text-white font-archivo text-sm md:text-lg tracking-normal leading-relaxed text-left drop-shadow-lg mb-8 max-w-md">
                                Indulge in a symphony of flavors with our thoughtfully curated menu. Every sip, every bite, is a testament to our commitment to excellence.
                            </p>

                            <button className="flex items-center gap-2 text-white font-archivo tracking-widest uppercase text-sm font-bold hover:text-[#FFEED6] transition-colors">
                                View Full Menu
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="w-full min-h-screen bg-[#F3E8DF] mb-28">
                    <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 px-6 md:px-16 pt-20 md:pt-28 pb-10">
                        {/* Left label */}
                        <span className="font-archivo uppercase text-xs md:text-sm tracking-[0.25em] text-[#3d2c1e] shrink-0 pt-2">
                            Our Space
                        </span>

                        {/* Right content block */}
                        <div className="max-w-3xl">
                            <h2 className="font-archivo uppercase text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.15] tracking-wide text-[#1a1210] mb-8 md:mb-12">
                                Where Every Corner<br className="hidden md:block" /> Tells a Story. Discover<br className="hidden md:block" /> Crossiya In Person
                            </h2>

                            <p className="font-archivo text-sm md:text-base leading-relaxed text-[#5a4636] max-w-sm mb-8">
                                Around the table, Crossiya comes to life. Good company, crafted brews, and moments that linger.
                            </p>

                            <button className="flex items-center gap-2 font-archivo uppercase text-sm font-bold tracking-[0.15em] text-[#1a1210] hover:text-[#875333] transition-colors">
                                Explore Gallery
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <PerspectiveCarousel
                            items={items}
                            defaultActiveIndex={2}
                            slideWidth={450}
                            slideHeight={520}
                            autoPlay
                            autoPlayInterval={4000}
                            className="h-[620px] text-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
                        />
                    </div>
                </section>
                <section className="min-h-screen bg-[#0f0a05] relative py-2">
                    <div className="flex flex-col md:flex-row min-h-screen">

                        {/* Left label — absolutely positioned on desktop */}
                        <span className="hidden md:block absolute left-6 lg:left-10 top-26 font-archivo uppercase text-xs tracking-[0.25em] text-[#FFEED6]/60 [writing-mode:vertical-lr] rotate-180">
                            About
                        </span>

                        {/* Image column */}
                        <div className="relative w-full md:w-[42%] h-[60vh] md:h-auto md:min-h-screen overflow-hidden md:ml-14 lg:ml-20">
                            <CornerDisplay />

                        </div>

                        {/* Content column */}
                        <div className="flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-20 py-12 md:py-16">
                            {/* Mobile label */}
                            <span className="md:hidden font-archivo uppercase text-xs tracking-[0.25em] text-[#FFEED6]/60 mb-6">
                                About
                            </span>

                            {/* Heading */}
                            <h2 className="font-archivo uppercase text-4xl md:text-5xl lg:text-[4rem] leading-[1.1] tracking-wide text-[#FFEED6] mb-auto">
                                Hospitality<br />
                                That Feels<br />
                                Natural
                            </h2>

                            {/* Bottom: text + CTA */}
                            <div className="mt-12 md:mt-0">
                                <p className="font-archivo text-sm md:text-base leading-relaxed text-white/60 max-w-sm mb-8">
                                    Crossiya is part of a new wave of dining. A place focused on thoughtful hospitality, where every detail responds to its context and the way people come together.
                                </p>

                                <button className="flex items-center gap-2 font-archivo uppercase text-sm font-bold tracking-[0.15em] text-[#FFEED6] hover:text-white transition-colors">
                                    About Crossiya
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="h-screen relative w-full overflow-hidden flex items-end justify-center px-4 md:px-12 pb-0 md:pb-12 pt-24">
                    <video
                        src="/videos/cafe-shot.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    />

                    {/* Dark overlay for better contrast behind the card */}
                    <div className="absolute inset-0 bg-black/20 z-10" />

                    {/* Contact Card */}
                    <div className="relative z-20 w-full max-w-2xl bg-[#839785] rounded-t-[0.5em] md:rounded-[0.5em] p-8 md:p-12 lg:p-16 flex flex-col justify-between">
                        {/* Top Left */}
                        <div className="text-white font-archivo uppercase text-xs md:text-sm tracking-[0.2em] font-medium">
                            Contact and Location
                        </div>

                        {/* Bottom Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10 mt-auto">
                            {/* Bottom Left Heading */}
                            <h2 className="text-white font-archivo uppercase text-lg md:text-xl lg:text-2xl leading-[1.1] tracking-wider">
                                A Meeting Point,<br />
                                Naturally
                            </h2>

                            {/* Bottom Right Info */}
                            <div className="text-white font-archivo text-[10px] md:text-xs tracking-[0.2em] uppercase space-y-6 lg:pb-2">
                                <p>
                                    Hours 5:00 PM – 11:00 PM
                                </p>
                                <p>
                                    Weekends 12:00 PM – 4:00 PM<br />
                                    Phone +52 624 105 6635
                                </p>
                                <p>
                                    Camino Cabo Este, San José<br />
                                    Del Cabo 23403 México
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <Footer />
                </section>
            </SmoothScroll>
        </>
    );
}