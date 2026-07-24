import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";
import { getDashboardStats } from "../controllers/dashboard.controller";

const router = Router();
router.get(
  "/",
  authenticate,
  authorize("admin"),
  getDashboardStats
);
export default router;