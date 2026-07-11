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
            <SmoothScroll options={{ lerp: 0.2 }}>
                <section className="">
                    <div className="relative min-h-screen w-full overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 h-full w-full object-cover"
                        >
                            <source src="/videos/crossiya-hero.mp4" type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 w-full h-full bg-black/20"></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-l from-black/80 to-transparent"></div>
                        <Navbar />
                        <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-12 lg:px-20 pointer-events-none">
                            <p className="max-w-7xl text-center font-archivo font-semibold capitalize leading-[1.05] tracking-tight text-white drop-shadow-lg text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-[7rem]">
                                Even the <span className="font-belle text-[#FFEED6] tracking-normal">MOON</span> has imperfection,
                                <br />
                                But our <span className="font-belle text-[#FFEED6] tracking-normal">FOOD</span> doesn't.
                            </p>
                        </div>
                    </div >
                </section>
                <section className="relative min-h-screen w-full overflow-hidden">
                    <Image
                        src="/images/intro.jpg"
                        alt="Intro Background"
                        fill
                        priority
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 flex items-start justify-start bg-black/40 px-5 sm:px-8 md:px-12 lg:px-20 pt-24 sm:pt-28 md:pt-24 lg:pt-28">
                        <h1 className="uppercase font-archivo font-bold text-white drop-shadow-xl leading-[0.95] tracking-tight max-w-5xl text-[2.8rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] 2xl:text-[7rem]">At Crossiya,<br /> Every <span className="font-belle text-[#FFEED6]">Cup</span><br /> has a story.</h1>
                    </div>
                    <div className="absolute bottom-8 left-5 right-5 sm:left-8 sm:right-8 md:left-auto md:right-12 lg:right-20 w-auto max-w-sm md:max-w-md lg:max-w-lg">
                        <p className="font-archivo text-white text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-lg">
                            Every cup, every bite, every visit. Crossiya is a place where exceptional coffee, fresh cuisine, and inviting ambiance come together effortlessly.
                        </p>
                    </div>
                    {/* Content (z-10) goes here */}
                </section>
                <section className="relative flex min-h-screen w-full flex-col bg-[#0f0a05] lg:flex-row">
                    {/* Image Section: Top on mobile, Left on PC */}
                    <div className="relative h-[45vh] w-full overflow-hidden sm:h-[55vh] md:h-[60vh] lg:min-h-screen lg:w-1/2">
                        <Image
                            src="/images/menu-coffee.jpeg"
                            alt="Menu Background"
                            fill
                            priority
                            className="object-cover object-center"
                        />
                        {/* Dark overlay for the image */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>

                    {/* Content Section: Bottom on mobile, Right on PC */}
                    <div className="relative flex w-full flex-col justify-between bg-[#0f0a05] px-6 py-12 sm:px-8 sm:py-16 md:px-12 lg:min-h-screen lg:w-1/2 lg:px-16 lg:py-20 xl:px-24">
                        {/* Top: Title */}
                        <div className="w-full">
                            <span className="font-archivo uppercase text-xs tracking-[0.2em] text-white drop-shadow-lg sm:text-sm md:text-base lg:text-lg">Our Menu</span>
                            <h2 className="font-archivo text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-[#FFEED6] drop-shadow-lg sm:text-5xl md:text-6xl xl:text-7xl">
                                Authenticity<br /> Promise,<br /> As always.
                            </h2>
                        </div>

                        {/* Bottom: Text & Button */}
                        <div className="w-full mt-8 md:mt-0">
                            <p className="mb-10 max-w-lg font-archivo text-base leading-8 text-white drop-shadow-lg sm:text-lg lg:text-xl">
                                Indulge in a symphony of flavors with our thoughtfully curated menu. Every sip, every bite, is a testament to our commitment to excellence.
                            </p>

                            <button className="flex items-center gap-2 font-archivo text-sm font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-[#FFEED6] sm:text-base">
                                View Full Menu
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
                <section className="w-full bg-[#F3E8DF] py-16 sm:py-20 lg:py-28">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 sm:px-8 lg:flex-row lg:justify-between lg:px-12 xl:px-16">
                        {/* Left label */}
                        <span className="shrink-0 pt-1 font-archivo text-xs uppercase tracking-[0.25em] text-[#3d2c1e] sm:text-sm">
                            Our Space
                        </span>

                        {/* Right content block */}
                        <div className="w-full max-w-4xl">
                            <h2 className="mb-8 font-archivo text-4xl font-semibold uppercase leading-[1.05] tracking-tight text-[#1a1210] sm:text-5xl lg:mb-12 lg:text-6xl xl:text-7xl">
                                Where Every Corner<br className="hidden md:block" /> Tells a Story. Discover<br className="hidden md:block" /> Crossiya In Person
                            </h2>

                            <p className="mb-10 max-w-lg font-archivo text-base leading-8 text-[#5a4636] sm:text-lg">
                                Around the table, Crossiya comes to life. Good company, crafted brews, and moments that linger.
                            </p>

                            <button className="flex items-center gap-2 my-4 font-archivo text-sm font-semibold uppercase tracking-[0.2em] text-[#1a1210] transition-colors hover:text-[#875333] sm:text-base">
                                Explore Gallery
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-10">
                        <PerspectiveCarousel
                            items={items}
                            defaultActiveIndex={2}
                            slideWidth={450}
                            slideHeight={520}
                            autoPlay
                            autoPlayInterval={4000}
                            className="h-[360px] sm:h-[450px] md:h-[520px] lg:h-[620px] text-neutral-800"
                        />
                    </div>
                </section>
                <section className="relative overflow-hidden bg-[#0f0a05] py-12 sm:py-16 lg:min-h-screen lg:py-0">
                    <div className="mx-auto flex min-h-screen w-full max-w-[1700px] flex-col lg:flex-row">

                        {/* Left label — absolutely positioned on desktop */}
                        <span className="hidden lg:block absolute left-6 lg:left-10 top-26 font-archivo uppercase text-xs tracking-[0.25em] text-[#FFEED6]/60 [writing-mode:vertical-lr] rotate-180">
                            About
                        </span>

                        {/* Image column */}
                        <div className="relative h-[50vh] w-full overflow-hidden sm:h-[60vh] lg:ml-16 lg:min-h-screen lg:w-[42%] xl:ml-20">
                            <CornerDisplay />

                        </div>

                        {/* Content column */}
                        <div className="flex flex-1 flex-col max-w-2xl justify-between px-6 py-12 sm:px-8 md:px-12 lg:px-16 lg:py-20 xl:px-24">
                            {/* Mobile label */}
                            <span className="md:hidden font-archivo uppercase text-xs tracking-[0.25em] text-[#FFEED6]/60 mb-6">
                                About
                            </span>

                            {/* Heading */}
                            <h2 className="font-archivo uppercase text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-[#FFEED6] mb-auto">
                                Hospitality<br />
                                That Feels<br />
                                Natural
                            </h2>

                            {/* Bottom: text + CTA */}
                            <div className="mt-12 md:mt-0">
                                <p className="font-archivo text-base sm:text-lg leading-8 text-white/60 max-w-sm mb-8">
                                    Crossiya is part of a new wave of dining. A place focused on thoughtful hospitality, where every detail responds to its context and the way people come together.
                                </p>

                                <button className="flex items-center gap-2 font-archivo uppercase text-sm sm:text-base font-bold tracking-[0.15em] text-[#FFEED6] hover:text-white transition-colors">
                                    About Crossiya
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="relative flex min-h-screen w-full items-end justify-center overflow-hidden px-5 pt-20 pb-5 sm:px-8 lg:px-12 lg:pb-12">
                    <video
                        src="/videos/cafe-shot.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    {/* Dark overlay for better contrast behind the card */}
                    <div className="absolute inset-0 bg-black/35 z-10" />

                    {/* Contact Card */}
                    <div className="relative z-20 flex w-full max-w-sm flex-col justify-between rounded-2xl bg-[#839785] p-6 sm:max-w-xl sm:p-8 md:max-w-2xl md:p-10 lg:max-w-4xl lg:rounded-xl lg:p-16 transition-all duration-500 hover:-translate-y-2">
                        {/* Top Left */}
                        <div className="text-white font-archivo uppercase text-[11px] sm:text-xs md:text-sm tracking-[0.2em] font-medium">
                            Contact and Location
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between transition-all duration-500 hover:-translate-y-2">
                            {/* Bottom Left Heading */}
                            <h2 className="text-white font-archivo uppercase text-2xl sm:text-3xl lg:text-4xl leading-[1.1] tracking-wider">
                                A Meeting Point,<br />
                                Naturally
                            </h2>

                            {/* Bottom Right Info */}
                            <div className="text-white font-archivo text-[10px] md:text-xs tracking-[0.2em] uppercase space-y-5 lg:pb-2">
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