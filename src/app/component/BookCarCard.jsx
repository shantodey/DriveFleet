"use client";

import React, { useState } from "react";
import { Button, DateField, FieldError, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BsEnvelopePaper } from "react-icons/bs";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { data } from "framer-motion/client";

const BookCarCard = ({ car }) => {
    const [driverOption, setDriverOption] = useState("no");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const { data: session } = authClient.useSession();
    const user = session?.user;
    if (!user) return null;       
    const { name, email } = user;
    const { _id, carName, imageUrl, carType, description, seatCapacity } = car
    const onSubmit = async(e) => {
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

        const res= await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`,{
            method: "POST",
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        const data=await res.json()
        console.log(data);
        
        toast.success("Booking Successful");
    };




    return (
        <Modal>
            <Button className="block w-full text-center rounded-2xl bg-white px-6 py-4 text-sm font-bold text-gray-950 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]">
                Book This Vehicle
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <BsEnvelopePaper className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Contact Us</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the form below and we'll get back to you. The modal adapts automatically
                                when the keyboard appears on mobile.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <TextField defaultValue={name} className="w-full" name="name" type="text">
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" defaultValue={email} name="email" type="email">
                                        <Label>Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Phone</Label>
                                        <Input placeholder="Enter your phone number" />
                                    </TextField>
                                    <div className="flex flex-col gap-4">
                                        <DateField className="w-[256px]" value={startDate} onChange={setStartDate}>
                                            <Label>Start Date</Label>
                                            <DateField.Group>
                                                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                            </DateField.Group>
                                        </DateField>
                                        <DateField className="w-[256px]" value={endDate} onChange={setEndDate}>
                                            <Label>End Date</Label>
                                            <DateField.Group>
                                                <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
                                            </DateField.Group>
                                            <FieldError>Date must be in the future</FieldError>
                                        </DateField>
                                    </div>
                                    <TextField className="w-full" name="company">
                                        <Label>Driver Needed?</Label>
                                        <div className="flex gap-6 mt-3">
                                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="radio"
                                                    name="driverNeeded"
                                                    value="yes"
                                                    checked={driverOption === "yes"}
                                                    onChange={() => setDriverOption("yes")}
                                                    className="w-4 h-4 accent-black cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-gray-950">Yes</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                                <input
                                                    type="radio"
                                                    name="driverNeeded"
                                                    value="no"
                                                    checked={driverOption === "no"}
                                                    onChange={() => setDriverOption("no")}
                                                    className="w-4 h-4 accent-black cursor-pointer"
                                                />
                                                <span className="text-sm font-medium text-gray-950">No</span>
                                            </label>
                                        </div>
                                    </TextField>
                                    <TextField className="w-full" name="message">
                                        <Label>Message</Label>
                                        <Input placeholder="Enter your message" />
                                    </TextField>
                                    <Modal.Footer>
                                        <Button slot="close" variant="secondary">
                                            Cancel
                                        </Button>
                                        <Button slot="close" type="submit">Send Message</Button>
                                    </Modal.Footer>
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