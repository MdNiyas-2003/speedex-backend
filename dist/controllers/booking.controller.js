"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getAllBookings = exports.cancelBooking = exports.getMyBookings = exports.createBooking = void 0;
const booking_service_1 = require("../services/booking.service");
const createBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const booking = await (0, booking_service_1.createBookingService)(userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createBooking = createBooking;
const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await (0, booking_service_1.getMyBookingsService)(userId);
        return res.status(200).json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getMyBookings = getMyBookings;
const cancelBooking = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookingId = req.params.id;
        const booking = await (0, booking_service_1.cancelBookingService)(bookingId, userId);
        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.cancelBooking = cancelBooking;
const getAllBookings = async (req, res) => {
    try {
        const bookings = await (0, booking_service_1.getAllBookingsService)();
        return res.status(200).json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getAllBookings = getAllBookings;
const updateBookingStatus = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { status } = req.body;
        const booking = await (0, booking_service_1.updateBookingStatusService)(bookingId, status);
        return res.status(200).json({
            success: true,
            message: "Booking status updated successfully",
            data: booking,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateBookingStatus = updateBookingStatus;
