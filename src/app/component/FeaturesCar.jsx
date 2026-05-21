import FeaturedCarSlider from "./FeaturedCarSlider";


const FeaturedCar = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
        cache: "no-store",
    });
    const data = await res.json();

    return <FeaturedCarSlider cars={data.slice(0, 6)} />;
};

export default FeaturedCar;