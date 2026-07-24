export interface CreateBookingDto {

  carId: string;

  pickupDate: string;

  returnDate: string;

  pickupLocation: string;

  dropLocation: string;

  specialRequest?: string;

}