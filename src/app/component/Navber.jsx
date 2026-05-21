"use client";
import { useState } from "react";
import { Button, Link, Avatar, Dropdown, Label } from "@heroui/react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Image from "next/image";
import logo from "@/assets/Logo.png";
import { FaGear } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { authClient } from "@/lib/auth-client";


const Navber = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession()
  const user = session?.user;
  

  const handleSingOut = async () => {
    await authClient.signOut();
  }
  return (
    <nav className="z-50 w-full bg-gray-700 backdrop-blur-md relative">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white block md:hidden focus:outline-none p-1 order-1"
          aria-label="Toggle Menu" >
          {isOpen ? <RxCross1 className="size-6" /> : <RxHamburgerMenu className="size-6" />}
        </button>

        <Link href="/" className="text-lg font-bold text-foreground no-underline order-2 md:order-none absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
          <Image src={logo} alt="logo" height={50} width={130} loading="eager" />
        </Link>

        <ul className="hidden md:flex items-center gap-6">
          <li><Link href="/" className="text-white text-sm font-medium hover:text-foreground no-underline">Home</Link></li>
          <li><Link href={"/explore-cars"} className="text-white text-sm font-medium hover:text-foreground no-underline">Explore Cars</Link></li>
          <li><Link href={'/addcar'} className="text-white text-sm font-medium hover:text-foreground no-underline">Add Car</Link></li>
          <li><Link href={"/mybookings"} className="text-white text-sm font-medium hover:text-foreground no-underline">My Bookings</Link></li>
        </ul>


        <div className="flex items-center gap-3 order-3 md:order-0">
          {user ?
            <>
              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer">
                  <Avatar>
                    <Avatar.Image
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover>
                  <div className="px-3 pt-3 pb-1">
                    <div className="flex items-center gap-2">
                      <Avatar size="sm">
                        <Avatar.Image
                          alt={user?.name}
                          src={user?.image}
                        />
                        <Avatar.Fallback delayMs={600}>{user?.name}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col gap-0">
                        <p className="text-sm leading-5 font-medium">{user?.name}</p>
                        <p className="text-xs leading-none text-muted">{user?.email}</p>
                      </div>
                    </div>
                  </div>
                  <Dropdown.Menu>
                    <Dropdown.Item id="dashboard" textValue="Dashboard">
                      <Label>Dashboard</Label>
                    </Dropdown.Item>
                    <Dropdown.Item id="profile" textValue="Profile">
                      <div className="flex w-full items-center justify-between gap-2">

                        <Label>Profile</Label>
                        <IoPersonSharp className="size-3.5 text-muted" />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item id="settings" textValue="Settings">
                      <div className="flex w-full items-center justify-between gap-2">
                        <Label>Settings</Label>
                        <FaGear className="size-3.5 text-muted" />
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSingOut} id="logout" textValue="Logout" variant="danger">
                      <div className="flex w-full items-center justify-between gap-2">
                        <Label>Log Out</Label>
                        <IoIosLogOut className="size-3.5 text-danger" />
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </>
            :
            <>
              <div className="hidden sm:flex items-center gap-3">
                <Link href={'/login'}><Button color="primary" size="sm" radius="lg"> Login </Button></Link>
                <Link href={'/register'}><Button color="primary" size="sm" radius="lg"> Register </Button></Link>
              </div>
            </>
          }
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-white/10 px-6 py-6 flex flex-col gap-5 shadow-2xl z-40 animate-fade-in">
          <Link href="/" className="text-white text-base font-medium no-underline transition-colors hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/explore-cars" className="text-white text-base font-medium no-underline transition-colors hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Explore Cars
          </Link>
          <Link href="/addcar" className="text-white text-base font-medium no-underline transition-colors hover:text-gray-300" onClick={() => setIsOpen(false)}>
            Add Car
          </Link>
          <Link href="/mybookings" className="text-white text-base font-medium no-underline transition-colors hover:text-gray-300" onClick={() => setIsOpen(false)}>
            My Bookings
          </Link>

          <div className="flex sm:hidden flex-col gap-3 pt-4 border-t border-white/10">
            <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
              <Button color="primary" size="md" radius="xl" className="w-full font-semibold"> Login </Button>
            </Link>
            <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
              <Button color="primary" size="md" radius="xl" className="w-full font-semibold" variant="bordered"> Register </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navber;