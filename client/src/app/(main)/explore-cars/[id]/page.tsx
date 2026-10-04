
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Gauge, Disc } from 'lucide-react';

import { getCarById } from '@/services/api';
import BookCarCard from "@/component/BookCarCard";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ViewCarsPageProps {
  params: Promise<{ id: string }>;
}

const ViewCarsPage = async ({ params }: ViewCarsPageProps) => {
    const { id } = await params;

    const response = await getCarById(id);
    const car = response?.data || response;

    if (!car || !car._id) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                <p>Car not found.</p>
            </div>
        );
    }

    const {
        carName = "Unknown Car",
        imageUrl = "/placeholder.jpg",
        carType = "Standard",
        description = "No description available.",
        seatCapacity = 0,
        availabilityStatus = "Unavailable",
        dailyRentPrice = 0,
        pickupLocation = "N/A",
    } = car;

    return (
        <section className="min-h-screen bg-background text-foreground">
            <div className="relative overflow-hidden border-b border-border">
                <div className="absolute inset-0">
                    <Image 
                        src={imageUrl} 
                        alt={carName} 
                        fill 
                        priority 
                        className="object-cover opacity-25 blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-background/40 to-background dark:from-black/60 dark:via-black/85 dark:to-[#050505]" />
                </div>

                <div className="relative container mx-auto px-4 md:px-6 py-14">
                    <div className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="transition-all duration-300 hover:text-[#C8A96B]">Home</Link>
                        <span>/</span>
                        <Link href="/explore-cars" className="transition-all duration-300 hover:text-[#C8A96B]">Available Cars</Link>
                        <span>/</span>
                        <span className="font-medium text-foreground">{carName}</span>
                    </div>

                    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <Card className="group relative overflow-hidden rounded-[32px] border-border bg-card p-0 shadow-xl">
                                <CardContent className="p-0">
                                    <div className="relative h-75 sm:h-112 lg:h-155 overflow-hidden">
                                        <Image 
                                            src={imageUrl} 
                                            alt={carName} 
                                            fill 
                                            priority 
                                            sizes="(max-width:1024px) 100vw, 60vw" 
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                        
                                        <Badge 
                                            variant="outline" 
                                            className={`absolute left-6 top-6 rounded-full px-5 py-2 text-xs font-black uppercase tracking-[3px] backdrop-blur-md ${
                                                availabilityStatus === 'Available' 
                                                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                                                    : 'border-red-500/30 bg-red-500/10 text-red-400'
                                            }`}
                                        >
                                            {availabilityStatus}
                                        </Badge>

                                        <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-8">
                                            <div className="flex flex-wrap items-end justify-between gap-6">
                                                <div>
                                                    <p className="mb-3 text-xs uppercase tracking-[5px] text-[#C8A96B]">{carType}</p>
                                                    <h1 className="max-w-2xl text-4xl font-black leading-none md:text-6xl">{carName}</h1>
                                                </div>

                                                <div className="rounded-3xl border border-[#C8A96B]/20 bg-black/40 px-6 py-4 backdrop-blur-xl">
                                                    <p className="text-xs uppercase tracking-[3px] text-gray-200 dark:text-gray-400">Daily Rental</p>
                                                    <div className="mt-1 flex items-end gap-1">
                                                        <span className="text-xl font-semibold text-[#C8A96B]">$</span>
                                                        <span className="text-4xl font-black">{dailyRentPrice}</span>
                                                        <span className="mb-1 text-sm text-gray-200 dark:text-gray-400">/day</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <Card className="rounded-3xl border-border bg-card p-5">
                                    <CardContent className="p-0">
                                        <div className="mb-4 text-2xl text-[#C8A96B]">
                                            <Users size={24} />
                                        </div>
                                        <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Capacity</p>
                                        <h3 className="mt-2 text-lg font-bold text-foreground">{seatCapacity} Seats</h3>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-3xl border-border bg-card p-5">
                                    <CardContent className="p-0">
                                        <div className="mb-4 text-2xl text-[#C8A96B]">
                                            <MapPin size={24} />
                                        </div>
                                        <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Location</p>
                                        <h3 className="mt-2 line-clamp-1 text-lg font-bold text-foreground">{pickupLocation}</h3>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-3xl border-border bg-card p-5">
                                    <CardContent className="p-0">
                                        <div className="mb-4 text-2xl text-[#C8A96B]">
                                            <Gauge size={24} />
                                        </div>
                                        <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Performance</p>
                                        <h3 className="mt-2 text-lg font-bold text-foreground">Premium</h3>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-3xl border-border bg-card p-5">
                                    <CardContent className="p-0">
                                        <div className="mb-4 text-2xl text-[#C8A96B]">
                                            <Disc size={24} />
                                        </div>
                                        <p className="text-xs uppercase tracking-[3px] text-muted-foreground">Drive</p>
                                        <h3 className="mt-2 text-lg font-bold text-foreground">Automatic</h3>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        <div className="space-y-8 lg:col-span-5">
                            <Card className="rounded-[32px] border-border bg-card p-7 shadow-lg">
                                <CardContent className="p-0">
                                    <p className="text-xs uppercase tracking-[5px] text-[#8A672A] dark:text-[#C8A96B]">Luxury Experience</p>
                                    <h2 className="mt-4 text-3xl font-black leading-tight text-foreground">Drive Beyond Expectations</h2>
                                    <p className="mt-5 text-base leading-8 text-muted-foreground">{description}</p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-[32px] border-border bg-card p-7 shadow-lg">
                                <CardContent className="p-0">
                                    <div className="flex items-end justify-between border-b border-border pb-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-[4px] text-muted-foreground">Daily Rental Rate</p>
                                            <div className="mt-3 flex items-end gap-1">
                                                <span className="text-xl font-semibold text-[#8A672A] dark:text-[#C8A96B]">$</span>
                                                <span className="text-5xl font-black text-foreground">{dailyRentPrice}</span>
                                                <span className="mb-1 text-sm text-muted-foreground">/day</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-7">
                                        {availabilityStatus === 'Available' ? (
                                            <BookCarCard car={car} />
                                        ) : (
                                            <Button 
                                                disabled 
                                                className="w-full rounded-2xl border border-border bg-muted py-6 text-sm font-bold uppercase tracking-[3px] text-muted-foreground"
                                            >
                                                Currently Unavailable
                                            </Button>
                                        )}
                                    </div>

                                    <div className="mt-6 rounded-2xl border border-[#C8A96B]/10 bg-[#C8A96B]/5 p-4">
                                        <p className="text-center text-xs leading-6 text-muted-foreground">
                                            Secure checkout protected by JWT authentication with instant booking confirmation and premium support.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ViewCarsPage;