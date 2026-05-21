
import CarsCard from "../component/CarsCard";
import SearchComponent from "../component/SearchComponent";
const gettingDataFormApi = async (q, t) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars?q=${q || ''}&t=${t || ''}`,
        {
            cache: "no-store",
        }
    );
    if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
    }
    const availableCars = await res.json();
    return availableCars
}
const ExploreCarsPage = async ({ searchParams }) => {
    const sParams = await searchParams
    const availableCars = await gettingDataFormApi(sParams.q, sParams.t)
    console.log(sParams);

    return (

        <section className="mx-auto container px-4 md:px-6 py-12">
            <SearchComponent />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-8">
                {availableCars.map((car) => (
                    <CarsCard car={car} key={car._id} />
                ))}
            </div>
        </section>
    );
};

export default ExploreCarsPage;




