"use client";

import { Trash2Icon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { deleteBookingById } from '@/services/my_cars';


type DeleteBookingCarProps = {
    booking: {
        _id: string;
        carName: string;
    };
};

const DeleteBookingCar = ({ booking }: DeleteBookingCarProps) => {
    const { _id, carName } = booking;

    const router = useRouter();

    const handleDelete = async () => {
        try {
            const { ok, data } = await deleteBookingById(_id);

            if (ok) {
                toast.success(`Booking for ${carName} deleted successfully`);
                router.refresh();
            } else {
                toast.error("Failed to delete booking");
            }
        } catch (error) {
            console.error("Error sending delete request:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger className='h-11 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-5 text-xs font-bold uppercase tracking-[2px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20'
                render={<Button variant="destructive"> Cancel booking </Button>} />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Cancel booking  {carName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Proceeding with this option will cancel booking your car
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
};

export default DeleteBookingCar;