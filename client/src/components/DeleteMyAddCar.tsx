"use client";

import { deleteCarById } from '@/services/my_cars';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Trash2Icon } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


type DeleteMyAddCarProps = {
    car: {
        _id: string;
        carName: string;
    };
};

export function AlertDialogDestructive({ car }: DeleteMyAddCarProps) {
    const { _id, carName } = car;

    const router = useRouter();
    const handelDelete = async () => {
        try {
            const data = await deleteCarById(_id);
            if (data && data.deletedCount > 0) {
                toast.success("Car Deleted Successfully");
                router.refresh();
            } else {
                toast.error("Failed To Delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something Went Wrong");
        }
    };
    return (
        <AlertDialog>
            <AlertDialogTrigger className='h-11 rounded-2xl border border-[#b89b65]/20 bg-[#b89b65]/10 px-5 text-xs font-bold uppercase tracking-[2px] text-[#d6bb84] transition-all duration-300 hover:bg-[#b89b65]/20' render={<Button variant="destructive">Delete Car</Button>} />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>Delete {carName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete this Car Form Our database. And once deleted this action cannot be recovered.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive" onClick={handelDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}
