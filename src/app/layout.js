import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NavbarSection from "./component/Navber";
import Navber from "./component/Navber";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DriveFleet",
  description: "DriveFleet Car Rental Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navber/>
        {children}
        </body>
    </html>
  );
}
