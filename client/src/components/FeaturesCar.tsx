import FeaturedCarSlider from "./FeaturedCarSlider";
import { getCars } from "@/services/api"; 

const FeaturedCar = async () => {
  const cars = await getCars();
  if (!cars || cars.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#C8A96B]/10 blur-[140px]" />
      <div className="relative container mx-auto px-4">
        <FeaturedCarSlider cars={cars.slice(0, 6)} />
      </div>
    </section>
  );
};

export default FeaturedCar;