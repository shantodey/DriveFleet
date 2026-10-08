"use server"

const getBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_SERVER_URL is not configured");
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