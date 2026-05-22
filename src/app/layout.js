import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

import "swiper/css";

import Navber from "./component/Navber";
import { Toaster } from "react-hot-toast";

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

    <html
      lang="en"
      className={`${inter.variable} ${bebas.variable} h-full scroll-smooth`}
    >
      <body className="min-h-screen bg-[#070707] font-[var(--font-inter)] text-white antialiased">
        <Navber />
        <main className="flex-1">
          {children}
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
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