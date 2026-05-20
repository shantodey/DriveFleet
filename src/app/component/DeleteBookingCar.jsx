"use client";
import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { GoTrash } from 'react-icons/go';

const DeleteBookingCar = ({booking}) => {
    const { _id, carName } = booking;
    const router = useRouter();

    const handelDelete = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${_id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            });
            if (res.ok) {
                const data = await res.json();
                console.log("Deleted successfully:", data);
                router.refresh();
            } else {
                console.error("Failed to delete");
            }
        } catch (error) {
            console.error("Error sending delete request:", error);
        }
    };
    return (
        <>
            <AlertDialog>
                <Button variant="outline" className="flex items-center gap-2 rounded-sm border border-red-400 px-5 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50">
                    <GoTrash size={16} /> Delete</Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-100">
                            <AlertDialog.CloseTrigger />
                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />
                                <AlertDialog.Heading>Delete booking permanently?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete <strong>{carName}</strong> and all of its
                                    data. This action cannot be undone.
                                </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">
                                    Cancel
                                </Button>
                                <Button onClick={handelDelete} slot="close" variant="danger">
                                    Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </>
    );
};

export default DeleteBookingCar;