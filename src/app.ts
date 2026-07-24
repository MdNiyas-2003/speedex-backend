import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import carRoutes from "./routes/car.routes";
import bookingRoutes from "./routes/booking.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://speedex-cars-rental.vercel.app",
    ],
    credentials: true,
  })
);app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app;