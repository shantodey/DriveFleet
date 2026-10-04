'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const categories = [
    { id: "SUV", label: "SUV" },
    { id: "Sedan", label: "Sedan" },
    { id: "Hatchback", label: "Hatchback" },
    { id: "Luxury", label: "Luxury" },
    { id: "Coupe", label: "Coupe" },
    { id: "Pickup", label: "Pickup" },
    { id: "Van", label: "Van" },
    { id: "Electric", label: "Electric" },
];

const SearchComponent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateParams = (key: string, value: string | null | undefined) => {
        const params = new URLSearchParams(searchParams.toString());

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
                    <h2 className="mt-2 text-2xl font-black text-white md:text-3xl"> Search Premium Cars</h2>
                </div>

                <div className="hidden h-14 w-14 items-center justify-center rounded-2xl border border-[#C8A96B]/20 bg-[#C8A96B]/10 text-[#C8A96B] md:flex">
                    <HiOutlineAdjustmentsHorizontal size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <div className="space-y-3">
                        <Label className="block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                            Search Car
                        </Label>

                        <div className="relative flex h-17 items-center overflow-hidden rounded-2xl border border-white/10 bg-white/3 px-5 transition-all duration-300 hover:border-[#C8A96B]/40 focus-within:border-[#C8A96B] focus-within:bg-[#C8A96B]/[0.03]">
                            <div className="mr-4 text-2xl text-[#C8A96B]">
                                <IoSearchOutline />
                            </div>

                            <Input
                                type="text"
                                defaultValue={searchParams.get('q') || ""}
                                onChange={(e) => updateParams('q', e.target.value)}
                                placeholder="Search Ferrari, Rolls Royce, Lamborghini..."
                                className="h-full w-full border-none bg-transparent p-0 text-base font-medium text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5">
                    <div className="space-y-3">
                        <Label className="block text-xs font-semibold uppercase tracking-[4px] text-gray-500">
                            Car Category
                        </Label>

                        <Select
                            value={searchParams.get('t') || ""}
                            onValueChange={(value) => updateParams('t', value)}
                        >
                            <SelectTrigger className="flex h-17 w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-left text-base font-medium text-white transition-all duration-300 hover:border-[#C8A96B]/40 focus:border-[#C8A96B] focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-gray-500">
                                <SelectValue placeholder="Select car type" />
                            </SelectTrigger>

                            <SelectContent className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl">
                                {categories.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.id}
                                        className="rounded-xl px-4 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-[#C8A96B]/10 hover:text-white focus:bg-[#C8A96B]/10 focus:text-white cursor-pointer"
                                    >
                                        {item.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;