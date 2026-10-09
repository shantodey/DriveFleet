import z from "zod";



export const updateCarInfoSchema = z.object({

    carName: z.string(),
    imageUrl: z.string(),
    seatCapacity: z.number(),
    carType: z.string(),
    dailyRentPrice: z.number(),
    pickupLocation: z.string(),
    description:z.string(),
    availabilityStatus: z.string(),
})