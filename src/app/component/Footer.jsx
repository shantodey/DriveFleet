import Link from "next/link";
import React from "react";

import {
  FaBookReader,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "@heroui/react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaXTwitter />, href: "https://x.com", label: "X" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
  ];

  const usefulLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms", href: "/rooms" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-surface border-t border-border transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              
              <span className="text-2xl font-bold tracking-tight text-foreground">
                DriveFleet
              </span>
            </Link>

            <p className="text-muted text-sm leading-relaxed">
              A refined selection of the latest luxury and nexotic vehicles, prepared with precision before nevery journey.
            </p>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6">
              Useful Links
            </h4>

            <ul className="space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted text-sm">
                <div className="w-8 h-8 rounded-lg bg-default-100 flex items-center justify-center text-accent">
                  <FaEnvelope />
                </div>

                <span>support@drivefleet.com</span>
              </li>

              <li className="flex items-center gap-3 text-muted text-sm">
                <div className="w-8 h-8 rounded-lg bg-default-100 flex items-center justify-center text-accent">
                  <FaPhoneAlt />
                </div>

                <span>+880 1234-567***</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6">
              Follow Us
            </h4>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-default-100 flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-sm hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-separator" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted text-sm">
          <p>© {currentYear} DriveFleet. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      &copy;Shanto Chandra dey
    </footer>
  );
};

export default Footer;