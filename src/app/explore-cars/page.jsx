import CarsCard from "../component/CarsCard";
import SearchComponent from "../component/SearchComponent";

const gettingDataFormApi = async (q, t) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars?q=${q || ''}&t=${t || ''}`, { cache: "no-store" });

    if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
    }

    const availableCars = await res.json();

    return availableCars;
};

const ExploreCarsPage = async ({ searchParams }) => {
    const sParams = await searchParams;

    const availableCars = await gettingDataFormApi(sParams.q, sParams.t);

    return (
        <section className="min-h-screen bg-[#050505]">
            <div className="relative overflow-hidden border-b border-white/10">
              
                <div className="relative container mx-auto px-4 md:px-6 py-20 lg:py-28">
                    <p className="text-[#C8A96B] uppercase tracking-[6px] text-xs font-medium">Available Cars</p>
                    <h1 className="mt-5 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] text-white"> Choose Your <span className="text-[#C8A96B]">Dream Car</span></h1>
                    <p className="mt-6 max-w-2xl text-sm md:text-base leading-8 text-gray-300">
                        Browse our handcrafted collection of premium and exotic vehicles available for rent across Dhaka.
                    </p>

                    <div className="mt-10">
                        <SearchComponent />
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-14">
                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {availableCars.map((car) => (
                        <CarsCard car={car} key={car._id} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExploreCarsPage;