"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup } from "@/components/ui/dropdown-menu";
import { BadgeCheckIcon, BellIcon, CarFront, CreditCardIcon, LogOutIcon, MapPinned, Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
}
interface Dropdown {
  name: string;
  href: string;
  icon: React.ElementType,
}
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async (): Promise<void> => {
    await authClient.signOut();
  };

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/addcar" },
  ];
  const dropDownLinks: Dropdown[] = [
    { name: "Profile", href: "/", icon: BadgeCheckIcon },
    { name: "My Cars", href: "/mycars", icon: BadgeCheckIcon },
    { name: "My Booking", href: "/mybookings", icon: MapPinned },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8">
      <div className="relative mx-auto grid h-20 w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center rounded-2xl border border-border bg-background/85 px-4 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/30 sm:px-6 lg:px-10 md:grid-cols-[1fr_auto_1fr]">
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-border/50 dark:border-white/5" />

        <div className="flex items-center justify-start gap-3">
          <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-300 hover:border-[#C8A96B]/40 hover:text-[#C8A96B] md:hidden" aria-label="Toggle Menu">
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" className="hidden items-center no-underline md:flex">
            <Image src={logo} alt="Luxora Logo" height={50} width={170} priority className="h-11 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Link href="/" className="flex items-center no-underline md:hidden">
            <Image src={logo} alt="Luxora Logo" height={50} width={170} priority className="h-10 w-auto object-contain" />
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="relative text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80 no-underline transition-all duration-300 hover:text-[#9A742F] dark:hover:text-[#C8A96B] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C8A96B] after:transition-all after:duration-300 hover:after:w-full">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger >
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <Avatar>
                    <AvatarImage alt={user?.name ?? "User"} src={user?.image ?? undefined} />
                    <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  {dropDownLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem key={item.name}>
                        <Link href={item.href} className="flex items-center gap-2 cursor-pointer">
                          <Icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-500"><LogOutIcon className="mr-2 h-4 w-4" /> Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-2 md:flex sm:gap-3">
              <Button asChild className="h-10 rounded-full bg-[#C8A96B] px-5 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-[#C8A96B]/90">
                <Link href="/login" className="flex items-center justify-center">Login</Link>
              </Button>

              <Button asChild variant="outline" className="h-10 rounded-full border-border bg-transparent px-5 text-sm font-medium text-foreground transition-all duration-300 hover:border-[#C8A96B] hover:bg-transparent hover:text-[#9A742F] dark:hover:text-[#C8A96B]">
                <Link href="/register" className="flex items-center justify-center">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-5 rounded-3xl border border-border bg-background/95 px-6 py-6 shadow-xl backdrop-blur-2xl md:hidden">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm uppercase tracking-[0.18em] text-foreground/80 no-underline transition-all duration-300 hover:text-[#9A742F] dark:hover:text-[#C8A96B]">
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="flex flex-col gap-3 border-t border-border pt-5">
              <Button asChild className="h-11 w-full rounded-full bg-[#C8A96B] font-semibold text-black hover:bg-[#C8A96B]/90">
                <Link href="/login" onClick={() => setIsOpen(false)}>Login</Link>
              </Button>

              <Button asChild variant="outline" className="h-11 w-full rounded-full border-border bg-transparent text-foreground hover:border-[#C8A96B] hover:bg-transparent hover:text-[#9A742F] dark:hover:text-[#C8A96B]">
                <Link href="/register" onClick={() => setIsOpen(false)}>Register</Link>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;