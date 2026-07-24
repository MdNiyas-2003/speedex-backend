"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatusService = exports.getAllBookingsService = exports.cancelBookingService = exports.getMyBookingsService = exports.createBookingService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const createBookingService = async (userId, data) => {
    // Find the selected car
    const car = await client_1.default.car.findUnique({
        where: {
            id: data.carId,
        },
    });
    if (!car) {
        throw new Error("Car not found");
    }
    // ✅ Check if the car is already booked for the selected dates
    const existingBooking = await client_1.default.booking.findFirst({
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
    const totalDays = Math.ceil((drop.getTime() - pickup.getTime()) /
        (1000 * 60 * 60 * 24));
    if (totalDays <= 0) {
        throw new Error("Invalid booking dates");
    }
    const totalPrice = totalDays * car.pricePerDay;
    return client_1.default.booking.create({
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
exports.createBookingService = createBookingService;
const getMyBookingsService = async (userId) => {
    return client_1.default.booking.findMany({
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
exports.getMyBookingsService = getMyBookingsService;
const cancelBookingService = async (bookingId, userId) => {
    const booking = await client_1.default.booking.findUnique({
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
    return client_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status: "CANCELLED",
        },
    });
};
exports.cancelBookingService = cancelBookingService;
const getAllBookingsService = async () => {
    return client_1.default.booking.findMany({
        include: {
            user: true,
            car: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
exports.getAllBookingsService = getAllBookingsService;
const updateBookingStatusService = async (bookingId, status) => {
    const booking = await client_1.default.booking.findUnique({
        where: {
            id: bookingId,
        },
    });
    if (!booking) {
        throw new Error("Booking not found");
    }
    return client_1.default.booking.update({
        where: {
            id: bookingId,
        },
        data: {
            status,
        },
    });
};
exports.updateBookingStatusService = updateBookingStatusService;
