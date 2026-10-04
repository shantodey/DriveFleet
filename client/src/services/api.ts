"use server"
import { Car } from "@/types/car";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCars = async (): Promise<Car[]> => {
  try {
    const res = await fetch(`${BASE_URL}/cars`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    return [];
  }
};