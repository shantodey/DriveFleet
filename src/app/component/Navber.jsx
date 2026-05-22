"use client";

import { useState } from "react";
import { Button, Link, Avatar, Dropdown, Label } from "@heroui/react";
import Image from "next/image";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { FaGear } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import logo from "@/assets/Logo.png";
import { authClient } from "@/lib/auth-client";
import { CiBookmarkCheck } from "react-icons/ci";

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
    <nav className="fixed top-0 left-0 z-50 w-full px-4 md:px-8 pt-4">
      <div className=" relative mx-auto flex h-20 container items-center justify-between rounded-2xl border border-white/10 bg-black/30 backdrop-blur-2xl px-6 lg:px-10 shadow-[0_8px_32px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5"></div>
        <button onClick={() => setIsOpen(!isOpen)} className=" block md:hidden text-white p-1 z-50 " aria-label="Toggle Menu" >
          {isOpen ? (
            <RxCross1 className="size-6" />
          ) : (
            <RxHamburgerMenu className="size-6" />
          )}
        </button>

        <Link href="/" className="  absolute  left-0  -translate-x-1/2  md:relative md:left-0  md:translate-x-0  no-underline">
          <Image src={logo} alt="Luxora Logo" height={50} width={170} className="object-contain h-12" />
        </Link>

        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className=" relative  text-white/80 text-[13px] font-medium  uppercase  tracking-[0.18em]  no-underline  transition-all duration-300 hover:text-[#C8A96B] after:absolute  after:left-0  after:-bottom-1  after:h-px  after:w-0  after:bg-[#C8A96B] after:transition-all  after:duration- hover:after:w-full">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {user ? (
            <Dropdown>
              <Dropdown.Trigger className="rounded-full cursor-pointer ring-2 ring-white/10 hover:ring[#C8A96B] transition-all duration-300"
              >
                <Avatar>
                  <Avatar.Image alt={user?.name} src={user?.image} />
                  <Avatar.Fallback delayMs={600}>
                    {user?.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </Dropdown.Trigger>

              <Dropdown.Popover className=" bg-black/80 backdrop-blur-2xlborder border-white/10 rounded-2xl shadow-2xl text-white ">
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <Avatar.Image
                        alt={user?.name}
                        src={user?.image}
                      />
                      <Avatar.Fallback delayMs={600}>
                        {user?.name?.charAt(0)}
                      </Avatar.Fallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-white">
                        {user?.name}
                      </p>

                      <p className="text-xs text-white/50">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Dropdown.Menu className="text-white">
                  <Dropdown.Item id="dashboard" textValue="Dashboard" className="hover:bg-gray-700">

                    <Link href={"/mycars"} className="text-white no-underline">
                      <Label className="text-white" >
                        My Added Cars
                      </Label>
                    </Link>

                  </Dropdown.Item>

                  <Dropdown.Item id="profile" textValue="Profile" className="hover:bg-gray-700">
                    <div className="flex items-center justify-between gap-2" >
                      <Link href={"/mybookings"} className="no-underline">
                        <Label className="text-white">
                          My Bookings
                        </Label>
                      </Link>

                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item id="settings" textValue="Settings" className="hover:bg-gray-700">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-white">
                        Settings
                      </Label>

                      <FaGear className="size-4 text-[#C8A96B]" />
                    </div>
                  </Dropdown.Item>

                  <Dropdown.Item onClick={handleSingOut} id="logout" textValue="Logout" variant="danger" className="hover:bg-gray-700">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-red-400">
                        Log Out
                      </Label>
                      <IoIosLogOut className="size-4 text-red-400" />
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/login" className={'no-underline'}>
                <Button className=" bg-[#C8A96B] text-black rounded-full px-6 font-semibold hover:scale-105 transition-all duration-300 ">
                  Login
                </Button>
              </Link>

              <Link href="/register" className={'no-underline'}>
                <Button variant="bordered" className=" border-white/20  text-white rounded-full px-6 hover:border-[#C8A96B] hover:text-[#C8A96B] transition-all duration-300">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.6)] px-6 py-6 flex flex-col gap-6 animate-fade-in">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-white/80 text-sm  uppercase  tracking-[0.18em]  no-underline  transition-all  duration-300  hover:text-[#C8A96B]">
              {link.name}
            </Link>
          ))}

          {!user && (
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="  w-full  bg-[#C8A96B]  text-black  rounded-full  py-6 font" >
                  Login
                </Button>
              </Link>

              <Link href="/register" onClick={() => setIsOpen(false)} >
                <Button variant="bordered" className="  w-full  border-white/20  text-white  rounded-full  py-6  hover:border-[#C8A96B]  hover:text-[#C8A96B]">
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