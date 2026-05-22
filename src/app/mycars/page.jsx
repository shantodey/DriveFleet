import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Nothing from "@/assets/NothingToShow.png";
import { IoLocationOutline } from "react-icons/io5";
import { LuUsers } from "react-icons/lu";
import { HiOutlineArrowRight } from "react-icons/hi";
import EditMyCarDetels from "../component/EditMyCarDetels";
import DeleteMyAddCar from "../component/DeleteMyAddCar";

const MyAddedCars = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${user.id}`, {
        cache: 'no-store'
    });
    const myCars = await res.json();

    return (
        <section className="min-h-screen bg-[#050505] py-12 text-white">

            <div className="container mx-auto max-w-7xl px-4 md:px-6">

                <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">

                    <div>
                        <p className="text-xs uppercase tracking-[5px] text-[#b89b65]">  Garage Collection </p>
                        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl"> My Added Cars </h1>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400">
                            Manage and monitor all luxury vehicles you have added to your collection.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/3 px-5 py-4 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[4px] text-gray-500">
                            Total Cars
                        </p>

                        <h2 className="mt-2 text-3xl font-black text-white">
                            {myCars.length}
                        </h2>
                    </div>

                </div>

                {myCars.length === 0 ? (

                    <div className="flex flex-col items-center justify-center rounded-[32px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] px-6 py-20 text-center">

                        <div className="relative aspect-square w-full max-w-65">
                            <Image src={Nothing} alt="No items found" fill priority sizes="(max-width:768px) 100vw, 300px" className="object-contain opacity-90"
                            />
                        </div>

                        <h2 className="mt-8 text-3xl font-black text-white">  Nothing To Show</h2>

                        <p className="mt-4 max-w-md text-sm leading-7 text-gray-400">
                            You haven't added any luxury cars to your collection yet.
                        </p>

                        <Link href="/add-car">
                            <Button className="mt-8 h-13 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-8 text-sm font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20">
                                Add Your First Car
                            </Button>
                        </Link>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-7">

                        {myCars.map((car) => (

                            <div key={car._id} className="group overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-b from-[#111111] to-[#090909] transition-all duration-500 hover:border-white/15 hover:shadow-[0_0_40px_rgba(0,0,0,0.35)]">

                                <div className="grid grid-cols-1 lg:grid-cols-12">

                                    <div className="relative h-[260px] overflow-hidden lg:col-span-4">

                                        <Image
                                            src={car.imageUrl}
                                            alt={car.carName}
                                            fill
                                            sizes="(max-width:1024px) 100vw, 40vw"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                        <span className={`absolute left-5 top-5 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[3px] backdrop-blur-md ${car.availabilityStatus === 'Available' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400' : 'border-red-500/20 bg-red-500/10 text-red-400'}`}>
                                            {car.availabilityStatus}
                                        </span>

                                    </div>

                                    <div className="flex flex-col justify-between p-6 lg:col-span-8 lg:p-8">
                                        <div>
                                            <div className="flex flex-wrap items-start justify-between gap-5">
                                                <div>

                                                    <p className="text-xs uppercase tracking-[5px] text-[#b89b65]"> {car.carType} </p>
                                                    <h2 className="mt-3 text-3xl font-black text-white">  {car.carName} </h2>
                                                </div>
                                                 <div className="rounded-2xl border border-[#b89b65]/10 bg-[#b89b65]/5 px-5 py-4">
                                                    <p className="text-xs uppercase tracking-[3px] text-gray-500"> Daily Rental </p>
                                                    <div className="mt-2 flex items-end gap-1">
                                                        <span className="text-lg font-semibold text-[#d6bb84]">  $</span>
                                                        <span className="text-4xl font-black text-white"> {car.dailyRentPrice}</span>
                                                        <span className="mb-1 text-sm text-gray-500"> /day </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-between gap-5">
sdf
                                                   <DeleteMyAddCar car={car}/>

                                                </div>
                                               

                                            </div>

                                            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">

                                                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-[#d6bb84]">
                                                        <LuUsers size={20} />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                                            Capacity
                                                        </p>

                                                        <h3 className="mt-1 text-base font-bold text-white">
                                                            {car.seatCapacity} Seats
                                                        </h3>
                                                    </div>

                                                </div>

                                                <div className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

                                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] text-[#d6bb84]">
                                                        <IoLocationOutline size={20} />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs uppercase tracking-[3px] text-gray-500">
                                                            Pickup Location
                                                        </p>

                                                        <h3 className="mt-1 line-clamp-1 text-base font-bold text-white">
                                                            {car.pickupLocation}
                                                        </h3>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        <div className="mt-8 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">

                                            <p className="max-w-xl text-sm leading-7 text-gray-400">
                                                Premium luxury vehicle available for customer booking and daily rentals.
                                            </p>
                                            <EditMyCarDetels car={car} />
                                            <Link href={`/explore-cars/${car._id}`}>
                                                <Button className="h-13 rounded-2xl border border-[#b89b65]/15 bg-[#b89b65]/10 px-7 text-sm font-bold uppercase tracking-[3px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20">
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

export default MyAddedCars;