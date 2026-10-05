"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ArrowRight, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car } from "@/types/car";

import "swiper/css";

interface FeaturedCarSliderProps {
  cars: Car[];
}

const FeaturedCarSlider = ({ cars }: FeaturedCarSliderProps) => {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Section Header */}
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4  py-1.5 text-[12px] font-medium uppercase tracking-[0.35em] text-[#8A672A] dark:text-[#C8A96B]">
           Our Premium Fleet</p>
          
          <h2 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Featured Cars
          </h2>
        </div>

        <Button  asChild  variant="link"
          className="inline-flex items-center gap-3 p-0 text-sm font-semibold uppercase tracking-[0.2em] text-[#8A672A] transition-all duration-300 hover:translate-x-1 hover:no-underline dark:text-[#C8A96B]">
          <Link href="/explore-cars">
            View All Cars
            <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* Car Swiper */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={28}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car._id}>
            <Card className="group overflow-hidden rounded-[30px] border-border bg-card p-0 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-[#C8A96B]/40 hover:shadow-xl">
              {/* Image & Type Badge */}
              <div className="relative overflow-hidden">
                <Image
                  height={500}
                  width={700}
                  src={car.imageUrl}
                  alt={car.carName}
                  className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <Badge className="absolute left-5 top-5 border border-white/10 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8A96B] backdrop-blur-xl">
                  {car.carType}
                </Badge>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {car.carName}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                      <MapPin className="text-[#C8A96B]" />
                      <p className="text-sm">{car.location || "Dhaka"}</p>
                    </div>
                  </div>

                  <div className="rounded-full bg-[#C8A96B] p-3 text-black transition-all duration-300 group-hover:rotate-45">
                    <ArrowRight />
                  </div>
                </div>

                {/* Footer Price & Rent Action */}
                <div className="flex items-center justify-between border-t border-border pt-5">
                  <div>
                    <p className="text-3xl font-black text-[#8A672A] dark:text-[#C8A96B]">
                      ${car.dailyRentPrice}
                    </p>
                    <p className="text-sm text-white/40">per day</p>
                  </div>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-border bg-transparent px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.12em] text-foreground transition-all duration-300 hover:border-[#C8A96B] hover:bg-[#C8A96B] hover:text-black"
                  >
                    <Link href={`/cars/${car._id}`}>Rent Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedCarSlider;