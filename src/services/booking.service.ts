import prisma from "../prisma/client";
import { CreateBookingDto } from "../types/booking.types";

export const createBookingService = async (
  userId: string,
  data: CreateBookingDto
) => {

  // Find the selected car
  const car = await prisma.car.findUnique({
    where: {
      id: data.carId,
    },
  });

  if (!car) {
    throw new Error("Car not found");
  }

  // ✅ Check if the car is already booked for the selected dates
  const existingBooking = await prisma.booking.findFirst({
    where: {
      carId: data.carId,
      status: {
        not: "CANCELLED",
      },
      AND: [
        {
          pickupDate: {
            lte: new Date(data.returnDate),
          },
        },
        {
          returnDate: {
            gte: new Date(data.pickupDate),
          },
        },
      ],
    },
  });

  if (existingBooking) {
    throw new Error("Car is already booked for the selected dates");
  }

  // Calculate total days
  const pickup = new Date(data.pickupDate);
  const drop = new Date(data.returnDate);

  const totalDays = Math.ceil(
    (drop.getTime() - pickup.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (totalDays <= 0) {
    throw new Error("Invalid booking dates");
  }

  const totalPrice = totalDays * car.pricePerDay;

  return prisma.booking.create({
    data: {
      userId,
      carId: data.carId,
      pickupDate: pickup,
      returnDate: drop,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      specialRequest: data.specialRequest,
      totalDays,
      totalPrice,
    },
  });
};

export const getMyBookingsService = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      userId,
    },
    include: {
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const cancelBookingService = async (
  bookingId: string,
  userId: string
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  if (booking.userId !== userId) {
    throw new Error("You are not authorized to cancel this booking");
  }

  if (booking.status === "CANCELLED") {
    throw new Error("Booking is already cancelled");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELLED",
    },
  });
};
export const getAllBookingsService = async () => {
  return prisma.booking.findMany({
    include: {
      user: true,
      car: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const updateBookingStatusService = async (
  bookingId: string,
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
) => {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status,
    },
  });
};