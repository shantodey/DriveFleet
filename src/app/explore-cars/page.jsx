

import CarsCard from "../component/CarsCard";

const ExploreCarsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
    }
    const availableCars= await res.json();
    console.log(availableCars);
    
    return (
        <section className="mx-auto container px-6 py-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2">
                {availableCars.map((car) => (
                   <CarsCard car={car}  key={car._id} />
                ))}
            </div>
        </section>
    );
};

export default ExploreCarsPage;