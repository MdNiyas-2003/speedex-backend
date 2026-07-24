import { Router } from "express";
import { createBooking,getMyBookings,cancelBooking,getAllBookings,updateBookingStatus } from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, createBooking);
router.get("/my", authenticate, getMyBookings);
router.delete("/:id", authenticate, cancelBooking);
router.get("/", authenticate, getAllBookings);
router.patch("/:id/status", authenticate, updateBookingStatus);

export default router;