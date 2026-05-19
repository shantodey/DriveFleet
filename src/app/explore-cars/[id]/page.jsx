import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoPeople } from 'react-icons/go';
import { GrMapLocation } from 'react-icons/gr';
import { LuUsers } from 'react-icons/lu';
import BookCarCard from '@/app/component/BookCarCard';

const ViewCarsPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars/${id}`, {
        cache: 'no-store'
    });
    const car = await res.json();
    const {carName,imageUrl,carType,description,seatCapacity}=car
    return (
        <section className="mx-auto container px-6 md:px-12 py-12 min-h-screen">

            <div className="mb-8 text-sm text-gray-500">
                <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                <span className="mx-2">/</span>
                <Link href="/explore-cars" className="hover:text-gray-900 transition-colors">Available Cars</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">{car.carName}</span>
            </div>


            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
                <div className="lg:col-span-7 w-full">
                    <div className="relative h-87 sm:h-112 md:h-130 w-full overflow-hidden rounded-3xl bg-gray-50 shadow-sm">
                        <Image src={imageUrl} alt={carName} fill priority sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover object-center" />
                        <span className={`absolute left-6 top-6 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white shadow-md ${
                            car.availabilityStatus === 'Available' ? 'bg-emerald-500' : 'bg-red-500'
                        }`}>
                            {car.availabilityStatus}
                        </span>
                    </div>
                </div>

                <div className="lg:col-span-5 w-full space-y-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400"> {carType} </span>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl mt-1"> {carName} </h1>
                        <p className="mt-4 text-base leading-relaxed text-gray-600"> {description} </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-6">
                        <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl">
                            <div className="text-gray-400">
                                <LuUsers/>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">Capacity</span>
                                <span className="text-sm font-bold text-gray-800">{seatCapacity} Seats</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-gray-50 p-3.5 rounded-2xl">
                            <div className="text-gray-400">
                               <GrMapLocation/>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block font-medium">Location</span>
                                <span className="text-sm font-bold text-gray-800 truncate block max-w-35">{car.pickupLocation}</span>
                            </div>
                        </div>
                    </div>

                    {/* Price & Action Box */}
                    <div className="bg-gray-950 text-white p-6 rounded-3xl shadow-xl space-y-6">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-semibold text-gray-400">Daily Rental Rate</span>
                            <div className="text-right">
                                <span className="text-3xl font-black tracking-tight">${car.dailyRentPrice}</span>
                                <span className="text-xs font-medium text-gray-400 block">per day</span>
                            </div>
                        </div>

                        {car.availabilityStatus === 'Available' ? (
                            <BookCarCard/>
                        ) : (
                            <button  disabled
                                className="w-full rounded-2xl bg-gray-800 px-6 py-4 text-sm font-bold text-gray-500 cursor-not-allowed" >
                                Currently Unavailable
                            </button>
                        )}
                        
                        <p className="text-center text-[11px] text-gray-500 font-medium">
                            Secure checkout protected by JWT & instant host confirmation.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ViewCarsPage;