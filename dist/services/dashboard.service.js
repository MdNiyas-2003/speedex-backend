"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getDashboardStatsService = async () => {
    const [totalUsers, totalCars, availableCars, totalBookings, pendingBookings, confirmedBookings, completedBookings, cancelledBookings, revenue,] = await Promise.all([
        client_1.default.user.count(),
        client_1.default.car.count(),
        client_1.default.car.count({
            where: {
                available: true,
            },
        }),
        client_1.default.booking.count(),
        client_1.default.booking.count({
            where: {
                status: "PENDING",
            },
        }),
        client_1.default.booking.count({
            where: {
                status: "CONFIRMED",
            },
        }),
        client_1.default.booking.count({
            where: {
                status: "COMPLETED",
            },
        }),
        client_1.default.booking.count({
            where: {
                status: "CANCELLED",
            },
        }),
        client_1.default.booking.aggregate({
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
exports.getDashboardStatsService = getDashboardStatsService;
