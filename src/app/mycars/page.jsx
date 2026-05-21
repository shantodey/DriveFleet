import { auth } from "@/lib/auth";
import { Button, Card, CloseButton } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";

const MyAddedCars = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${user.id}`, {
        cache: 'no-store'
    });
    const myCars = await res.json();
    return (
        <section className="py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold mb-6">My Added Cars</h1>

                <div className="grid grid-cols-1 gap-6">
                    {myCars.map((car) => (
                        <Card key={car._id} className="w-full items-stretch md:flex-row">
                            <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
                                <Image
                                    src={car.imageUrl}
                                    alt={car.carName}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 120px"
                                    className="pointer-events-none object-cover select-none"

                                />
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-4">
                                <Card.Header className="gap-1">
                                    <Card.Title className="pr-8">{car.carName}</Card.Title>
                                    <Card.Description>
                                        {car.carType} | Location: {car.pickupLocation}
                                    </Card.Description>
                                </Card.Header>

                                <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">
                                            Price: ${car.dailyRentPrice}/day
                                        </span>
                                        <span className="text-xs text-muted">
                                            Status: {car.availabilityStatus}
                                        </span>
                                    </div>
                                    <Button className="w-full sm:w-auto">View Details</Button>
                                </Card.Footer>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyAddedCars;