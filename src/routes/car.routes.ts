import { Router } from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/car.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

// Public
router.get("/", getAllCars);
router.get("/:id", getCarById);

// Admin
router.post(
  "/",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  createCar
);

router.put(
  "/:id",
  authenticate,
  authorize("admin"),
  upload.single("image"),
  updateCar
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  deleteCar
);

export default router;