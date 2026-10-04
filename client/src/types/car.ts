export interface Car {
  _id: string;
  carName: string;
  category?: string;
  imageUrl: string;
  dailyRentPrice: number;
  location?: string;
  seatCapacity?: number;
}