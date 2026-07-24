import { Request, Response } from "express";
import {
  createBookingService,
  getMyBookingsService,
  cancelBookingService,
  getAllBookingsService,
  updateBookingStatusService
} from "../services/booking.service";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const booking = await createBookingService(userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyBookings = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;

    const bookings = await getMyBookingsService(userId);

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const cancelBooking = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const bookingId = req.params.id;

    const booking = await cancelBookingService(
      bookingId,
      userId
    );

    return res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllBookings = async (
  req: Request,
  res: Response
) => {
  try {
    const bookings = await getAllBookingsService();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateBookingStatus = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    const booking = await updateBookingStatusService(
      bookingId,
      status
    );

    return res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};