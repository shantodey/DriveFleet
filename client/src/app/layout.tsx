import type { ReactNode } from "react";
import { Inter, Bebas_Neue, Geist } from "next/font/google";
import "./globals.css";

import "swiper/css";

import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

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

export default function RootLayout({ children }: { children: ReactNode }) {

  return (

    <html lang="en" suppressHydrationWarning className={cn("h-full", "scroll-smooth", inter.variable, bebas.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen bg-background font-(--font-inter) text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-1">{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "var(--popover)",
                color: "var(--popover-foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}