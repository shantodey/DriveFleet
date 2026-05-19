"use client";

import React, { useState } from "react"; 
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { BsEnvelopePaper } from "react-icons/bs";
import toast from "react-hot-toast";

const BookCarCard = () => {
    const [driverOption, setDriverOption] = useState("no");

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const addCar = Object.fromEntries(formData.entries());
        addCar.driverNeeded = driverOption;
        console.log(addCar);
        toast.success('Booking Successfull')
    };

    return (
        <Modal>
            <Button className="block w-full text-center rounded-2xl bg-white px-6 py-4 text-sm font-bold text-gray-950 transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]" > Book This Vehicle</Button>
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
                                    <TextField className="w-full" name="name" type="text">
                                        <Label>Name</Label>
                                        <Input placeholder="Enter your name" />
                                    </TextField>
                                    <TextField className="w-full" name="email" type="email">
                                        <Label>Email</Label>
                                        <Input placeholder="Enter your email" />
                                    </TextField>
                                    <TextField className="w-full" name="phone" type="tel">
                                        <Label>Phone</Label>
                                        <Input placeholder="Enter your phone number" />
                                    </TextField>
                                    <TextField className="w-full" name="company">
                                        <Label>Driver Needed?</Label>
                                        <div className="flex gap-6 mt-3">
                                            {/* Yes Option */}
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

                                            {/* No Option */}
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