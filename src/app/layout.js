import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/css';


import NavbarSection from "./component/Navber";
import Navber from "./component/Navber";
import { Toaster } from "react-hot-toast";

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
         <Toaster />
        </body>
    </html>
  );
}
