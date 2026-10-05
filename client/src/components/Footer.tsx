import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/Logo.png";
import { Mail, Phone } from "lucide-react";

interface IconProps {
  className?: string;
}

const FacebookIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const socialLinks = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: XIcon, href: "https://x.com", label: "X" },
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
];

const usefulLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Cars", href: "/explore-cars" },
  { name: "Add Car", href: "/addcar" },
  { name: "My Bookings", href: "/mybookings" },
];

const contactDetails = [
  {
    icon: Mail,
    label: "Email Address",
    value: "support@luxora.com",
    href: "mailto:support@luxora.com",
  },
  {
    icon: Phone,
    label: "Phone Number",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background text-foreground">
      {/* Background Glow Effect */}
      <div className="absolute left-1/2 top-0 h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-8">

          {/* Brand Info */}
          <div className="flex flex-col items-start">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image src={logo} alt="Luxora Logo" width={160} height={50} className="object-contain w-auto h-10 sm:h-12" priority />
            </Link>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-sm">
              Experience elite luxury car rentals in Dhaka with world-class
              service, transparent pricing, and a handpicked fleet of exotic
              vehicles.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3 sm:gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-border bg-card text-muted-foreground backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#C8A96B] hover:bg-[#C8A96B] hover:text-black hover:shadow-[0_0_20px_rgba(200,169,107,0.3)]">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="sm:pl-4 lg:pl-8">
            <p className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8A672A] dark:text-[#C8A96B]"> Navigation</p>
            <ul className="space-y-3.5 sm:space-y-4">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}
                    className="inline-block text-sm sm:text-base text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-[#8A672A] dark:hover:text-[#C8A96B]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="mb-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#8A672A] dark:text-[#C8A96B]">  Contact</p>
            <div className="space-y-4 sm:space-y-5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center sm:items-start gap-4">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-border bg-card text-[#8A672A] dark:text-[#C8A96B]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                    <Link href={href} className="mt-0.5 block text-sm sm:text-base text-foreground/80 hover:text-[#8A672A] dark:hover:text-[#C8A96B] transition-colors">
                      {value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury Promo Box */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="rounded-2xl sm:rounded-[28px] border border-border bg-card p-6 sm:p-7 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#C8A96B]/10 blur-2xl group-hover:bg-[#C8A96B]/20 transition-all duration-500" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A672A] dark:text-[#C8A96B]">
                Premium Experience
              </p>

              <h3 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-black leading-tight text-foreground">
                Drive Luxury <br className="hidden sm:inline" />
                Without Limits.
              </h3>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
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
        <div className="my-10 sm:my-12 lg:my-14 h-px w-full bg-border" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <p className="text-xs sm:text-sm text-muted-foreground">
          © {currentYear} Drive Fleet. All rights reserved.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Designed &amp; Developed by{" "}
          <Link href="https://github.com/shantodey"  target="_blank"  rel="noopener noreferrer"
            className="font-semibold text-[#8A672A] dark:text-[#C8A96B] transition-colors duration-300 hover:text-[#C8A96B] dark:hover:text-[#8A672A]">
            Shanto Dey
          </Link>
        </p>
      </div>
      </div>
    </footer>

  );
};

export default Footer;