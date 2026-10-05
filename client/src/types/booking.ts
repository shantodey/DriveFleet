export interface Car {
  _id: string;
  carName: string;
  imageUrl: string;
  seatCapacity?: number;
  carType?: string;
  location?: string;
  availabilityStatus?: string;
  dailyRentPrice?: number;
}

export interface BookCarCardProps {
  car: Car;
}

export interface BookingFormValues {
  name: string;
  email: string;
  phone: string;
  driverNeeded: "yes" | "no" | string;
  startDate: string | null;
  endDate: string | null;
  message: string;
}

export interface BookingPayload {
  userId: string;
  userName: string;
  userEmail: string;
  carImg: string;
  carId: string;
  carName: string;
  people: number;
  phone: string;
  message: string;
  driverNeeded: string;
  startDate: string | null;
  endDate: string | null;
}