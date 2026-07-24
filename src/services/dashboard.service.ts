import prisma from "../prisma/client";

export const getDashboardStatsService = async () => {
  const [
    totalUsers,
    totalCars,
    availableCars,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    revenue,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.car.count(),

    prisma.car.count({
      where: {
        available: true,
      },
    }),

    prisma.booking.count(),

    prisma.booking.count({
      where: {
        status: "PENDING",
      },
    }),

    prisma.booking.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.booking.count({
      where: {
        status: "COMPLETED",
      },
    }),

    prisma.booking.count({
      where: {
        status: "CANCELLED",
      },
    }),

    prisma.booking.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
      },
    }),
  ]);

  return {
    totalUsers,
    totalCars,
    availableCars,
    bookedCars: totalCars - availableCars,
    totalBookings,
    pendingBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalRevenue: revenue._sum.totalPrice ?? 0,
  };
};