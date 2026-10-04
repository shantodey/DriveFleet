"use server";

import { Car } from "@/types/car";

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