import Image from 'next/image'
import React from 'react'
import CornerDisplay from '../corners'

export const Footer = () => {
    return (
        <footer className='bg-[#F3E8DF] text-[#0f0a05] pt-16 md:pt-24 w-full'>
            {/* Top Half */}
            <div className='flex flex-col lg:flex-row border-b border-[#0f0a05]/10'>
                {/* Left Side */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col xl:flex-row gap-8 lg:border-r border-[#0f0a05]/10">
                    <div className="relative w-full xl:w-64 h-[350px] shrink-0 rounded-sm overflow-hidden bg-neutral-200">
                        {/* Using the image provided in your stub, ensure it exists in public/images! */}
                        {/* <Image src="/images/intro.jpg" alt="Catering" fill className="object-cover" /> */}
                        <CornerDisplay />
                    </div>
                    <div className="flex flex-col justify-end max-w-sm pb-2">
                        <p className="font-archivo text-sm md:text-base leading-relaxed mb-8 font-medium">
                            Driven by a passion for cuisine and genuine hospitality, we create memorable dining experiences throughout Mexico and into the United States, spanning 16 culinary concepts.
                        </p>
                        <button className="flex items-center gap-2 font-archivo uppercase text-[11px] md:text-xs font-bold tracking-[0.15em] hover:opacity-70 transition-opacity w-fit">
                            GRUPO HUNAN
                            <span className="bg-[#0f0a05] text-[#F3E8DF] rounded-full p-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col md:flex-row justify-between gap-16 xl:gap-24">
                    {/* Navigation */}
                    <div className="flex flex-col">
                        <span className="font-archivo uppercase text-[10px] tracking-[0.25em] text-[#0f0a05]/50 mb-10">
                            Navigation
                        </span>
                        <ul className="flex flex-col gap-5 font-archivo uppercase text-xs tracking-widest font-bold">
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Events</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Menu</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Gallery</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">Location</a></li>
                            <li><a href="#" className="hover:opacity-70 transition-opacity">About</a></li>
                            <li className="pt-6 flex items-center gap-2">
                                <a href="#" className="hover:opacity-70 transition-opacity">Instagram</a>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" /></svg>
                            </li>
                            <li className="flex items-center gap-2">
                                <a href="#" className="hover:opacity-70 transition-opacity">Gift Cards</a>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M8.25 3.75H19.5a.75.75 0 01.75.75v11.25a.75.75 0 01-1.5 0V6.31L5.03 20.03a.75.75 0 01-1.06-1.06L17.69 5.25H8.25a.75.75 0 010-1.5z" clipRule="evenodd" /></svg>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col w-full max-w-[280px]">
                        <span className="font-archivo uppercase text-[10px] tracking-[0.25em] text-[#0f0a05]/50 mb-10">
                            Newsletter
                        </span>

                        <div className="flex gap-4 mb-6">
                            <div className="flex flex-col flex-1 border-b border-[#0f0a05]/20 pb-2">
                                <label className="font-archivo uppercase text-[9px] tracking-[0.2em] font-bold mb-1">Email</label>
                                <input type="email" className="bg-transparent outline-none font-archivo text-sm text-[#0f0a05]" />
                            </div>
                            <div className="flex flex-col flex-1 border-b border-[#0f0a05]/20 pb-2">
                                <label className="font-archivo uppercase text-[9px] tracking-[0.2em] font-bold mb-1">First Name</label>
                                <input type="text" className="bg-transparent outline-none font-archivo text-sm text-[#0f0a05]" />
                            </div>
                        </div>
                        <div className="flex flex-col border-b border-[#0f0a05]/20 pb-2 mb-10">
                            <label className="font-archivo uppercase text-[9px] tracking-[0.2em] font-bold mb-1">Last Name</label>
                            <input type="text" className="bg-transparent outline-none font-archivo text-sm text-[#0f0a05]" />
                        </div>

                        <button className="flex items-center gap-2 font-archivo uppercase text-[11px] md:text-xs tracking-[0.15em] font-bold hover:opacity-70 transition-opacity w-fit">
                            Subscribe
                            <span className="bg-[#0f0a05] text-[#F3E8DF] rounded-full p-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" clipRule="evenodd" />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Giant Text */}
            <div className="w-full px-6 md:px-12 py-8 flex flex-col items-center justify-center overflow-hidden">
                <h1 className="font-archivo text-[20vw] leading-[0.8] tracking-tight text-[#0f0a05] text-center uppercase w-full">
                    CROSSIYA
                </h1>

                <div className="w-full flex flex-col md:flex-row justify-between items-center mt-8 gap-4 font-archivo uppercase text-[9px] md:text-[10px] tracking-[0.2em] text-[#0f0a05]/60 font-semibold">
                    <span>CROSSIYA © GRUPO HUNAN</span>
                    <span>PRIVACY NOTICE</span>
                </div>
            </div>
        </footer>
    )
}