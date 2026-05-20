"use client";

import { FieldError, Input, Label, TextField, Select, ListBox, TextArea, Button } from "@heroui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";



const AddCarPage = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const addCar = Object.fromEntries(formData.entries());
    
    addCar.availabilityStatus = isAvailable ? "Available" : "Unavailable";
    
    console.log("Final Form Data:", addCar);

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(addCar)
    });
    
    const data = await res.json();
    if (res.ok) {
        toast.success(data.message || 'Success');
        redirect('/')
    } else {
        toast.error(data.message || 'Error');
    }
}

  return (
        <div className="container mx-auto">
            <h2 className="text-3xl ps-5">Add New Car Listing</h2>
            <form onSubmit={onSubmit} className="max-w-2xl mx-auto p-10 space-y-8 shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div className="md:col-span-2">
                        <TextField name="carName" isRequired>
                            <Label>Car Name</Label>
                            <Input placeholder="e.g. Toyota Fortuner" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                    </div>

                    <TextField name="dailyRentPrice" type="number" isRequired>
                        <Label>Daily Rent Price (USD)</Label>
                        <Input type="number" placeholder="e.g. 85" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    <div>
                        <Select
                            name="carType"
                            isRequired
                            className="w-full"
                            placeholder="Select car type"
                        >
                            <Label>Car Type</Label>
                            <Select.Trigger className="rounded-2xl">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                                <ListBox>
                                    <ListBox.Item id="SUV" textValue="SUV">SUV<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Sedan" textValue="Sedan">Sedan<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Hatchback" textValue="Hatchback">Hatchback<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Luxury" textValue="Luxury">Luxury<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Coupe" textValue="Coupe">Coupe<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Pickup" textValue="Pickup">Pickup<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Van" textValue="Van">Van<ListBox.ItemIndicator /></ListBox.Item>
                                    <ListBox.Item id="Electric" textValue="Electric">Electric<ListBox.ItemIndicator /></ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <TextField name="seatCapacity" type="number" isRequired>
                        <Label>Seat Capacity</Label>
                        <Input type="number" placeholder="e.g. 5" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    <TextField name="pickupLocation" isRequired>
                        <Label>Pickup Location</Label>
                        <Input placeholder="e.g. Dhaka, Gulshan" className="rounded-2xl" />
                        <FieldError />
                    </TextField>

                    <div className="md:col-span-2">
                        <TextField name="imageUrl" isRequired>
                            <Label>Image URL</Label>
                            <Input
                                type="url"
                                placeholder="https://i.ibb.co/your-image.jpg"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>

                    <div className="md:col-span-2">
                        <TextField name="description" isRequired>
                            <Label>Description</Label>
                            <TextArea
                                placeholder="Describe the car — condition, features, rules, etc."
                                className="rounded-3xl"
                            />
                            <FieldError />
                        </TextField>
                    </div>


                    <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 p-5 transition-all duration-200 hover:border-gray-300">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="availabilityStatus" className="text-sm font-semibold text-gray-950 cursor-pointer select-none">
                                Availability Status
                            </label>
                            <span className="text-xs text-gray-500">
                                Current Status: <span className={`font-medium ${isAvailable ? 'text-green-600' : 'text-red-500'}`}>{isAvailable ? "Available" : "Unavailable"}</span>
                            </span>
                        </div>

                        <label className="relative inline-flex items-center cursor-pointer select-none">
                            
                            <input
                                id="availabilityStatus"
                                name="availabilityStatus"
                                type="checkbox"
                                value="Available"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-cyan-500/30 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-cyan-500"></div>
                        </label>
                    </div>

                </div>

                <Button  type="submit"  variant="outline"  className="rounded-none w-full bg-cyan-500 text-white"> Add Car Listing </Button>
            </form>
        </div>
  );
};

export default AddCarPage;