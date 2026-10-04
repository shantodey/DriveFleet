import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/Logo.png";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaFacebookF className="w-4 h-4" />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <FaXTwitter className="w-4 h-4" />,
      href: "https://x.com",
      label: "X",
    },
    {
      icon: <FaLinkedinIn className="w-4 h-4" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <FaInstagram className="w-4 h-4" />,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ];

  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/addcar" },
    { name: "My Bookings", href: "/mybookings" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0B] border-t border-white/10 text-white">
      {/* Background Glow Effect */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src={logo}
                alt="Luxora Logo"
                width={160}
                height={50}
                className="object-contain w-auto h-10 sm:h-12"
                priority
              />
            </Link>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-white/60 max-w-sm">
              Experience elite luxury car rentals in Dhaka with world-class
              service, transparent pricing, and a handpicked fleet of exotic
              vehicles.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] text-white/70 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A96B] hover:bg-[#C8A96B] hover:text-black hover:shadow-[0_0_20px_rgba(200,169,107,0.3)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="sm:pl-4 lg:pl-8">
            <p className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96B]">
              Navigation
            </p>

            <ul className="space-y-3.5 sm:space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm sm:text-base text-white/60 transition-all duration-300 hover:translate-x-1 hover:text-[#C8A96B]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#C8A96B]">
              Contact
            </p>

            <div className="space-y-4 sm:space-y-5">
              {/* Email */}
              <div className="flex items-center sm:items-start gap-4">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] text-[#C8A96B]">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Email Address</p>
                  <a href="mailto:support@luxora.com" className="mt-0.5 block text-sm sm:text-base text-white/80 hover:text-[#C8A96B] transition-colors">
                    support@luxora.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center sm:items-start gap-4">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] text-[#C8A96B]">
                  <FaPhoneAlt className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider">Phone Number</p>
                  <a href="tel:+8801234567890" className="mt-0.5 block text-sm sm:text-base text-white/80 hover:text-[#C8A96B] transition-colors">
                    +880 1234-567890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Promo Box */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="rounded-2xl sm:rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 sm:p-7 backdrop-blur-2xl relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#C8A96B]/10 blur-2xl group-hover:bg-[#C8A96B]/20 transition-all duration-500" />
              
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C8A96B]">
                Premium Experience
              </p>

              <h3 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-white">
                Drive Luxury <br className="hidden sm:inline" />
                Without Limits.
              </h3>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-white/55">
                Explore elite exotic cars designed for unforgettable journeys across Dhaka and beyond.
              </p>

              <Link
                href="/explore-cars"
                className="mt-6 inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#C8A96B] px-6 py-3 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-black transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_25px_rgba(200,169,107,0.4)]"
              >
                Explore Fleet
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 sm:my-12 lg:my-14 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-white/40">
            © {currentYear} Luxora. All rights reserved.
          </p>

          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-white/40 transition-colors duration-300 hover:text-[#C8A96B]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs sm:text-sm text-white/40 transition-colors duration-300 hover:text-[#C8A96B]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;