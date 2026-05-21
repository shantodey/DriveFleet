import FeaturedCarSlider from "./FeaturedCarSlider";


const FeaturedCar = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        cache: "no-store",
    });
    const data = await res.json();

    return (
        <section>
            <div className="container mx-auto">
                <FeaturedCarSlider cars={data.slice(0, 6)} />
            </div>
        </section>
    );
};

export default FeaturedCar;