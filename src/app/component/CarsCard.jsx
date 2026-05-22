'use client';

import Image from "next/image";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { HiArrowRight } from "react-icons/hi";

const CarsCard = ({ car }) => {
    const { _id, imageUrl, carName, dailyRentPrice, location, category } = car;

    return (
        <Link href={`explore-cars/${_id}`}>
            <div className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0B0B0B] transition-all duration-500 hover:-translate-y-2 hover:border-[#C8A96B]/40 hover:shadow-[0_0_40px_rgba(200,169,107,0.12)]">

                <div className="relative h-70 overflow-hidden">
                    <Image  src={imageUrl}  alt={carName}  fill className="object-cover transition-transform duration-700 group-hover:scale-110"/>

                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                    <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-[#C8A96B]/30 bg-[#C8A96B]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[2px] text-[#E5C98B] backdrop-blur-md">
                            {category || "Luxury"}
                        </span>
                    </div>

                    <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/40 hover:text-red-500">
                        <GiSelfLove size={16} />
                    </button>

                    <div className="absolute bottom-0 left-0 w-full p-5">
                        <div className="flex items-end justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    {carName}
                                </h2>

                                <div className="mt-3 flex items-center gap-4 text-sm text-gray-300">
                                    <div className="flex items-center gap-1.5">
                                        <MdOutlineAirlineSeatReclineNormal size={16} />
                                        <span>5 Seats</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <IoLocationOutline size={16} />
                                        <span>{location || "Dhaka"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C8A96B] text-black transition-transform duration-300 group-hover:translate-x-1">
                                <HiArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 bg-linear-to-b from-[#111111] to-[#0A0A0A] px-5 py-5">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                Daily Rental
                            </p>

                            <div className="mt-2 flex items-end gap-1">
                                <span className="text-lg font-medium text-[#C8A96B]">$</span>

                                <span className="text-3xl font-black text-white">
                                    {dailyRentPrice}
                                </span>

                                <span className="mb-1 text-sm text-gray-400">
                                    /day
                                </span>
                            </div>
                        </div>

                        <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-emerald-400">
                            Available
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CarsCard;