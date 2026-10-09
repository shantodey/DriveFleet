import z from "zod";


export const addCarDataDchema=z.object({
    carName: z.string(),
    dailyRentPrice:z.number(),
    carType:z.string(),
    seatCapacity:z.number(),
    pickupLocation:z.string(),
    imageUrl:z.string(),
    description:z.string(),
    availabilityStatus:z.string(),
    ownerId:z.string(),
    ownerName:z.string(),
    ownerEmail:z.string(),
})