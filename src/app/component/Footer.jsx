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
      icon: <FaFacebookF />,
      href: "https://facebook.com",
      label: "Facebook",
    },

    {
      icon: <FaXTwitter />,
      href: "https://x.com",
      label: "X",
    },

    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },

    {
      icon: <FaInstagram />,
      href: "https://instagram.com",
      label: "Instagram",
    },
  ];

  const usefulLinks = [
    { name: "Home", href: "/" },

    {
      name: "Explore Cars",
      href: "/explore-cars",
    },

    {
      name: "Add Car",
      href: "/addcar",
    },

    {
      name: "My Bookings",
      href: "/mybookings",
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0B] border-t border-white/10">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-100 w-100 -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-block no-underline"
            >
              <Image
                src={logo}
                alt="Luxora Logo"
                width={180}
                className="object-contain"
              />
            </Link>

            <p
              className="
              mt-7
              max-w-sm
              text-base
              leading-relaxed
              text-white/55
            "
            >
              Experience elite luxury car rentals in Dhaka with
              world-class service, transparent pricing, and a
              handpicked fleet of exotic vehicles.
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/3
                  text-white/70
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#C8A96B]
                  hover:bg-[#C8A96B]
                  hover:text-black
                "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p
              className="
              mb-8
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#C8A96B]
            "
            >
              Navigation
            </p>

            <ul className="space-y-5">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="
                    inline-block
                    text-white/60
                    transition-all
                    duration-300
                    hover:translate-x-1
                    hover:text-[#C8A96B]
                  "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              className="
              mb-8
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-[#C8A96B]
            "
            >
              Contact
            </p>

            <div className="space-y-5">
              
              {/* Email */}
              <div
                className="
                flex
                items-start
                gap-4
              "
              >
                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-[#C8A96B]
                "
                >
                  <FaEnvelope />
                </div>

                <div>
                  <p className="text-sm text-white/40">
                    Email Address
                  </p>

                  <p className="mt-1 text-white/70">
                    support@luxora.com
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                className="
                flex
                items-start
                gap-4
              "
              >
                <div
                  className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  text-[#C8A96B]
                "
                >
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-sm text-white/40">
                    Phone Number
                  </p>

                  <p className="mt-1 text-white/70">
                    +880 1234-567890
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Box */}
          <div>
            <div
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.03]
              p-8
              backdrop-blur-2xl
            "
            >
              <p
                className="
                text-sm
                uppercase
                tracking-[0.25em]
                text-[#C8A96B]
              "
              >
                Premium Experience
              </p>

              <h3
                className="
                mt-5
                text-3xl
                font-black
                leading-tight
                text-white
              "
              >
                Drive Luxury <br />
                Without Limits.
              </h3>

              <p
                className="
                mt-5
                text-sm
                leading-relaxed
                text-white/55
              "
              >
                Explore elite exotic cars designed for unforgettable
                journeys across Dhaka and beyond.
              </p>

              <Link
                href="/explore-cars"
                className="
                mt-8
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#C8A96B]
                px-6
                py-3
                text-sm
                font-bold
                uppercase
                tracking-[0.15em]
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:shadow-[0_0_25px_rgba(200,169,107,0.4)]
              "
              >
                Explore Fleet
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-14 h-px w-full bg-white/10" />

        {/* Bottom */}
        <div
          className="
          flex
          flex-col
          items-center
          justify-between
          gap-6
          text-center
          md:flex-row
        "
        >
          <p className="text-sm text-white/40">
            © {currentYear} Luxora. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            <Link
              href="/privacy"
              className="
              text-sm
              text-white/40
              transition-all
              duration-300
              hover:text-[#C8A96B]
            "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
              text-sm
              text-white/40
              transition-all
              duration-300
              hover:text-[#C8A96B]
            "
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