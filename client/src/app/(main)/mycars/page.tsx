import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, ArrowRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Nothing from "@/assets/NothingToShow.png";
import EditMyCarDetels from "@/components/EditMyCarDetels";
import DeleteMyAddCar from "@/components/DeleteMyAddCar";

interface MyCar {
  _id: string;
  carName: string;
  imageUrl: string;
  seatCapacity: number;
  carType: string;
  dailyRentPrice: number;
  pickupLocation: string;
  availabilityStatus: string;
}

const MyAddedCars = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${user?.id}`, {
    cache: "no-store",
  });

  const myCars: MyCar[] = await res.json();

  return (
    <section className="min-h-screen bg-background py-8 text-foreground md:py-12">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 border-b pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Garage Collection</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">My Added Cars</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage and monitor all luxury vehicles in your collection.</p>
          </div>

          <Card className="flex w-fit items-center gap-3 px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground">Total Cars:</span>
            <span className="text-xl font-bold">{myCars.length}</span>
          </Card>
        </div>

        {/* Empty State */}
        {myCars.length === 0 ? (
          <Card className="flex flex-col items-center justify-center p-8 text-center md:p-12">
            <div className="relative aspect-square w-48 max-w-full md:w-64">
              <Image src={Nothing} alt="No items found" fill priority sizes="(max-width: 768px) 100vw, 300px" className="object-contain opacity-90" />
            </div>

            <CardHeader className="p-0 pt-6">
              <CardTitle className="text-2xl font-bold">Nothing To Show</CardTitle>
              <CardDescription className="mt-2 max-w-sm text-sm">You haven't added any luxury cars to your collection yet.</CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-6">
              <Button asChild>
                <Link href="/add-car">Add Your First Car</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Cars List */
          <div className="grid grid-cols-1 gap-6">
            {myCars.map((car) => (
              <Card key={car._id} className="overflow-hidden border p-0 gap-0">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Image Container - Top space completely removed */}
                  <div className="relative aspect-video w-full lg:aspect-auto lg:h-full lg:col-span-4">
                    <Image src={car.imageUrl} alt={car.carName} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                    <Badge variant={car.availabilityStatus === "Available" ? "default" : "destructive"} className="absolute left-4 top-4">
                      {car.availabilityStatus}
                    </Badge>
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-col justify-between lg:col-span-8">
                    <CardHeader className="space-y-3 p-5 md:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <Badge variant="outline" className="mb-2">{car.carType}</Badge>
                          <CardTitle className="text-2xl font-bold md:text-3xl">{car.carName}</CardTitle>
                        </div>

                        <div className="flex items-center gap-2">
                          <Card className="px-4 py-2 bg-muted/50 border-none shadow-none">
                            <span className="text-xs text-muted-foreground block">Daily Rent</span>
                            <span className="text-xl font-bold">${car.dailyRentPrice}</span>
                            <span className="text-xs text-muted-foreground">/day</span>
                          </Card>
                          <DeleteMyAddCar car={car} />
                        </div>
                      </div>

                      {/* Info Chips */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2">
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Capacity</p>
                            <p className="text-sm font-semibold">{car.seatCapacity} Seats</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Pickup Location</p>
                            <p className="text-sm font-semibold truncate">{car.pickupLocation}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {/* Footer / Actions */}
                    <CardFooter className="flex flex-col gap-4 border-t p-5 md:p-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-xs text-muted-foreground">Premium vehicle available for customer daily bookings.</p>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <EditMyCarDetels car={car} />

                        <Button asChild className="w-full sm:w-auto">
                          <Link href={`/explore-cars/${car._id}`}>
                            <span>View Details</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>

                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAddedCars;