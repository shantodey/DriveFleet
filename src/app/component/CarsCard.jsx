'use client'
import Image from "next/image";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";

import { Card, Chip, Button, Separator } from "@heroui/react";

const CarsCard = ({ car }) => {
    const { _id, imageUrl, carName, dailyRentPrice } = car;

    return (
        <Link href={`explore-cars/${_id}`}>
            <Card
                
                shadow="none"
                className="group w-full rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300"
            >
                <div className="relative h-52 sm:h-56 md:h-64 lg:h-72 w-full overflow-hidden bg-gray-100 rounded-t-3xl">
                    <Image
                        src={imageUrl}
                        alt={carName}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <Button
                        isIconOnly
                        size="sm"
                        className="absolute right-3 top-3 bg-black/25 text-white backdrop-blur-sm hover:text-red-400 hover:bg-black/40 rounded-full"
                        onPress={(e) => e.stopPropagation()}
                    >
                        <GiSelfLove size={16} />
                    </Button>
                    <Chip
                        size="sm"
                        className="absolute bottom-3 left-3 bg-black/30 backdrop-blur-sm text-white text-[11px] font-medium tracking-wide border-none"
                    >
                        Available
                    </Chip>
                </div>

                <div className="flex items-end justify-between px-4 lg:px-5 pt-4 lg:pt-5 pb-3">
                    <div>
                        <p className="text-[15px] lg:text-base font-medium text-gray-900 leading-snug">
                            {carName}
                        </p>
                        <p className="mt-1 text-xs text-gray-400 font-medium">Per day rental</p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-xl lg:text-2xl font-semibold text-gray-900 flex items-baseline justify-end gap-0.5">
                            <span className="text-sm lg:text-base font-normal text-gray-400">$</span>
                            {dailyRentPrice}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                            <span className="line-through">${dailyRentPrice}</span>/day
                        </p>
                    </div>
                </div>

                <Separator />

               
            </Card>
        </Link>
    );
};

export default CarsCard;