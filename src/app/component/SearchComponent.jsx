'use client';

import { Label, ListBox, Select, SearchField } from "@heroui/react";
import { useRouter, useSearchParams } from 'next/navigation';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const SearchComponent = () => {
    const router = useRouter();

    const searchParams = useSearchParams();

    const updateParams = (key, value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`);
    };

    return (
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111111]/95 to-[#080808]/95 p-5 md:p-7 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.35)]">

            <div className="mb-7 flex items-center justify-between gap-4">

                <div>
                    <p className="text-xs uppercase tracking-[5px] text-[#C8A96B]"> Find Your Ride </p>
                    <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">  Search Premium Cars</h2>
                </div>

                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-[#C8A96B]/20 bg-[#C8A96B]/10 text-[#C8A96B] md:flex">
                    <HiOutlineAdjustmentsHorizontal size={24} />
                </div>

            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">

                <div className="lg:col-span-7">

                    <SearchField
                        name="search"
                        defaultValue={searchParams.get('q') || ""}
                        onChange={(value) => updateParams('q', value)}
                        className="w-full"
                    >

                        <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                            Search Car
                        </Label>

                        <SearchField.Group className="flex h-17 items-center overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-5  transition-all duration-300 hover:border-[#C8A96B]/40 focus-within:border-[#C8A96B] focus-within:bg-[#C8A96B]/[0.03]">

                            <div className="mr-4 text-2xl text-[#C8A96B]">
                                <IoSearchOutline />
                            </div>

                            <SearchField.Input  placeholder="Search Ferrari, Rolls Royce, Lamborghini..."
                                className="w-full border-none bg-transparent text-base font-medium text-white placeholder:text-gray-500 focus:outline-none "
                            />

                            <SearchField.ClearButton className="text-gray-500 hover:text-white" />
                        </SearchField.Group>

                    </SearchField>

                </div>

                <div className="lg:col-span-5">

                    <Select  name="carType"  placeholder="Select car type" selectedKey={searchParams.get('t')}   onSelectionChange={(key) => updateParams('t', key)} className="w-full"  >

                        <Label className="mb-3 block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                            Car Category
                        </Label>
                        <Select.Trigger className="flex h-17 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-left transition-all duration-300 hover:border-[#C8A96B]/40 focus:border-[#C8A96B]">
                            <Select.Value className="text-base font-medium text-white data-[placeholder]:text-gray-500" />
                            <Select.Indicator className="text-[#C8A96B]" />
                        </Select.Trigger>

                        <Select.Popover className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl">

                            <ListBox className="space-y-1">

                                <ListBox.Item id="SUV" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white">   SUV </ListBox.Item>
                                <ListBox.Item id="Sedan" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white">  Sedan</ListBox.Item>
                                <ListBox.Item id="Hatchback" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white">   Hatchback</ListBox.Item>
                                <ListBox.Item id="Luxury" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white"> Luxury </ListBox.Item>
                                <ListBox.Item id="Coupe" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white">  Coupe </ListBox.Item>
                                <ListBox.Item id="Pickup" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white"> Pickup</ListBox.Item>
                                <ListBox.Item id="Van" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white"> Van </ListBox.Item>
                                <ListBox.Item id="Electric" className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white">   Electric</ListBox.Item>

                            </ListBox>

                        </Select.Popover>

                    </Select>

                </div>

            </div>

        </div>
    );
};

export default SearchComponent;