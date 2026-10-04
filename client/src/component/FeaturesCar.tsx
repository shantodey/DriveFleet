
import FeaturedCarSlider from "./FeaturedCarSlider";

const FeaturedCar = async () => {
  let cars = [];
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
      cache: "no-store",
    });

    if (res.ok) {
      cars = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch cars:", error);
  }

  if (!cars || cars.length === 0) {
    return null; 
  }

  return (
    <section className="relative bg-[#0B0B0B] py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[140px]" />
      <div className="relative container mx-auto px-4">
        <FeaturedCarSlider cars={cars.slice(0, 6)} />
      </div>
    </section>
  );
};

export default FeaturedCar;