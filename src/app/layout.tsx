import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Alex_Brush, Poppins, Bellefair, Archivo_Narrow } from "next/font/google";
import "./globals.css";
// import "./hero.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bellefair = Bellefair({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-belle",
});

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Crossiya | Fine Dining Restaurant",
  description: "Welcome to Crossiya, where every dish tells a story and every moment feels special. Discover our exquisite menu crafted with passion and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, alexBrush.variable, poppins.variable, archivoNarrow.variable, bellefair.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
