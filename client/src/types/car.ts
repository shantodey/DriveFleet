export interface Car {
  _id: string;
  carName: string;
  carType?: string;
  category?: string;
  imageUrl: string;
  dailyRentPrice: number;
  location?: string;
  pickupLocation?: string;
  seatCapacity?: number;
  description?: string;
  availabilityStatus?: "Available" | "Unavailable" | string;
  ownerId?: string;
  ownerName?: string;
  ownerEmail?: string;
}

export interface CreateCarPayload {
  carName: string;
  dailyRentPrice: number;
  carType: string;
  seatCapacity: number;
  pickupLocation: string;
  imageUrl: string;
  description: string;
  availabilityStatus: "Available" | "Unavailable" | string;
  ownerId: string;
  ownerName?: string;
  ownerEmail?: string;
}

export interface AddCarFormValues {
  carName: string;
  dailyRentPrice: string;
  carType: string;
  seatCapacity: string;
  pickupLocation: string;
  imageUrl: string;
  description: string;
}