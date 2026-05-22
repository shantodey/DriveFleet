"use client";

import React, { useState } from "react";
import { Button, DateField, FieldError, Input, Label, Modal, Surface, TextField, TextArea } from "@heroui/react";
import { BsEnvelopePaper } from "react-icons/bs";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { IoCalendarOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { HiOutlineSparkles } from "react-icons/hi2";

const BookCarCard = ({ car }) => {
    const [driverOption, setDriverOption] = useState("no");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    if (!user) return null;
    const { name, email } = user;
    const { _id, carName, imageUrl, seatCapacity } = car;

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { phone, message } = Object.fromEntries(formData.entries());
        const bookingData = {
            userId: user.id,
            userName: name,
            userEmail: email,
            carImg: imageUrl,
            carId: _id,
            carName: carName,
            people: seatCapacity,
            phone,
            message,
            driverNeeded: driverOption,
            startDate: startDate?.toString() ?? null,
            endDate: endDate?.toString() ?? null,
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();

        console.log(data);

        toast.success("Booking Successful");
    };

    return (
        <Modal>

            <Button className="h-15 w-full rounded-2xl border border-white/10 bg-white px-6 text-sm font-black uppercase tracking-[3px] text-black transition-all duration-300 hover:scale-[1.01] hover:bg-[#f5f5f5] active:scale-[0.99]">
                Book This Vehicle
            </Button>

            <Modal.Backdrop className="bg-black/80 backdrop-blur-md">
                <Modal.Container placement="auto">
                    <Modal.Dialog className="overflow-hidden rounded-[34px] border border-white/10 bg-linear-to-b from-[#111111] to-[#090909] p-0 shadow-[0_0_60px_rgba(0,0,0,0.45)] sm:max-w-3xl">
                        <div className="border-b border-white/5 px-7 py-7 md:px-9">
                            <div className="flex items-start justify-between gap-5">
                                <div className="flex items-center gap-5">
                                    <div className="flex h-18 w-18 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/5 text-[#d6bb84]">
                                        <BsEnvelopePaper size={28} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[5px] text-[#b89b65]"> Luxury Reservation</p>
                                        <h2 className="mt-2 text-3xl font-black text-white">Book {carName}</h2>
                                        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">Complete your reservation details and confirm your premium vehicle booking.</p>
                                    </div>

                                </div>

                                <Modal.CloseTrigger className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/5 bg-white/3 text-gray-400 transition-all duration-300 hover:bg-white/6 hover:text-white" />
                            </div>
                        </div>

                        <Modal.Body className="p-6 md:p-8">
                            <Surface className="rounded-[30px] border border-white/5 bg-white/2 p-5 md:p-7">
                                <form onSubmit={onSubmit} className="space-y-7">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <TextField defaultValue={name} className="w-full" name="name" type="text">
                                            <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">  Full Name</Label>
                                            <Input  placeholder="Enter your name" className="h-15 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500" />
                                        </TextField>

                                        <TextField defaultValue={email} className="w-full" name="email" type="email">
                                            <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500"> Email Address </Label>
                                            <Input placeholder="Enter your email" className="h-15 rounded-2xl border border-white/10 bg-white/3 px-5 text-white placeholder:text-gray-500" />
                                        </TextField>

                                        <TextField className="w-full md:col-span-2" name="phone" type="tel">
                                            <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500"> Phone Number </Label>

                                            <Input placeholder="Enter your phone number"  className="h-15 rounded-2xl border border-white/10 bg-white/3px-5 text-white placeholder:text-gray-500"/>
                                        </TextField>

                                    </div>

                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                        <div className="rounded-[28px] border border-white/5 bg-white/2 p-5">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-[#d6bb84]"> <IoCalendarOutline size={20} /> </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[3px] text-gray-500"> Rental Start</p>
                                                    <h3 className="mt-1 text-base font-bold text-white">  Start Date</h3>
                                                </div>
                                            </div>

                                            <DateField className="w-full" value={startDate} onChange={setStartDate}>
                                                <DateField.Group className="flex h-15 items-center rounded-2xl border border-white/10 bg-white/3 px-5 text-white">
                                                    <DateField.Input className="flex gap-1 text-white">   {(segment) => <DateField.Segment segment={segment} />} </DateField.Input>
                                                </DateField.Group>
                                            </DateField>

                                        </div>

                                        <div className="rounded-[28px] border border-white/5 bg-white/2 p-5">
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-[#d6bb84]">
                                                    <IoCalendarOutline size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[3px] text-gray-500">  Rental Return </p>
                                                    <h3 className="mt-1 text-base font-bold text-white">   End Date </h3>
                                                </div>

                                            </div>
                                            <DateField className="w-full" value={endDate} onChange={setEndDate}>
                                                <DateField.Group className="flex h-15 items-center rounded-2xl border border-white/10 bg-white/3 px-5 text-white">
                                                    <DateField.Input className="flex gap-1 text-white">
                                                        {(segment) => <DateField.Segment segment={segment} />}
                                                    </DateField.Input>
                                                </DateField.Group>
                                                <FieldError className="mt-3 text-xs text-red-400">  Date must be in the future</FieldError>
                                            </DateField>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/5 bg-white/2 p-6">
                                        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                                            <div className="flex items-start gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/3 text-[#d6bb84]">
                                                    <LuUsers size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs uppercase tracking-[3px] text-gray-500"> Driver Service </p>
                                                    <h3 className="mt-1 text-lg font-bold text-white">  Need A Professional Driver?</h3>
                                                    <p className="mt-2 text-sm leading-7 text-gray-400">  Select whether you want a personal chauffeur during your trip. </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300 ${driverOption === "yes" ? 'border-[#b89b65]/20 bg-[#b89b65]/10 text-[#d6bb84]' : 'border-white/10 bg-white/2 text-gray-300'}`}>
                                                    <input type="radio" name="driverNeeded" value="yes" checked={driverOption === "yes"} onChange={() => setDriverOption("yes")} className="hidden" />
                                                    <div className={`h-4 w-4 rounded-full border ${driverOption === "yes" ? 'border-[#d6bb84] bg-[#d6bb84]' : 'border-gray-500'}`} />
                                                    <span className="text-sm font-bold uppercase tracking-[2px]">  Yes</span>

                                                </label>

                                                <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-5 py-4 transition-all duration-300 ${driverOption === "no" ? 'border-[#b89b65]/20 bg-[#b89b65]/10 text-[#d6bb84]' : 'border-white/10 bg-white/2 text-gray-300'}`}>
                                                    <input  type="radio"  name="driverNeeded"  value="no"  checked={driverOption === "no"}  onChange={() => setDriverOption("no")}   className="hidden" />
                                                    <div className={`h-4 w-4 rounded-full border ${driverOption === "no" ? 'border-[#d6bb84] bg-[#d6bb84]' : 'border-gray-500'}`} />
                                                    <span className="text-sm font-bold uppercase tracking-[2px]">  No</span>
                                                </label>
                                            </div>
                                        </div>

                                    </div>

                                    <TextField className="w-full" name="message">

                                        <Label className="mb-3 block text-xs uppercase tracking-[4px] text-gray-500">  Additional Message </Label>

                                        <TextArea placeholder="Special requests, pickup instructions or luxury preferences..."
                                            className="min-h-35 rounded-3xl border border-white/10 bg-white/3px-5 py-4 text-white placeholder:text-gray-500"
                                        />
                                    </TextField>

                                    <div className="flex flex-col gap-4 border-t border-white/5 pt-7 sm:flex-row sm:justify-end">
                                        <Button slot="close" className="h-14 rounded-2xl border border-white/10 bg-white/6 px-7 text-xs font-bold uppercase tracking-[3px] text-gray transition-all duration-300 hover:bg-white/6" > Cancel
                                        </Button>
                                        <Button slot="close" type="submit" className="h-14 rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 px-8 text-xs font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20" >
                                            <HiOutlineSparkles size={18} />
                                            <span>Confirm Booking</span>
                                        </Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default BookCarCard;