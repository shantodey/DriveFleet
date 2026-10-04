"use server";

import { Car } from "@/types/car";
import { BookingPayload } from "@/types/booking";


const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCars = async (q?: string, t?: string): Promise<Car[]> => {
  try {
    const params = new URLSearchParams();
    if (q) params.append("q", q);
    if (t) params.append("t", t);

    const res = await fetch(`${BASE_URL}/cars?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    const availableCars: Car[] = await res.json();
    return availableCars;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};



export const getCarById = async (id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL}/cars/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
};




export const createBooking = async (bookingData: BookingPayload): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    throw new Error("Failed to book car");
  }
};