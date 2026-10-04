"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ThemeToggle from "@/components/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem , DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Settings, X } from "lucide-react";

interface NavLink {
  name: string;
  href: string;
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

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8">
      <div className="relative mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-border bg-background/85 px-4 shadow-lg backdrop-blur-2xl dark:border-white/10 dark:bg-black/30 sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-border/50 dark:border-white/5" />

        <div className="flex items-center justify-start gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-all duration-300 hover:border-[#C8A96B]/40 hover:text-[#C8A96B] md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="size-5" /> : <Menu  className="size-5" />}
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
                <Link
                  href={link.href}
                  className="relative text-[13px] font-medium uppercase tracking-[0.18em] text-foreground/80 no-underline transition-all duration-300 hover:text-[#9A742F] dark:hover:text-[#C8A96B] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C8A96B] after:transition-all after:duration-300 hover:after:w-full"
                >
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
              <DropdownMenuTrigger
                render={
                  <button className="cursor-pointer rounded-full ring-2 ring-border transition-all duration-300 hover:ring-[#C8A96B] focus:outline-none">
                    <Avatar className="h-10 w-10">
                      <AvatarImage alt={user?.name ?? "User"} src={user?.image ?? undefined} />
                      <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
                    </Avatar>
                  </button>

                }
              >
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl backdrop-blur-2xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3 px-2 py-1.5">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt={user?.name ?? "User"} src={user?.image ?? undefined} />
                      <AvatarFallback>{user?.name?.charAt(0) ?? "U"}</AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-sm font-medium leading-none text-foreground">{user?.name}</p>
                      <p className="max-w-36 truncate text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-border" />

                <DropdownMenuItem  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                render={
                  <Link href="/mycars" className="w-full text-foreground">
                    My Added Cars
                  </Link>
                }>
                </DropdownMenuItem>

                <DropdownMenuItem  className="cursor-pointer focus:bg-accent focus:text-accent-foreground"
                render={
                  <Link href="/mybookings" className="w-full text-foreground">
                    My Bookings
                  </Link>
                }>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer focus:bg-accent focus:text-accent-foreground">
                  <div className="flex w-full items-center justify-between">
                    <span>Settings</span>
                    <Settings className="size-4 text-[#C8A96B]" />
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer focus:bg-red-500/10 text-red-400 focus:text-red-400"
                >
                  <div className="flex w-full items-center justify-between">
                    <span>Log Out</span>
                    <LogOut className="size-4 text-red-400" />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Button className="rounded-full bg-[#C8A96B] px-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#C8A96B]/90 hover:scale-105 sm:px-6"
                render={
                  <Link href="/login">Login</Link>
                }>
              </Button>

              <Button  variant="outline"
                className="hidden rounded-full border-border bg-transparent px-4 text-sm text-foreground transition-all duration-300 hover:border-[#C8A96B] hover:bg-transparent hover:text-[#9A742F] dark:hover:text-[#C8A96B] sm:block sm:px-6"
              render={
                <Link href="/register">Register</Link>
              }
              >
              </Button>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-5 rounded-3xl border border-border bg-background/95 px-6 py-6 shadow-xl backdrop-blur-2xl md:hidden">
          {navLinks.map((link) => (
            <Link  key={link.name}  href={link.href}  onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-[0.18em] text-foreground/80 no-underline transition-all duration-300 hover:text-[#9A742F] dark:hover:text-[#C8A96B]">
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="flex flex-col gap-4 border-t border-border pt-5">
              <Button
                className="w-full rounded-full bg-[#C8A96B] py-6 font-semibold text-black hover:bg-[#C8A96B]/90"
              render={
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
              }>
              </Button>

              <Button variant="outline"
                className="w-full rounded-full border-border bg-transparent py-6 text-foreground hover:border-[#C8A96B] hover:bg-transparent hover:text-[#9A742F] dark:hover:text-[#C8A96B]"
                render={
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
                }>
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;