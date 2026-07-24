export interface CreateCarDto {
  brand: string;
  model: string;
  year: number;
  color: string;
  fuelType: string;
  transmission: string;
  seats: number;
  pricePerDay: number;
  registrationNo: string;
  category: string;
  image?: string;
}