import { auth } from "@/lib/auth";
import { Button, Card, CloseButton } from "@heroui/react";
import { headers } from "next/headers";
import Nothing from "@/assets/NothingToShow.png"
import Link from "next/link";
import Image from "next/image";
import DeleteBookingCar from "../component/DeleteBookingCar";


const MyBookingsCarsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`);
    const bookiingCarData = await res.json();
    const safeData = Array.isArray(bookiingCarData) ? bookiingCarData : [];


    return (
        <section className="py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

                <div className="grid grid-cols-1 gap-6">

                    {safeData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10 px-4">
                            <div className="relative w-full max-w-75 aspect-square">
                                <Image
                                    src={Nothing}
                                    alt="No items found"
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 300px"
                                    priority
                                />
                            </div>
                            <h2 className="text-xl font-bold mt-4">Nothing to Show</h2>
                            <p className="text-gray-500 text-center">You haven't booked any cars yet.</p>
                        </div>
                    ) : (
                        <>

                            {
                                safeData.map((booking) => (
                                    <Card key={booking._id} className="flex flex-col md:flex-row overflow-hidden shadow-lg border-0">
                                        <div className="relative w-full md:w-2/5 h-64 md:h-auto shrink-0">
                                            <Image
                                                alt={booking?.carName}
                                                src={booking?.carImg}
                                                fill
                                                className="absolute inset-0 h-full w-full object-cover"
                                                sizes="(max-width: 768px) 100vw, 40vw"
                                                loading="lazy"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col p-5">
                                            <Card.Header className="flex flex-col items-start gap-2 p-0">
                                                <div className="flex justify-between w-full">
                                                    <Card.Title className="text-xl font-bold">{booking?.carName}</Card.Title>
                                                    <DeleteBookingCar booking={booking} />
                                                </div>
                                                <Card.Description className="text-sm text-gray-600">
                                                    You have booked the {booking?.carName} from {booking?.startDate} to {booking?.endDate}
                                                </Card.Description>
                                            </Card.Header>

                                            <Card.Footer className="mt-auto pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                                <div className="text-left">
                                                    <p className="text-sm font-semibold text-foreground">Total Seats: {booking?.people}</p>
                                                    <p className="text-xs text-gray-400">Submission ends Oct 10.</p>
                                                </div>
                                                <Button color="primary" className="w-full sm:w-auto px-6">
                                                    <Link href={`explore-cars/${booking?.carId}`}> View Details</Link>

                                                </Button>
                                            </Card.Footer>
                                        </div>
                                    </Card>
                                ))
                            }
                        </>
                    )}


                </div>
            </div>
        </section>
    );
};

export default MyBookingsCarsPage;