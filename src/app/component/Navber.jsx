"use client";

import { useState } from "react";
import { Button, Link, Avatar, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FaGear } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import logo from "@/assets/Logo.png";
import { authClient } from "@/lib/auth-client";

const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSingOut = async () => {
    await authClient.signOut();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/explore-cars" },
    { name: "Add Car", href: "/addcar" },
  ];

  return (
    <nav className="fixed left-0 top-0 z-50 w-full px-4 pt-4 md:px-8">
      <div className="relative mx-auto grid h-20 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-white/10 bg-black/30 px-4 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-6 lg:px-10">
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />

        <div className="flex items-center justify-start gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-[#C8A96B]/40 hover:text-[#C8A96B] md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <RxCross1 className="size-5" /> : <RxHamburgerMenu className="size-5" />}
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
                  className="relative text-[13px] font-medium uppercase tracking-[0.18em] text-white/80 no-underline transition-all duration-300 hover:text-[#C8A96B] after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#C8A96B] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          {user ? (
            <Dropdown>
              <Dropdown.Trigger className="cursor-pointer rounded-full ring-2 ring-white/10 transition-all duration-300 hover:ring-[#C8A96B]">
                <Avatar className="h-10 w-10">
                  <Avatar.Image alt={user?.name} src={user?.image} />
                  <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0)}</Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover className="rounded-2xl border border-white/10 bg-black/90 text-white shadow-2xl backdrop-blur-2xl">
                <div className="px-4 pb-2 pt-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image alt={user?.name} src={user?.image} />
                      <Avatar.Fallback delayMs={600}>{user?.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="max-w-44 truncate text-xs text-white/50">{user?.email}</p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu className="text-white">
                  <Dropdown.Item id="dashboard" textValue="Dashboard" className="hover:bg-white/10">
                    <Link href="/mycars" className="w-full text-white no-underline">
                      <Label className="cursor-pointer text-white">My Added Cars</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="profile" textValue="Profile" className="hover:bg-white/10">
                    <Link href="/mybookings" className="w-full text-white no-underline">
                      <Label className="cursor-pointer text-white">My Bookings</Label>
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="settings" textValue="Settings" className="hover:bg-white/10">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-white">Settings</Label>
                      <FaGear className="size-4 text-[#C8A96B]" />
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleSingOut} id="logout" textValue="Logout" variant="danger" className="hover:bg-red-500/10">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-red-400">Log Out</Label>
                      <IoIosLogOut className="size-4 text-red-400" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/login" className="no-underline">
                <Button className="rounded-full bg-[#C8A96B] px-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 sm:px-6">
                  Login
                </Button>
              </Link>

              <Link href="/register" className="hidden no-underline sm:block">
                <Button className="rounded-full border border-white/20 px-4 text-sm text-white transition-all duration-300 hover:border-[#C8A96B] hover:text-[#C8A96B] sm:px-6">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 flex flex-col gap-5 rounded-3xl border border-white/10 bg-black/90 px-6 py-6 shadow-[0_10px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-[0.18em] text-white/80 no-underline transition-all duration-300 hover:text-[#C8A96B]"
            >
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="flex flex-col gap-4 border-t border-white/10 pt-5">
              <Link href="/login" onClick={() => setIsOpen(false)} className="no-underline">
                <Button className="w-full rounded-full bg-[#C8A96B] py-6 font-semibold text-black">
                  Login
                </Button>
              </Link>

              <Link href="/register" onClick={() => setIsOpen(false)} className="no-underline">
                <Button className="w-full rounded-full border border-white/20 py-6 text-white hover:border-[#C8A96B] hover:text-[#C8A96B]">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navber;