"use server"

const getBaseUrl = () => {
  const baseUrl = process.env.SERVER_URL;

  if (!baseUrl) {
    throw new Error("SERVER_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
};




export const getMyCarsByUserId = async (userId: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/my-added-cars/${userId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("getMyCarsByUserId failed:", res.status);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching user cars:", error);
    return [];
  }
};


export const deleteCarById = async (id: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/my-added-cars/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Error deleting car:", error);
    return null;
  }
};



export const updateCarById = async (id: string, updatedCar: Record<string, unknown>) => {
  try {
    const res = await fetch(`${getBaseUrl()}/my-added-cars/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedCar),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.error("Error updating car:", error);
    return { ok: false, data: null };
  }
};


export const getBookedCarsByUserId = async (userId: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/booking/${userId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("getBookedCarsByUserId failed:", res.status);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching booked cars:", error);
    return [];
  }
};


export const deleteBookingById = async (bookingId: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      console.error("deleteBookingById failed:", res.status);
      return { ok: false, data: null };
    }

    const data = await res.json();
    return { ok: true, data };
  } catch (error) {
    console.error("Error deleting booking:", error);
    return { ok: false, data: null };
  }
};