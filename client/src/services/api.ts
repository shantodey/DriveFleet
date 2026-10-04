"use server";

import { BookingPayload } from "@/types/booking";
import { Car, CreateCarPayload } from "@/types/car";

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
};

const getJsonHeaders = (token?: string, extra: Record<string, string> = {}) => ({
  "Content-Type": "application/json",
  ...extra,
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const getCars = async (q?: string, t?: string): Promise<Car[]> => {
  try {
    const params = new URLSearchParams();

    if (q) params.append("q", q);
    if (t) params.append("t", t);

    const res = await fetch(`${getBaseUrl()}/cars?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    return (await res.json()) as Car[];
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
};

export const getCarById = async (id: string, token?: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/cars/${id}`, {
      headers: getJsonHeaders(token),
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Error fetching car details:", error);
    return null;
  }
};

export const createCar = async (
  carData: CreateCarPayload,
): Promise<{ message?: string }> => {
  try {
    const res = await fetch(`${getBaseUrl()}/cars`, {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify(carData),
    });

    const data = (await res.json()) as { message?: string };

    if (!res.ok) {
      throw new Error(data.message || "Failed to add car");
    }

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to add car",
    );
  }
};

export const createBooking = async (
  bookingData: BookingPayload,
): Promise<void> => {
  try {
    const res = await fetch(`${getBaseUrl()}/booking`, {
      method: "POST",
      headers: getJsonHeaders(),
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) {
      const errorData = (await res.json().catch(() => ({}))) as {
        message?: string;
      };
      throw new Error(errorData.message || "Failed to book car");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to book car",
    );
  }
};
