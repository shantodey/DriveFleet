"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Card,  Typography  } from "@heroui/react";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

const FeaturedCarSlider = ({ cars }) => {
    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <Typography type="heading-md" weight="medium" className="mb-8">
                <h1 className="text-5xl mb-7"> Featured Cars</h1>
               
            </Typography>

            <Swiper
                modules={[Autoplay]}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640:  { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {cars.map((car) => (
                    <SwiperSlide key={car._id}>
                        <Card variant="default" className="overflow-hidden">
                            <Image
                            height={200}
                            width={400}
                                src={car.imageUrl}
                                alt={car.carName}
                                className="w-full h-100 object-cover"
                            />
                            <Card.Content className="p-4 flex flex-col gap-2 shadow">
                                <Typography type="body-xs" color="muted" className="uppercase tracking-wide">
                                    {car.carType}
                                </Typography>
                                <Typography type="heading-sm" weight="medium">
                                    {car.carName}
                                </Typography>
                            </Card.Content>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default FeaturedCarSlider;