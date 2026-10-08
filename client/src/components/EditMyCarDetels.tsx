"use client";

import React, { useState } from "react";


import { HiOutlinePencilSquare } from "react-icons/hi2";
import { IoCarSportOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { updateCarById } from "@/services/my_cars";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

type EditMyCarDetelsProps = {
    car?: {
        _id?: string;
        availabilityStatus?: string;
        carName?: string;
        dailyRentPrice?: number | string;
        seatCapacity?: number | string;
        pickupLocation?: string;
        imageUrl?: string;
        description?: string;
        carType?: string;
    };
};

const EditMyCarDetels = ({ car }: EditMyCarDetelsProps) => {
    const { carName, dailyRentPrice, carType, seatCapacity, pickupLocation, imageUrl, description } = car ?? {}

    const [isAvailable, setIsAvailable] = useState(
        car?.availabilityStatus === "Available"
    );
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!car?._id) {
            toast.error("Invalid Car ID");
            return;
        }
        const formData = new FormData(e.currentTarget);
        const updatedCar = Object.fromEntries(formData.entries());
        updatedCar.availabilityStatus = isAvailable ? "Available" : "Unavailable";
        try {
            const { ok, data } = await updateCarById(car._id, updatedCar);

            if (ok) {
                toast.success("Car Updated Successfully");
            } else {
                toast.error(data?.message || "Failed To Update");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong");
        }
    };

    return (
        <Dialog>
            <DialogTrigger
                render={
                    <Button className="h-11 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-5 text-xs font-bold uppercase tracking-[2px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20" />
                }
            >
                <HiOutlinePencilSquare size={18} />
                Edit Car
            </DialogTrigger>

            <DialogContent
                showCloseButton={false}
                className="overflow-hidden rounded-[34px] border border-border bg-card p-0 text-foreground shadow-xl sm:max-w-4xl"
            >
                <div className="border-b border-border px-6 py-6 md:px-8">
                    <div className="flex items-start justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-[#b89b65]/20 bg-[#b89b65]/10 text-[#8A672A] dark:text-[#d6bb84]">
                                <IoCarSportOutline size={28} />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[4px] text-[#8A672A] dark:text-[#b89b65]">
                                    Update Listing
                                </p>

                                <DialogTitle className="mt-2 text-3xl font-black text-foreground">
                                    Edit {carName}
                                </DialogTitle>

                                <DialogDescription className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                                    Update your luxury vehicle information and keep your listing fresh.
                                </DialogDescription>
                            </div>
                        </div>

                        <DialogClose
                            aria-label="Close dialog"
                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground"
                        >
                            <X size={18} />
                        </DialogClose>
                    </div>
                </div>

                <div className="p-5 md:p-8">
                    <div className="rounded-[30px] border border-border bg-background p-5 md:p-7">
                        <form onSubmit={onSubmit} className="space-y-7">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <Field className="gap-0 md:col-span-2">
                                    <FieldLabel
                                        htmlFor="carName"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Car Name
                                    </FieldLabel>

                                    <Input
                                        id="carName"
                                        name="carName"
                                        defaultValue={carName}
                                        required
                                        placeholder="Enter Car Name"
                                        className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>

                                <Field className="gap-0">
                                    <FieldLabel
                                        htmlFor="dailyRentPrice"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Daily Rent Price
                                    </FieldLabel>

                                    <Input
                                        id="dailyRentPrice"
                                        name="dailyRentPrice"
                                        defaultValue={String(dailyRentPrice ?? "")}
                                        type="number"
                                        required
                                        placeholder="Enter Price"
                                        className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>

                                <Field className="gap-0">
                                    <FieldLabel
                                        htmlFor="carType"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Car Type
                                    </FieldLabel>

                                    <Select
                                        name="carType"
                                        defaultValue={carType ? String(carType) : undefined}
                                    >
                                        <SelectTrigger
                                            id="carType"
                                            className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground"
                                        >
                                            <SelectValue placeholder="Select Car Type" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="SUV">SUV</SelectItem>
                                            <SelectItem value="Sedan">Sedan</SelectItem>
                                            <SelectItem value="Hatchback">Hatchback</SelectItem>
                                            <SelectItem value="Luxury">Luxury</SelectItem>
                                            <SelectItem value="Coupe">Coupe</SelectItem>
                                            <SelectItem value="Pickup">Pickup</SelectItem>
                                            <SelectItem value="Van">Van</SelectItem>
                                            <SelectItem value="Electric">Electric</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </Field>

                                <Field className="gap-0">
                                    <FieldLabel
                                        htmlFor="seatCapacity"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Seat Capacity
                                    </FieldLabel>

                                    <Input
                                        id="seatCapacity"
                                        name="seatCapacity"
                                        defaultValue={String(seatCapacity ?? "")}
                                        type="number"
                                        required
                                        placeholder="Seat Capacity"
                                        className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>

                                <Field className="gap-0">
                                    <FieldLabel
                                        htmlFor="pickupLocation"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Pickup Location
                                    </FieldLabel>

                                    <Input
                                        id="pickupLocation"
                                        name="pickupLocation"
                                        defaultValue={pickupLocation}
                                        required
                                        placeholder="Pickup Location"
                                        className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>

                                <Field className="gap-0 md:col-span-2">
                                    <FieldLabel
                                        htmlFor="imageUrl"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Image URL
                                    </FieldLabel>

                                    <Input
                                        id="imageUrl"
                                        name="imageUrl"
                                        defaultValue={imageUrl}
                                        required
                                        placeholder="https://example.com/image.jpg"
                                        className="h-14 rounded-2xl border border-input bg-card px-5 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>

                                <Field className="gap-0 md:col-span-2">
                                    <FieldLabel
                                        htmlFor="description"
                                        className="mb-3 text-xs uppercase tracking-[3px] text-muted-foreground"
                                    >
                                        Description
                                    </FieldLabel>

                                    <Textarea
                                        id="description"
                                        name="description"
                                        defaultValue={description}
                                        required
                                        placeholder="Describe your car..."
                                        className="min-h-36 rounded-3xl border border-input bg-card px-5 py-4 text-foreground placeholder:text-muted-foreground"
                                    />

                                    <FieldError />
                                </Field>
                            </div>

                            <div className="flex items-center justify-between rounded-[28px] border border-border bg-background px-6 py-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[3px] text-muted-foreground">
                                        Availability Status
                                    </p>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Current Status :
                                        <span
                                            className={`ml-2 font-bold ${isAvailable ? "text-emerald-400" : "text-red-400"
                                                }`}
                                        >
                                            {isAvailable ? "Available" : "Unavailable"}
                                        </span>
                                    </p>
                                </div>

                                <label className="relative inline-flex cursor-pointer items-center">
                                    <input
                                        type="checkbox"
                                        checked={isAvailable}
                                        onChange={(e) => setIsAvailable(e.target.checked)}
                                        className="peer sr-only"
                                    />

                                    <div className="h-8 w-15 rounded-full bg-muted transition-all duration-300 after:absolute after:left-1 after:top-1 after:h-6 after:w-6 after:rounded-full after:bg-card after:transition-all after:duration-300 peer-checked:bg-[#b89b65] peer-checked:after:translate-x-7" />
                                </label>
                            </div>

                            <div className="flex flex-col gap-4 border-t border-border pt-7 sm:flex-row sm:justify-end">
                                <DialogClose
                                    render={
                                        <Button className="h-14 rounded-2xl border border-border bg-background px-7 text-xs font-bold uppercase tracking-[3px] text-foreground transition-all duration-300 hover:bg-muted" />
                                    }
                                >
                                    Cancel
                                </DialogClose>

                                <DialogClose
                                    render={
                                        <Button
                                            type="submit"
                                            className="h-14 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-8 text-xs font-bold uppercase tracking-[3px] text-[#8A672A] transition-all duration-300 hover:bg-[#b89b65]/20 dark:text-[#d6bb84]"
                                        />
                                    }
                                >
                                    Save Changes
                                </DialogClose>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditMyCarDetels;