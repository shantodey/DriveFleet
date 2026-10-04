export interface Car {
  _id: string;
  carName: string;
  carType: string;
  imageUrl: string;
  dailyRentPrice: number;
  location?: string;
}