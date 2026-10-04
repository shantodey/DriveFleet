import { Inter, Bebas_Neue, Geist } from "next/font/google";
import "./globals.css";

import "swiper/css";

import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "DriveFleet",
  description: "DriveFleet Car Rental Platform",
};

export default function RootLayout({ children }) {

  return (

    <html  lang="en"  className={cn("h-full", "scroll-smooth", inter.variable, bebas.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen bg-[#070707] font-[var(--font-inter)] text-white antialiased">
        <main className="flex-1">
          {children}
        </main>
        <Toaster  position="top-center"  toastOptions={{
            style: {
              background: "#111111",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />

      </body>

    </html>
  );
}