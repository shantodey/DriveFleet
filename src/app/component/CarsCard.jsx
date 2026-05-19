
import Image from "next/image";
import Link from "next/link";
import { GiSelfLove } from "react-icons/gi";

const CarsCard = ({ car }) => {
    const {_id, imageUrl, carName, dailyRentPrice } = car
    return (
        
        <Link href={`explore-cars/${_id}`} className="group overflow-hidden rounded-2xl bg-white transition-shadow duration-300">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                <Image src={imageUrl}  alt={carName}  fill  sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-103"
                />
                <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:text-red-500">
                   <GiSelfLove/>
                </button>
            </div>
            <div className="flex items-start justify-between px-2 py-4">
                <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                            {dailyRentPrice}
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            {carName}
                        </span>
                    </div>
                </div>

                <div className="text-right">
                    <p className="text-xl font-bold text-gray-900 flex items-center justify-end gap-0.5">
                        <span className="text-sm font-medium">$</span>
                        {dailyRentPrice}
                    </p>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                        <span className="line-through">${dailyRentPrice}</span>/day
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default CarsCard;