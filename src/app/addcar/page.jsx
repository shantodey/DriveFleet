"use client";

import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { IoCarSportOutline } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";

const AddCarPage = () => {
    const [isAvailable, setIsAvailable] = useState(true);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error("Please log in before adding a car.");
            return;
        }
        const formData = new FormData(e.currentTarget);
        const addCar = Object.fromEntries(formData.entries());
        addCar.availabilityStatus = isAvailable ? "Available" : "Unavailable";
        addCar.ownerId = user.id;
        addCar.ownerName = user.name;
        addCar.ownerEmail = user.email;

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(addCar)
        });

        const data = await res.json();

        if (res.ok) {
            toast.success(data.message || 'Success');
            redirect('/');
        } else {
            toast.error(data.message || 'Error');
        }
    };

    if (!user) {
        return (
            <section className="flex min-h-screen items-center justify-center bg-[#050505] px-4 text-white">
                <div className="w-full max-w-xl rounded-[32px] border border-white/10 bg-linear-to-b from-[#111111] to-[#090909] p-10 text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d1b277]">
                        <IoCarSportOutline size={38} />
                    </div>
                    <h2 className="mt-8 text-4xl font-black"> Login Required</h2>
                    <p className="mt-4 text-sm leading-7 text-gray-400"> Please sign in before adding a new luxury car listing to your garage.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-[#050505] lg:py-25 text-white">
            <div className="container mx-auto max-w-6xl px-4 md:px-6">
                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[5px] text-[#b89b65]"> Luxury Garage </p>
                        <h1 className="mt-3 text-4xl font-black md:text-5xl"> Add New Car Listing</h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">  Showcase your premium vehicle collection and start accepting luxury rentals.</p>
                    </div>

                    <div className="hidden h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d1b277] md:flex">
                        <HiOutlineSparkles size={28} />
                    </div>

                </div>

                <form onSubmit={onSubmit} className="overflow-hidden rounded-[36px] border border-white/10 bg-linear-to-b from-[#111111] to-[#090909] p-6 shadow-[0_0_60px_rgba(0,0,0,0.35)] md:p-10">

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <TextField name="carName" isRequired>
                                <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">   Car Name </Label>
                                <Input placeholder="e.g. Mercedes Maybach S680"
                                    className="h-16 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500"
                                />
                                <FieldError />
                            </TextField>

                        </div>
                        <TextField name="dailyRentPrice" type="number" isRequired>
                            <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500"> Daily Rent Price </Label>
                            <Input type="number" placeholder="e.g. 450" className="h-16 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500"
                            />
                            <FieldError />
                        </TextField>

                        <div>
                            <Select name="carType" isRequired placeholder="Select car type" className="w-full">
                                <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                                    Car Type
                                </Label>
                                <Select.Trigger className="flex h-16 items-center justify-between rounded-2xl border border-white/10 bg-white/3 px-5 transition-all duration-300 hover:border-white/20">
                                    <Select.Value className="text-white data-[placeholder]:text-gray-500" />
                                    <Select.Indicator className="text-[#c7ab73]" />
                                </Select.Trigger>

                                <Select.Popover className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-2">
                                    <ListBox className="space-y-1">
                                        <ListBox.Item id="SUV" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">SUV</ListBox.Item>
                                        <ListBox.Item id="Sedan" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Sedan</ListBox.Item>
                                        <ListBox.Item id="Hatchback" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Hatchback</ListBox.Item>
                                        <ListBox.Item id="Luxury" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Luxury</ListBox.Item>
                                        <ListBox.Item id="Coupe" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Coupe</ListBox.Item>
                                        <ListBox.Item id="Pickup" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Pickup</ListBox.Item>
                                        <ListBox.Item id="Van" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Van</ListBox.Item>
                                        <ListBox.Item id="Electric" className="rounded-xl px-4 py-3 text-sm text-gray-300 hover:bg-white/4">Electric</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField name="seatCapacity" type="number" isRequired>
                            <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                                Seat Capacity
                            </Label>
                            <Input type="number"placeholder="e.g. 5" className="h-16 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500"
                            />
                            <FieldError />
                        </TextField>

                        <TextField name="pickupLocation" isRequired>
                            <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                                Pickup Location
                            </Label>
                            <Input placeholder="e.g. Dhaka, Gulshan"className="h-16 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white placeholder:text-gray-500" />
                            <FieldError />
                        </TextField>

                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                                    Car Image URL
                                </Label>
                                <Input type="url" placeholder="https://i.ibb.co/your-image.jpg"className="h-16 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-white placeholder:text-gray-500" />
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                                    Description
                                </Label>
                                <TextArea
                                    placeholder="Describe your luxury vehicle, features, comfort, rules and rental conditions..."
                                    className="min-h-45rounded-3xl border border-white/10 bg-white/3 px-5 py-4 text-white placeholder:text-gray-500"/>
                                <FieldError />
                            </TextField>
                        </div>

                        <div className="md:col-span-2">
                            <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/2 p-6">
                                <div>
                                    <p className="text-xs uppercase tracking-[4px] text-gray-500"> Availability Status</p>
                                    <h3 className="mt-2 text-lg font-bold text-white">
                                        {isAvailable ? "Available For Booking" : "Currently Unavailable"}
                                    </h3>
                                    <p className={`mt-2 text-sm ${isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {isAvailable ? "Customers can rent this vehicle." : "This vehicle is hidden from bookings."}
                                    </p>
                                </div>

                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input  id="availabilityStatus" name="availabilityStatus"  type="checkbox"  value="Available"  checked={isAvailable}  onChange={(e) => setIsAvailable(e.target.checked)}  className="peer sr-only"/>
                                    <div className="h-8 w-16 rounded-full bg-white/10 transition-all duration-300 peer-checked:bg-[#b89b65]/30 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:after:translate-x-8"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/10 pt-8">
                        <Button type="submit" className="h-16 w-full rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 text-sm font-bold uppercase tracking-[4px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20"> Add Car Listing</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AddCarPage;