import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Nothing from "@/assets/NothingToShow.png";
import Link from "next/link";
import Image from "next/image";
import DeleteBookingCar from "../component/DeleteBookingCar";
import { Button } from "@heroui/react";
import { IoCalendarOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { HiOutlineArrowRight } from "react-icons/hi";

const MyBookingsCarsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`, {
        cache: 'no-store'
    });

    const bookiingCarData = await res.json();

    const safeData = Array.isArray(bookiingCarData) ? bookiingCarData : [];

    return (
        <section className="min-h-screen bg-[#050505] py-12 text-white">

            <div className="container mx-auto max-w-7xl px-4 md:px-6">

                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">

                    <div>

                        <p className="text-xs uppercase tracking-[5px] text-[#b89b65]">
                            Premium Reservations
                        </p>

                        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                            My Bookings
                        </h1>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
                            Track all your luxury vehicle reservations and booking schedules in one place.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                        <p className="text-xs uppercase tracking-[4px] text-gray-500">
                            Total Reservations
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-white">
                            {safeData.length}
                        </h2>
                    </div>

                </div>

                {safeData.length === 0 ? (

                    <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] px-6 py-20 text-center">

                        <div className="relative aspect-square w-full max-w-[260px]">
                            <Image
                                src={Nothing}
                                alt="No items found"
                                fill
                                priority
                                sizes="(max-width:768px) 100vw, 300px"
                                className="object-contain opacity-90"
                            />
                        </div>

                        <h2 className="mt-8 text-3xl font-black text-white">
                            No Bookings Yet
                        </h2>

                        <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                            You haven't reserved any premium vehicles yet. Explore our luxury collection and make your first booking.
                        </p>

                        <Link href="/explore-cars">

                            <Button className="mt-8 h-13 rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 px-8 text-sm font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20">
                                Explore Cars
                            </Button>

                        </Link>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-8">

                        {safeData.map((booking) => (

                            <div key={booking._id} className="group overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_40px_rgba(0,0,0,0.35)]">

                                <div className="grid grid-cols-1 lg:grid-cols-12">

                                    <div className="relative h-[280px] overflow-hidden lg:col-span-5">

                                        <Image
                                            alt={booking?.carName}
                                            src={booking?.carImg}
                                            fill
                                            sizes="(max-width:1024px) 100vw, 40vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                        <div className="absolute left-5 top-5 rounded-full border border-[#b89b65]/15 bg-black/30 px-4 py-2 backdrop-blur-md">
                                            <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#d6bb84]">
                                                Reserved
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex flex-col justify-between p-6 lg:col-span-7 lg:p-8">

                                        <div>

                                            <div className="flex items-start justify-between gap-5">

                                                <div>

                                                    <p className="text-xs uppercase tracking-[5px] text-[#b89b65]">
                                                        Luxury Booking
                                                    </p>

                                                    <h2 className="mt-3 text-3xl font-black text-white">
                                                        {booking?.carName}
                                                    </h2>

                                                </div>

                                                <DeleteBookingCar booking={booking} />

                                            </div>

                                            <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400">
                                                You have successfully reserved the {booking?.carName} for your selected schedule.
                                            </p>

                                            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

                                                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-[#d6bb84]">
                                                        <IoCalendarOutline size={20} />
                                                    </div>

                                                    <div>

                                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                                            Booking Dates
                                                        </p>

                                                        <h3 className="mt-1 text-sm font-bold text-white">
                                                            {booking?.startDate} - {booking?.endDate}
                                                        </h3>

                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-[#d6bb84]">
                                                        <LuUsers size={20} />
                                                    </div>

                                                    <div>

                                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                                            Total Guests
                                                        </p>

                                                        <h3 className="mt-1 text-sm font-bold text-white">
                                                            {booking?.people} People
                                                        </h3>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">

                                            <p className="text-sm leading-7 text-gray-500">
                                                Booking confirmation secured and protected for your selected rental schedule.
                                            </p>

                                            <Link href={`explore-cars/${booking?.carId}`}>

                                                <Button className="h-13 rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/10 px-7 text-sm font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20">

                                                    <span>
                                                        View Details
                                                    </span>

                                                    <HiOutlineArrowRight size={18} />

                                                </Button>

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
};

export default MyBookingsCarsPage;