"use client";
import { Button, Link ,Avatar, Dropdown, Label} from "@heroui/react";
import {ArrowRightFromSquare, Gear, Persons} from "@gravity-ui/icons";
import {} from "@heroui/react";
import Image from "next/image";
import logo from "@/assets/Logo.png";

const Navber = () => {

  return (
   <nav className="absolute top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/5">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold text-foreground no-underline">
         <Image src={logo} alt="logo" height={50} width={130}/>
        </Link>

        <ul className="flex items-center gap-6">
          <li><Link href="/" className="text-white text-sm font-medium  hover:text-foreground no-underline">Home</Link></li>
          <li><Link href="/explore" className="text-white  text-sm font-medium  hover:text-foreground no-underline">Explore Cars</Link></li>
          <li><Link href="/add-car" className="text-white text-sm font-medium  hover:text-foreground no-underline">Add Car</Link></li>
          <li><Link href="/bookings" className="text-white text-sm font-medium  hover:text-foreground no-underline">My Bookings</Link></li>
        </ul>
        <div className="flex items-center gap-3">
          <Button color="primary" size="sm" radius="lg">
            Login 
          </Button>
          <Button color="primary" size="sm" radius="lg">
            Register
          </Button>
          <Dropdown>
            <Dropdown.Trigger className="rounded-full">
              <Avatar>
                <Avatar.Image
                  alt="Junior Garcia"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                />
                <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
              </Avatar>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <div className="px-3 pt-3 pb-1">
                <div className="flex items-center gap-2">
                  <Avatar size="sm">
                    <Avatar.Image
                      alt="Jane"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
                    />
                    <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col gap-0">
                    <p className="text-sm leading-5 font-medium">Jane Doe</p>
                    <p className="text-xs leading-none text-muted">jane@example.com</p>
                  </div>
                </div>
              </div>
              <Dropdown.Menu>
                <Dropdown.Item id="dashboard" textValue="Dashboard">
                  <Label>Dashboard</Label>
                </Dropdown.Item>
                <Dropdown.Item id="profile" textValue="Profile">
                  <Label>Profile</Label>
                </Dropdown.Item>
                <Dropdown.Item id="settings" textValue="Settings">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Settings</Label>
                    <Gear className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="new-project" textValue="New project">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Create Team</Label>
                    <Persons className="size-3.5 text-muted" />
                  </div>
                </Dropdown.Item>
                <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                  <div className="flex w-full items-center justify-between gap-2">
                    <Label>Log Out</Label>
                    <ArrowRightFromSquare className="size-3.5 text-danger" />
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navber;