import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GrMapLocation } from 'react-icons/gr';
import { LuUsers } from 'react-icons/lu';
import { MdOutlineSpeed } from 'react-icons/md';
import { PiSteeringWheelBold } from 'react-icons/pi';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import BookCarCard from '@/app/component/BookCarCard';

const ViewCarsPage = async ({ params }) => {
    const { id } = await params;

    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        cache: 'no-store'
    });

    const car = await res.json();

    const { carName, imageUrl, carType, description, seatCapacity } = car;

    return (
        <section className="min-h-screen bg-[#050505] text-white">

            <div className="relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0">
                    <Image  src={imageUrl} alt={carName}  fill  priority  className="object-cover opacity-25 blur-[2px]"/>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/85 to-[#050505]" />
                </div>

                <div className="relative container mx-auto px-4 md:px-6 py-14">
                    <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-gray-400">
                        <Link href="/" className="transition-all duration-300 hover:text-[#C8A96B]">  Home</Link>
                         <span>/</span>
                        <Link href="/explore-cars" className="transition-all duration-300 hover:text-[#C8A96B]">  Available Cars</Link>
                        <span>/</span>
                        <span className="font-medium text-white"> {car.carName}</span>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111111] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <div className="relative h-[300px] sm:h-[450px] lg:h-[620px] overflow-hidden">
                                    <Image   src={imageUrl}  alt={carName}  fill priority sizes="(max-width:1024px) 100vw, 60vw"  className="object-cover transition-transform duration-700 group-hover:scale-105"/>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                    <span className={`absolute left-6 top-6 rounded-full border px-5 py-2 text-xs font-black uppercase tracking-[3px] backdrop-blur-md ${car.availabilityStatus === 'Available' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
                                        {car.availabilityStatus}
                                    </span>

                                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                                        <div className="flex flex-wrap items-end justify-between gap-6">
                                            <div>
                                                <p className="mb-3 text-xs uppercase tracking-[5px] text-[#C8A96B]"> {carType} </p>
                                                <h1 className="max-w-2xl text-4xl font-black leading-none md:text-6xl"> {carName} </h1>
                                            </div>

                                            <div className="rounded-3xl border border-[#C8A96B]/20 bg-black/40 px-6 py-4 backdrop-blur-xl">
                                                <p className="text-xs uppercase tracking-[3px] text-gray-400">Daily Rental </p>

                                                <div className="mt-1 flex items-end gap-1">
                                                    <span className="text-xl font-semibold text-[#C8A96B]"> $ </span>
                                                    <span className="text-4xl font-black">  {car.dailyRentPrice} </span>
                                                    <span className="mb-1 text-sm text-gray-400"> /day </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">

                                <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-5">
                                    <div className="mb-4 text-2xl text-[#C8A96B]">
                                        <LuUsers />
                                    </div>

                                    <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                        Capacity
                                    </p>

                                    <h3 className="mt-2 text-lg font-bold text-white">
                                        {seatCapacity} Seats
                                    </h3>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-5">
                                    <div className="mb-4 text-2xl text-[#C8A96B]">
                                        <GrMapLocation />
                                    </div>

                                    <p className="text-xs uppercase tracking-[3px] text-gray-500">   Location </p>
                                    <h3 className="mt-2 line-clamp-1 text-lg font-bold text-white">
                                        {car.pickupLocation}
                                    </h3>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-5">
                                    <div className="mb-4 text-2xl text-[#C8A96B]">   <MdOutlineSpeed /></div>
                                    <p className="text-xs uppercase tracking-[3px] text-gray-500">  Performance </p>
                                    <h3 className="mt-2 text-lg font-bold text-white">Premium</h3>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-[#0D0D0D] p-5">
                                    <div className="mb-4 text-2xl text-[#C8A96B]">  <PiSteeringWheelBold /></div>
                                    <p className="text-xs uppercase tracking-[3px] text-gray-500">  Drive </p>
                                    <h3 className="mt-2 text-lg font-bold text-white">  Automatic</h3>
                                </div>

                            </div>

                        </div>

                        <div className="space-y-8 lg:col-span-5">
                            <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] p-7 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
                                <p className="text-xs uppercase tracking-[5px] text-[#C8A96B]">  Luxury Experience </p>
                                <h2 className="mt-4 text-3xl font-black leading-tight text-white">  Drive Beyond Expectations</h2>
                                <p className="mt-5 text-base leading-8 text-gray-400"> {description}</p>
                            </div>

                            <div className="rounded-[32px] border border-[#C8A96B]/10 bg-black p-7 shadow-[0_0_60px_rgba(0,0,0,0.45)]">
                                <div className="flex items-end justify-between border-b border-white/10 pb-6">
                                    <div>
                                        <p className="text-xs uppercase tracking-[4px] text-gray-500">    Daily Rental Rate</p>
                                        <div className="mt-3 flex items-end gap-1">
                                            <span className="text-xl font-semibold text-[#C8A96B]">  $ </span>
                                            <span className="text-5xl font-black text-white">  {car.dailyRentPrice} </span>
                                            <span className="mb-1 text-sm text-gray-400">  /day</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-7">
                                    {car.availabilityStatus === 'Available' ? (
                                        <BookCarCard car={car} />
                                    ) : (
                                        <button disabled  className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-[3px] text-gray-500" >   Currently Unavailable</button>
                                    )}

                                </div>
                                <div className="mt-6 rounded-2xl border border-[#C8A96B]/10 bg-[#C8A96B]/5 p-4">
                                    <p className="text-center text-xs leading-6 text-gray-400">
                                        Secure checkout protected by JWT authentication with instant booking confirmation and premium support.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewCarsPage;