"use client";

import React, { useState } from "react";
import {
    Button,
    FieldError,
    Input,
    Label,
    Modal,
    Surface,
    TextArea,
    TextField,
    Select,
    ListBox,
} from "@heroui/react";

import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCarSportOutline } from "react-icons/io5";
import toast from "react-hot-toast";

const EditMyCarDetels = ({ car }) => {

    const [isAvailable, setIsAvailable] = useState(
        car?.availabilityStatus === "Available"
    );
    const { carName, dailyRentPrice, seatCapacity, pickupLocation, imageUrl,
        description,
        carType,
    } = car || {};
    console.log(car);
    
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const updatedCar = Object.fromEntries(formData.entries());

        updatedCar.availabilityStatus = isAvailable
            ? "Available"
            : "Unavailable";

        try {

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${car?._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(updatedCar),
                }
            );

            const data = await res.json();

            console.log(data);

            if (res.ok) {
                toast.success("Car Updated Successfully");
            } else {
                toast.error(data?.message || "Failed To Update");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <Modal>
            <Button className="h-11 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-5 text-xs font-bold uppercase tracking-[2px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20">
                <HiOutlinePencilSquare size={18} />
                Edit Car
            </Button>

            <Modal.Backdrop className="bg-black/70 backdrop-blur-md">

                <Modal.Container placement="auto">

                    <Modal.Dialog className="overflow-hidden rounded-[34px] border border-white/10 bg-linear-to-b from-[#111111] to-[#090909] shadow-[0_0_60px_rgba(0,0,0,0.45)] sm:max-w-4xl">

                        <div className="border-b border-white/5 px-6 py-6 md:px-8">

                            <div className="flex items-start justify-between gap-5">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/10 bg-[#b89b65]/10 text-[#d6bb84]">
                                        <IoCarSportOutline size={28} />
                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-[4px] text-[#b89b65]">
                                            Update Listing
                                        </p>

                                        <h2 className="mt-2 text-3xl font-black text-white">
                                            Edit {carName}
                                        </h2>

                                        <p className="mt-3 max-w-xl text-sm leading-7 text-gray-400">
                                            Update your luxury vehicle information and keep your listing fresh.
                                        </p>

                                    </div>

                                </div>

                                <Modal.CloseTrigger className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 hover:bg-white/10 hover:text-white" />

                            </div>

                        </div>

                        <Modal.Body className="p-5 md:p-8">

                            <Surface className="rounded-[30px] border border-white/5 bg-white/2 p-5 md:p-7">

                                <form onSubmit={onSubmit} className="space-y-7">

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                                        <TextField
                                            name="carName"
                                            defaultValue={carName}
                                            isRequired
                                            className="md:col-span-2"
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Car Name
                                            </Label>

                                            <Input
                                                placeholder="Enter Car Name"
                                                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                        <TextField
                                            name="dailyRentPrice"
                                            defaultValue={dailyRentPrice}
                                            type="number"
                                            isRequired
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Daily Rent Price
                                            </Label>

                                            <Input
                                                placeholder="Enter Price"
                                                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                        <div>

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Car Type
                                            </Label>

                                            <Select
                                                name="carType"
                                                defaultSelectedKeys={[carType]}
                                                placeholder="Select Car Type"
                                            >

                                                <Select.Trigger className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>

                                                <Select.Popover>

                                                    <ListBox>
                                                        <ListBox.Item id="SUV">SUV</ListBox.Item>
                                                        <ListBox.Item id="Sedan">Sedan</ListBox.Item>
                                                        <ListBox.Item id="Hatchback">Hatchback</ListBox.Item>
                                                        <ListBox.Item id="Luxury">Luxury</ListBox.Item>
                                                        <ListBox.Item id="Coupe">Coupe</ListBox.Item>
                                                        <ListBox.Item id="Pickup">Pickup</ListBox.Item>
                                                        <ListBox.Item id="Van">Van</ListBox.Item>
                                                        <ListBox.Item id="Electric">Electric</ListBox.Item>
                                                    </ListBox>

                                                </Select.Popover>

                                            </Select>

                                        </div>

                                        <TextField
                                            name="seatCapacity"
                                            defaultValue={seatCapacity}
                                            type="number"
                                            isRequired
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Seat Capacity
                                            </Label>

                                            <Input
                                                placeholder="Seat Capacity"
                                                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                        <TextField
                                            name="pickupLocation"
                                            defaultValue={pickupLocation}
                                            isRequired
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Pickup Location
                                            </Label>

                                            <Input
                                                placeholder="Pickup Location"
                                                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                        <TextField
                                            name="imageUrl"
                                            defaultValue={imageUrl}
                                            isRequired
                                            className="md:col-span-2"
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Image URL
                                            </Label>

                                            <Input
                                                placeholder="https://example.com/image.jpg"
                                                className="h-14 rounded-2xl border border-white/10 bg-white/5 px-5 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                        <TextField
                                            name="description"
                                            defaultValue={description}
                                            isRequired
                                            className="md:col-span-2"
                                        >

                                            <Label className="mb-3 block text-xs uppercase tracking-[3px] text-gray-500">
                                                Description
                                            </Label>

                                            <TextArea
                                                placeholder="Describe your car..."
                                                className="min-h-36 rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-gray-500"
                                            />

                                            <FieldError />

                                        </TextField>

                                    </div>

                                    <div className="flex items-center justify-between rounded-[28px] border border-white/10 bg-white/3 px-6 py-5">

                                        <div>

                                            <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                                Availability Status
                                            </p>

                                            <p className="mt-2 text-sm text-gray-400">
                                                Current Status :
                                                <span
                                                    className={`ml-2 font-bold ${
                                                        isAvailable
                                                            ? "text-emerald-400"
                                                            : "text-red-400"
                                                    }`}
                                                >
                                                    {isAvailable
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </span>
                                            </p>

                                        </div>

                                        <label className="relative inline-flex cursor-pointer items-center">

                                            <input
                                                type="checkbox"
                                                checked={isAvailable}
                                                onChange={(e) =>
                                                    setIsAvailable(e.target.checked)
                                                }
                                                className="peer sr-only"
                                            />

                                            <div className="h-8 w-15 rounded-full bg-gray-700 transition-all duration-300 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-white after:transition-all after:duration-300 peer-checked:bg-[#b89b65] peer-checked:after:translate-x-7"></div>

                                        </label>

                                    </div>

                                    <div className="flex flex-col gap-4 border-t border-white/5 pt-7 sm:flex-row sm:justify-end">

                                        <Button
                                            slot="close"
                                            className="h-14 rounded-2xl border border-white/10 bg-white/5 px-7 text-xs font-bold uppercase tracking-[3px] text-gray-300 transition-all duration-300 hover:bg-white/10"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            slot="close"
                                            type="submit"
                                            className="h-14 rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 px-8 text-xs font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20"
                                        >
                                            Save Changes
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

export default EditMyCarDetels;