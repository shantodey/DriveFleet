import SearchComponent from "@/components/SearchComponent";
import CarsCard from "@/components/CarsCard";
import { getCars } from "@/services/api";
import { Car } from "@/types/car";

interface ExploreCarsPageProps {
  searchParams: Promise<{ q?: string; t?: string }>;
}

const ExploreCarsPage = async ({ searchParams }: ExploreCarsPageProps) => {
  const sParams = await searchParams;
  const availableCars: Car[] = await getCars(sParams.q, sParams.t);

  return (
    <section className="min-h-screen bg-background">
      <div className="relative overflow-hidden border-b border-border">
        <div className="relative container mx-auto px-4 md:px-6 py-20 lg:py-28">
          <p className="text-[#8A672A] dark:text-[#C8A96B] uppercase tracking-[6px] text-xs font-medium">
            Available Cars
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] text-foreground">
            Choose Your <span className="text-[#8A672A] dark:text-[#C8A96B]">Dream Car</span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm md:text-base leading-8 text-muted-foreground">
            Browse our handcrafted collection of premium and exotic vehicles
            available for rent across Dhaka.
          </p>
          <div className="mt-10">
            <SearchComponent />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-14">
        {availableCars.length === 0 ? (
          <p className="text-center text-muted-foreground">No cars found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {availableCars.map((car) => (
              <CarsCard car={car} key={car._id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreCarsPage;