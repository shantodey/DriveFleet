"use client";

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { GoTrash } from 'react-icons/go';

type DeleteMyAddCarProps = {
    car: {
        _id: string;
        carName: string;
    };
};

const DeleteMyAddCar = ({ car }: DeleteMyAddCarProps) => {
    const { _id, carName } = car;

    const router = useRouter();

    const handelDelete = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/my-added-cars/${car._id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                toast.success("Car Deleted Successfully");
                 router.refresh();

            } else {
                toast.error("Failed To Delete");
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }
    };
    return (
        <AlertDialog>

            <Button className="flex h-12 items-center gap-2 rounded-2xl border border-red-500/10 bg-red-500/[0.06] px-5 text-xs font-bold uppercase tracking-[3px] text-red-400 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.12]">

                <GoTrash size={15} />

                <span> Delete</span>

            </Button>

            <AlertDialog.Backdrop className="bg-black/80 backdrop-blur-md">

                <AlertDialog.Container>

                    <AlertDialog.Dialog className="overflow-hidden rounded-[32px] border border-border bg-card p-0 text-foreground shadow-xl sm:max-w-[500px]">

                        <div className="border-b border-border px-8 py-7">

                            <div className="flex items-start justify-between gap-4">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl border border-red-500/10 bg-red-500/[0.06] text-red-400">
                                        <GoTrash size={28} />
                                    </div>

                                    <div>

                                        <p className="text-xs uppercase tracking-[4px] text-red-400">
                                            Dangerous Action
                                        </p>

                                        <h2 className="mt-2 text-2xl font-black text-foreground">
                                            Delete Booking?
                                        </h2>

                                    </div>

                                </div>

                                <AlertDialog.CloseTrigger className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:bg-muted hover:text-foreground" />

                            </div>

                        </div>

                        <div className="px-8 py-7">

                            <div className="rounded-3xl border border-border bg-background p-6">

                                <p className="text-sm leading-8 text-muted-foreground">
                                    You are about to permanently remove the booking for
                                    <span className="mx-1 font-bold text-foreground">
                                        {carName}
                                    </span>
                                    from your reservation history.
                                </p>

                                <p className="mt-4 text-sm leading-8 text-red-400/80">
                                    This action cannot be undone once deleted.
                                </p>

                            </div>

                        </div>

                        <div className="flex flex-col gap-4 border-t border-border px-8 py-6 sm:flex-row sm:justify-end">

                            <Button
                                slot="close"
                                className="h-13 rounded-2xl border border-border bg-background px-7 text-xs font-bold uppercase tracking-[3px] text-foreground transition-all duration-300 hover:bg-muted"
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handelDelete}
                                slot="close"
                                className="h-13 rounded-2xl border border-red-500/10 bg-red-500/[0.08] px-7 text-xs font-bold uppercase tracking-[3px] text-red-400 transition-all duration-300 hover:bg-red-500/[0.14]"
                            >
                                Confirm Delete
                            </Button>

                        </div>

                    </AlertDialog.Dialog>

                </AlertDialog.Container>

            </AlertDialog.Backdrop>

        </AlertDialog>
    );
};

export default DeleteMyAddCar;
